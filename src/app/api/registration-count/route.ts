import { NextResponse } from 'next/server';
import { Client } from '@notionhq/client';
import { NOTION_DATABASE_ID } from '@/lib/constants';

const notion = new Client({ auth: process.env.NOTION_INTEGRATION_SECRET });

export async function GET() {
  try {
    // Fetch all pages with pagination
    const allPages = [];
    let startCursor = undefined;
    let hasMore = true;

    while (hasMore) {
      const response = await notion.search({
        filter: { property: 'object', value: 'page' },
        page_size: 100,
        start_cursor: startCursor,
      });

      allPages.push(...response.results);
      hasMore = response.has_more;
      startCursor = response.next_cursor ?? undefined;
    }

    // Filter for our database pages, excluding templates (empty title)
    const registrations = allPages.filter((page) => {
      // Check parent matches our database
      if (!('parent' in page) || !page.parent) return false;
      
      const parent = page.parent as { database_id?: string };
      if (!parent.database_id) return false;
      
      const cleanDbId = parent.database_id.replace(/-/g, '');
      if (cleanDbId !== NOTION_DATABASE_ID) return false;

      // Exclude template pages (empty title)
      if ('properties' in page && page.properties) {
        const titleProp = Object.values(page.properties as Record<string, { type: string; title?: Array<unknown> }>)
          .find(prop => prop.type === 'title');
        
        if (titleProp && (!titleProp.title || titleProp.title.length === 0)) {
          return false;
        }
      }

      return true;
    });

    return NextResponse.json({
      success: true,
      count: registrations.length,
    });
  } catch (error) {
    console.error('Error fetching registration count:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch registration count',
        count: 0,
      },
      { status: 500 }
    );
  }
}

