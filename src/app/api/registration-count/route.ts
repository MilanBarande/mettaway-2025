import { NextResponse } from 'next/server';
import { Client } from '@notionhq/client';

const notion = new Client({ auth: process.env.NOTION_INTEGRATION_SECRET });
const DATABASE_ID = '26732652a3f3817b9ba5ca78b8725aca';

export async function GET() {
  try {
    // Query the database to get all entries
    const response = await notion.databases.query({
      database_id: DATABASE_ID,
      page_size: 100, // Notion default is 100, adjust if you expect more
    });

    // Return the count of pages (registrations)
    return NextResponse.json({
      success: true,
      count: response.results.length,
    });
  } catch (error) {
    console.error('Error fetching registration count:', error);
    console.error('Error details:', error instanceof Error ? error.message : 'Unknown error');
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch registration count',
        details: error instanceof Error ? error.message : 'Unknown error',
        count: 0,
      },
      { status: 500 }
    );
  }
}

