import { NextResponse } from 'next/server';
import { Client } from '@notionhq/client';

const notion = new Client({ auth: process.env.NOTION_INTEGRATION_SECRET });
const DATABASE_ID = '26732652a3f3817b9ba5ca78b8725aca';

export async function GET() {
  try {
    // Search for all pages in the database
    const response = await notion.search({
      filter: {
        property: 'object',
        value: 'page'
      },
      page_size: 100,
    });

    // Filter results to only include pages from our database
    const databasePages = response.results.filter((page: any) => {
      return page.parent?.type === 'database_id' && 
             page.parent?.database_id?.replace(/-/g, '') === DATABASE_ID;
    });

    // Return the count of pages (registrations)
    return NextResponse.json({
      success: true,
      count: databasePages.length,
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

