import { NextRequest, NextResponse } from 'next/server';
import { Client } from '@notionhq/client';
import { NOTION_DATABASE_ID } from '@/lib/constants';
import { randomUUID } from 'crypto';
import { BirdType } from '@/components/form/Registration/types';
import * as Sentry from '@sentry/nextjs';

const notion = new Client({ auth: process.env.NOTION_INTEGRATION_SECRET });

type RegistrationData = {
  identity: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    referredBy: string;
    previousVoyages: string;
    genderIdentity: string;
    allergies?: string;
    conditions?: string;
  };
  logistics: {
    nights: string[];
    transportation: string;
    city: string;
    country: string;
    sleepingArrangement: string;
    canTransportMaterial?: boolean;
    takeMealLead?: boolean;
    mealPreference?: string;
    kitchenExperience?: string;
    hasMedicalEducation?: boolean;
    medicalBackground?: string;
  };
  workshopsMusic?: {
    organizeWorkshop?: boolean;
    workshopTitle?: string;
    workshopDayTime?: string;
    workshopDescription?: string;
    workshopSpace?: string;
    shareSpace?: string;
    playDjSet?: boolean;
    djDayTime?: string;
    soundcloudLink?: string;
    musicStyle?: string;
    playUnplugged?: boolean;
    unpluggedDescription?: string;
  };
  contribution: {
    contributionAmount: string;
  };
  oracle?: {
    question1: string;
    question2: string;
    question3: string;
    question4: string;
    question5: string;
    question6: string;
    birdCategory?: string;
  };
  birdCategory: BirdType;
};

export async function POST(request: NextRequest) {
  try {
    const data: RegistrationData = await request.json();

    // Check for existing registration with same email using search API
    const searchResponse = await notion.search({
      filter: {
        property: 'object',
        value: 'page'
      },
      page_size: 100,
    });

    // Filter for pages from our database with matching email
    const existingRegistration = searchResponse.results.find((page) => {
      if (!('parent' in page) || !page.parent) return false;
      
      const parent = page.parent as { database_id?: string };
      if (!parent.database_id) return false;
      
      const cleanDbId = parent.database_id.replace(/-/g, '');
      if (cleanDbId !== NOTION_DATABASE_ID) return false;

      // Check if email matches
      if ('properties' in page && page.properties) {
        const props = page.properties as Record<string, { type: string; rich_text?: Array<{ plain_text?: string }>; title?: Array<{ plain_text?: string }> }>;
        const emailProp = props['Email'];
        
        if (emailProp?.rich_text && emailProp.rich_text[0]?.plain_text === data.identity.email) {
          // Check if it has a title (not a template)
          const titleProp = Object.values(props).find(prop => prop.type === 'title');
          return titleProp?.title && titleProp.title.length > 0;
        }
      }
      
      return false;
    });

    if (existingRegistration) {
      // Log duplicate registration attempt (but don't treat as error)
      Sentry.captureMessage('Duplicate registration attempt', {
        level: 'info',
        tags: {
          errorType: 'duplicate_registration',
          endpoint: 'submit_registration',
        },
        extra: {
          email: data.identity.email,
          existingPageId: existingRegistration.id,
          timestamp: new Date().toISOString(),
        },
        user: {
          email: data.identity.email,
        },
      });

      return NextResponse.json(
        {
          success: false,
          error: 'A registration with this email already exists. Please check your inbox for a confirmation email, or contact us if you need to make changes to your registration.',
          details: 'Duplicate registration attempt detected',
        },
        { status: 409 } // 409 Conflict
      );
    }

    // Generate submission ID using UUID
    const submissionId = randomUUID();

    // Create Notion page
    const response = await notion.pages.create({
      parent: { database_id: NOTION_DATABASE_ID as string },
      properties: {
        'Submission ID': {
          title: [{ text: { content: submissionId } }],
        },
        'Submitted at': {
          date: { start: new Date().toISOString() },
        },
        'First Name': {
          rich_text: [{ text: { content: data.identity.firstName } }],
        },
        'Family Name': {
          rich_text: [{ text: { content: data.identity.lastName } }],
        },
        'Checked In': {
          checkbox: false,
        },
        'First Time': {
          checkbox: data.identity.previousVoyages === '0',
        },
        'Invited by': {
          rich_text: [{ text: { content: data.identity.referredBy } }],
        },
        'Paid': {
          checkbox: false,
        },
        'Amount Paid CHF': {
          number: null,
        },
        'Thu': {
          checkbox: data.logistics.nights.includes('thursday'),
        },
        'Fri': {
          checkbox: data.logistics.nights.includes('friday'),
        },
        'Sat': {
          checkbox: data.logistics.nights.includes('saturday'),
        },
        'Sun': {
          checkbox: data.logistics.nights.includes('sunday'),
        },
        'City': {
          rich_text: [{ text: { content: data.logistics.city } }],
        },
        'Country': {
          select: { name: data.logistics.country },
        },
        'Allergies': {
          rich_text: [{ text: { content: data.identity.allergies || '' } }],
        },
        'Stuff to know about me': {
          rich_text: [{ text: { content: data.identity.conditions || '' } }],
        },
        'Travelling by': {
          select: { name: data.logistics.transportation },
        },
        'Phone': {
          rich_text: [{ text: { content: data.identity.phone } }],
        },
        'Transport': {
          checkbox: data.logistics.canTransportMaterial || false,
        },
        'Unplugged': {
          checkbox: data.workshopsMusic?.playUnplugged || false,
        },
        'Workshop': {
          checkbox: data.workshopsMusic?.organizeWorkshop || false,
        },
        'Workshop Space': {
          rich_text: [{ text: { content: data.workshopsMusic?.workshopSpace || '' } }],
        },
        'Email': {
          rich_text: [{ text: { content: data.identity.email } }],
        },
        'Kitchen lead': {
          checkbox: data.logistics.takeMealLead || false,
        },
        'Kitchen Lead Wishes': {
          rich_text: [{ text: { content: data.logistics.mealPreference || '' } }],
        },
        'Kitchen Experience': {
          rich_text: [{ text: { content: data.logistics.kitchenExperience || '' } }],
        },
        'Unplugged description': {
          rich_text: [{ text: { content: data.workshopsMusic?.unpluggedDescription || '' } }],
        },
        'Doctors': {
          checkbox: data.logistics.hasMedicalEducation || false,
        },
        'Medical Experience': {
          rich_text: [{ text: { content: data.logistics.medicalBackground || '' } }],
        },
        '# of previous Mettaways': {
          number: parseInt(data.identity.previousVoyages) || 0,
        },
        'Sleeping Arrangement': {
          select: { name: data.logistics.sleepingArrangement },
        },
        'Bird Category': {
          select: data.birdCategory ? { name: data.birdCategory } : null,
        },
        'Soul Answer': {
          rich_text: [{ text: { content: data.oracle?.question1 || '' } }],
        },
        'Flying Answer': {
          rich_text: [{ text: { content: data.oracle?.question2 || '' } }],
        },
        'Nest Answer': {
          rich_text: [{ text: { content: data.oracle?.question3 || '' } }],
        },
        'Call Group Answer': {
          rich_text: [{ text: { content: data.oracle?.question4 || '' } }],
        },
        'Environment Answer': {
          rich_text: [{ text: { content: data.oracle?.question5 || '' } }],
        },
        'Mating Ritual Answer': {
          rich_text: [{ text: { content: data.oracle?.question6 || '' } }],
        },
        'Gender': {
          select: { name: data.identity.genderIdentity },
        },
      },
    });

    // Send confirmation email (only if Gmail credentials are configured)
    if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
      try {
        const emailResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/send-confirmation-email`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            firstName: data.identity.firstName,
            lastName: data.identity.lastName,
            email: data.identity.email,
            submissionId,
            birdCategory: data.birdCategory,
          }),
        });

        if (!emailResponse.ok) {
          console.error('Failed to send confirmation email, but registration succeeded');
          Sentry.captureMessage('Failed to send confirmation email', {
            level: 'warning',
            tags: {
              errorType: 'email_error',
              endpoint: 'submit_registration',
            },
            extra: {
              email: data.identity.email,
              submissionId,
              emailResponseStatus: emailResponse.status,
            },
          });
        }
      } catch (emailError) {
        console.error('Error sending confirmation email:', emailError);
        // Capture email error in Sentry but don't fail the registration
        Sentry.captureException(emailError, {
          level: 'warning',
          tags: {
            errorType: 'email_error',
            endpoint: 'submit_registration',
          },
          extra: {
            email: data.identity.email,
            submissionId,
            errorMessage: emailError instanceof Error ? emailError.message : 'Unknown email error',
          },
        });
      }
    } else {
      console.log('Skipping email - Gmail credentials not configured (GMAIL_USER or GMAIL_APP_PASSWORD missing)');
    }

    const responseJson = NextResponse.json({
      success: true,
      submissionId,
      notionPageId: response.id,
    });

    // Set cookie to indicate successful registration (not httpOnly so client can check)
    responseJson.cookies.set('mettaway_registered', 'true', {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 365, // 1 year
    });

    return responseJson;
  } catch (error) {
    console.error('Error submitting to Notion:', error);

    // Capture server error in Sentry with context
    Sentry.captureException(error, {
      tags: {
        errorType: 'server_error',
        endpoint: 'submit_registration',
      },
      extra: {
        errorMessage: error instanceof Error ? error.message : 'Unknown error',
        errorStack: error instanceof Error ? error.stack : undefined,
        timestamp: new Date().toISOString(),
      },
    });

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to submit registration',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

  