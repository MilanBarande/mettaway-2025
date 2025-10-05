import { NextRequest, NextResponse } from 'next/server';
import { Client } from '@notionhq/client';
import { randomUUID } from 'crypto';

const notion = new Client({ auth: process.env.NOTION_API_KEY });
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
          rich_text: [{ text: { content: submissionId } }],
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
        'Thursday': {
          checkbox: data.logistics.nights.includes('thursday'),
        },
        'Friday': {
          checkbox: data.logistics.nights.includes('friday'),
        },
        'Saturday': {
          checkbox: data.logistics.nights.includes('saturday'),
        },
        'Sunday': {
          checkbox: data.logistics.nights.includes('sunday'),
        },
        'City': {
          rich_text: [{ text: { content: data.logistics.city } }],
        },
        'Country': {
          rich_text: [{ text: { content: data.logistics.country } }],
        },
        'Allergies': {
          rich_text: [{ text: { content: data.identity.allergies || '' } }],
        },
        'Stuff to know': {
          rich_text: [{ text: { content: data.identity.conditions || '' } }],
        },
        'Travelling by': {
          rich_text: [{ text: { content: data.logistics.transportation } }],
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
        'Kitchen Lead wishes': {
          rich_text: [{ text: { content: data.logistics.mealPreference || '' } }],
        },
        'Kitchen Experience': {
          rich_text: [{ text: { content: data.logistics.kitchenExperience || '' } }],
        },
        'Unplugged description': {
          rich_text: [{ text: { content: data.workshopsMusic?.unpluggedDescription || '' } }],
        },
        'Doctor': {
          checkbox: data.logistics.hasMedicalEducation || false,
        },
        'Medical experience': {
          rich_text: [{ text: { content: data.logistics.medicalBackground || '' } }],
        },
        '# of previous mettaways': {
          rich_text: [{ text: { content: data.identity.previousVoyages } }],
        },
        'Sleeping arrangement': {
          rich_text: [{ text: { content: data.logistics.sleepingArrangement } }],
        },
      },
    });

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

  