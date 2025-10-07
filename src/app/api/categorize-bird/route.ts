import { NextRequest, NextResponse } from 'next/server';
import { BIRD_CATEGORIES } from '@/components/form/Registration/types';
import { Client } from '@notionhq/client';
import { NOTION_DATABASE_ID } from '@/lib/constants';

type OracleRequest = {
  question1: string;
  question2: string;
  question3: string;
  question4: string;
  question5: string;
  question6: string;
};

const notion = new Client({ auth: process.env.NOTION_INTEGRATION_SECRET });

// Function to fetch bird category counts from Notion
async function getBirdCategoryCounts(): Promise<Record<string, number>> {
  try {
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

    // Filter for our database pages and extract bird categories
    const categoryCounts: Record<string, number> = {};

    const registrations = allPages.filter((page) => {
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

    // Count bird categories
    registrations.forEach((page) => {
      if ('properties' in page && page.properties) {
        const properties = page.properties as Record<string, any>;

        // Find the Bird Category property by name
        const birdCategoryProp = properties['Bird Category'];

        if (birdCategoryProp?.type === 'select' && birdCategoryProp?.select?.name) {
          const category = birdCategoryProp.select.name;
          categoryCounts[category] = (categoryCounts[category] || 0) + 1;
        }
      }
    });

    return categoryCounts;
  } catch (error) {
    console.error('Error fetching bird category counts:', error);
    return {};
  }
}


export async function POST(request: NextRequest) {
  try {
    const data: OracleRequest = await request.json();

    // Fetch current bird category counts from Notion
    const categoryCounts = await getBirdCategoryCounts();

    // Format answers for the prompt
    const answers = [
      `Question 1: ${data.question1}`,
      `Question 2: ${data.question2}`,
      `Question 3: ${data.question3}`,
      `Question 4: ${data.question4}`,
      `Question 5: ${data.question5}`,
      `Question 6: ${data.question6}`,
    ].join('\n');

    // Prepare the prompt for Mistral
    const prompt = `You are the Metta-Oracle, a mystical guide helping people discover their spirit bird for a magical journey to Ventara.

Categorize this person based on their answers to the following questions into one of these 12 bird categories:
${BIRD_CATEGORIES.map((cat, i) => `${i + 1}. ${cat}`).join('\n')}

Current distribution of participants across categories:
${BIRD_CATEGORIES.map(cat => `${cat}: ${categoryCounts[cat] || 0} participants`).join('\n')}

IMPORTANT: We need to maintain balanced category sizes for optimal group dynamics. Each category should ideally have 11-12 members maximum (target total: ~140 participants). Consider the current distribution when making your categorization - if a category is already close to capacity, choose a less populated alternative that still fits the person's personality traits.

Context about the questions:
- Question 1: "When did your soul appear on this planet?" - reveals their temporal/historical connection
- Question 2: "What makes for good flying?" - shows their essence and approach to life
- Question 3: "Describe your ideal nest" - indicates their comfort zone and lifestyle preferences
- Question 4: "You just lost your group, how do you call them back?" - demonstrates how they connect with others
- Question 5: "In what kind of environment do you flourish the most?" - shows their ideal habitat and conditions
- Question 6: "Tell me about your mating ritual" - reveals their approach to connection and attraction

Their answers:
${answers}

Based on their personality traits, temporal origins, and spiritual essence revealed through these answers, which bird category best represents them? Remember to consider the current distribution and balance the categories appropriately.

Category characteristics to consider:
- Mythical Birds: ancient, mystical, legendary
- Mecha Birds: futuristic, technological, mechanical
- Folded Birds: delicate, crafted, paper-like
- Night Birds / Dark Birds: nocturnal, mysterious, shadowy
- Ocean Birds: coastal, water-loving, shore-dwelling
- Birds of Paradise: tropical, exotic, vibrant
- Digital Birds: playful, modern, animated, electronic
- Chicks: young, fresh, energetic
- Birds of Prey: powerful, precise, aerodynamic
- Walking Birds: grounded, functional, terrestrial
- Ancient Birds: prehistoric, ancient, primal

Respond with ONLY the exact bird category name from the list above, nothing else.`;
    // Call Mistral API
    const mistralResponse = await fetch('https://api.mistral.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.MISTRAL_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'mistral-large-latest',
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 100,
      }),
    });

    if (!mistralResponse.ok) {
      const errorData = await mistralResponse.json();
      console.error('Mistral API error:', errorData);
      throw new Error('Failed to get response from Mistral API');
    }

    const mistralData = await mistralResponse.json();
    const birdCategory = mistralData.choices[0]?.message?.content?.trim() || 'Birds of Paradise';

    return NextResponse.json({
      success: true,
      birdCategory,
    });
  } catch (error) {
    console.error('Error categorizing bird:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to categorize bird',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

