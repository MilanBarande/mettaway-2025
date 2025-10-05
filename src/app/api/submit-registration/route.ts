import { NextRequest, NextResponse } from 'next/server';
import { Client } from '@notionhq/client';
import { randomUUID } from 'crypto';
import { BirdType } from '@/components/form/Registration/types';

const notion = new Client({ auth: process.env.NOTION_INTEGRATION_SECRET });
const DATABASE_ID = '26732652a3f3817b9ba5ca78b8725aca';

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
  birdCategory: BirdType;
};

export async function POST(request: NextRequest) {
  try {
    const data: RegistrationData = await request.json();

    // Generate submission ID using UUID
    const submissionId = randomUUID();

    // Create Notion page
    const response = await notion.pages.create({
      parent: { database_id: DATABASE_ID },
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
      },
    });

    // Send confirmation email
    try {
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/send-confirmation-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: data.identity.firstName,
          lastName: data.identity.lastName,
          email: data.identity.email,
          submissionId,
        }),
      });
    } catch (emailError) {
      console.error('Error sending confirmation email:', emailError);
      // Don't fail the registration if email fails
    }

    return NextResponse.json({
      success: true,
      submissionId,
      notionPageId: response.id,
    });
  } catch (error) {
    console.error('Error submitting to Notion:', error);
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

  