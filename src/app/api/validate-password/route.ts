import { NextRequest, NextResponse } from 'next/server';

const PASSWORD = process.env.PASSWORD

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { password } = body;

    if (!password) {
      return NextResponse.json(
        { success: false, message: 'Password is required' },
        { status: 400 }
      );
    }


    if (password === PASSWORD) {
      return NextResponse.json({
        success: true,
        message: 'Password correct! Access granted.'
      });
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

