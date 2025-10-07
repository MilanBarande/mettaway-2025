import { NextRequest, NextResponse } from 'next/server';

const PASSWORD = process.env.PASSWORD;

// Simple in-memory rate limiting (resets on serverless function cold start)
const rateLimitMap = new Map<string, { attempts: number; lastAttempt: number; blockedUntil?: number }>();

const MAX_ATTEMPTS = 5; // Max attempts before blocking
const BLOCK_DURATION = 60000; // 1 minute block
const ATTEMPT_WINDOW = 300000; // 5 minute window to track attempts

function getRateLimitKey(request: NextRequest): string {
  // Use IP address or a fallback
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') || 'unknown';
  return ip;
}

function checkRateLimit(key: string): { allowed: boolean; remainingTime?: number } {
  const now = Date.now();
  const record = rateLimitMap.get(key);

  if (!record) {
    rateLimitMap.set(key, { attempts: 1, lastAttempt: now });
    return { allowed: true };
  }

  // Check if currently blocked
  if (record.blockedUntil && now < record.blockedUntil) {
    const remainingTime = Math.ceil((record.blockedUntil - now) / 1000);
    return { allowed: false, remainingTime };
  }

  // Reset if outside attempt window
  if (now - record.lastAttempt > ATTEMPT_WINDOW) {
    record.attempts = 1;
    record.lastAttempt = now;
    record.blockedUntil = undefined;
    return { allowed: true };
  }

  // Increment attempts
  record.attempts += 1;
  record.lastAttempt = now;

  // Block if too many attempts
  if (record.attempts > MAX_ATTEMPTS) {
    record.blockedUntil = now + BLOCK_DURATION;
    const remainingTime = Math.ceil(BLOCK_DURATION / 1000);
    return { allowed: false, remainingTime };
  }

  return { allowed: true };
}

export async function POST(request: NextRequest) {
  try {
    const key = getRateLimitKey(request);
    const rateLimit = checkRateLimit(key);

    if (!rateLimit.allowed) {
      return NextResponse.json(
        { 
          success: false, 
          message: `Too many attempts. Please wait ${rateLimit.remainingTime} seconds before trying again.`,
          rateLimited: true 
        },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { password } = body;

    if (!password) {
      return NextResponse.json(
        { success: false, message: 'Password is required' },
        { status: 400 }
      );
    }

    // Add small delay to slow down brute force attempts
    await new Promise(resolve => setTimeout(resolve, 500));

    if (password === PASSWORD) {
      // Reset attempts on successful login
      rateLimitMap.delete(key);
      
      const response = NextResponse.json({
        success: true,
        message: 'Password correct! Access granted.'
      });
      
      response.cookies.set('mettaway_auth', 'true', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 // 24 hours
      });
      
      return response;
    } else {
      return NextResponse.json({
        success: false,
        message: 'Incorrect password. Please try again.'
      });
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Invalid request' },
      { status: 400 }
    );
  }
}
