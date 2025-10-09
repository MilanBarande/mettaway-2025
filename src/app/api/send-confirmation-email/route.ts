import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { PAYMENT_INFO } from '@/lib/constants';
import { BirdType, BIRD_VIDEO_MAP, BIRD_COLLECTIVE_MAP } from '@/components/form/Registration/types';

type EmailData = {
  firstName: string;
  lastName: string;
  email: string;
  submissionId: string;
  birdCategory?: BirdType;
};

export async function POST(request: NextRequest) {
  try {
    const data: EmailData = await request.json();

    // Create nodemailer transporter for Gmail
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD, // Use App Password, not regular password
      },
    });

    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: black; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .button { display: inline-block; padding: 12px 30px; background: #667eea; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
            .payment-info { background: white; padding: 20px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #667eea; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🐦 Welcome Winged-One to Ventara!</h1>
            </div>
            <div class="content">
              <h2>Hi ${data.firstName}! 🎉</h2>

              <p>Thank you for registering for <strong>Ventara,</strong> the Mettaway Voyage <strong>#7</strong>! We're so excited to have you join us.</p>

              ${data.birdCategory ? `
              <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: black; padding: 20px; border-radius: 10px; margin: 20px 0; text-align: center;">
                <h3 style="margin: 0 0 10px 0;">🐦 Your Bird Family</h3>
                <p style="font-size: 18px; font-weight: bold; margin: 0;">You are part of <a href="${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/bird-families/${BIRD_VIDEO_MAP[data.birdCategory]}" style="color: black; text-decoration: underline; font-weight: bold;"><strong>${BIRD_COLLECTIVE_MAP[data.birdCategory]}</strong>!</a></p>
                <p style="margin: 10px 0 0 0; font-style: italic;">The Metta-Oracle has revealed your true nature. Embrace your flock! 🌟</p>
              </div>
              ` : ''}

              <h3>Next Step: Payment</h3>
              <p>With the completion of this form, your nest-spot is temporarily reserved. Only once you've paid the travel fee, your spot will be unconditionally reserved for you.</p>
              
              <p>Money transfers can be made in the following ways:</p>
              
              <div class="payment-info">
                <h4>💳 Revolut</h4>
                <p>Send directly to <strong>${PAYMENT_INFO.revolut.name}</strong></p>
                <p>Phone: <strong>${PAYMENT_INFO.revolut.phone}</strong></p>
              </div>
              
              <div class="payment-info">
                <h4>🏦 Bank Transfer</h4>
                <p><strong>IBAN:</strong> ${PAYMENT_INFO.iban}</p>
                <p><strong>Account Holder:</strong> ${PAYMENT_INFO.accountHolder}</p>
                <p><strong>Address:</strong> ${PAYMENT_INFO.address}</p>
              </div>
              
              <div class="payment-info">
                <h4>📱 Twint</h4>
                <p>
                  <a href="${PAYMENT_INFO.twint.link}" class="button">Pay with Twint</a>
                </p>
              </div>
              
              <h3>What's Next?</h3>
              <ul>
                <li>Complete your payment</li>
                <li>Keep an eye on your email for updates</li>
              </ul>

              <p>If you have any questions or if the financial contribution prohibits you from participating, please reach out to us at <a href="mailto:${PAYMENT_INFO.contactEmail}" style="color: #667eea; text-decoration: underline;">${PAYMENT_INFO.contactEmail}</a> - we are your friends!</p>

              <p>From our nest to yours, with love and kindness, we'll see you soon🌟</p>

              <strong>The Flocks of Ventara</strong>
                            
              <div class="footer">
                <p>This email was sent to ${data.email}</p>
                <p>Mettaway 2025</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    try {
      const info = await transporter.sendMail({
        from: `Mettaway <${process.env.GMAIL_USER}>`,
        to: data.email,
        replyTo: PAYMENT_INFO.contactEmail,
        subject: '🐦 Welcome Winged-One to Ventara!',
        html: emailHtml,
      });

      return NextResponse.json({
        success: true,
        emailId: info.messageId,
      });
    } catch (emailError) {
      console.error('Error sending email:', emailError);
      return NextResponse.json(
        { success: false, error: 'Failed to send email' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error in email route:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to send email',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

