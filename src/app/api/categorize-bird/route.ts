import { NextRequest, NextResponse } from 'next/server';
import { BIRD_CATEGORIES } from '@/components/form/Registration/types';

type OracleRequest = {
  question1: string;
  question2: string;
  question3: string;
  question4: string;
  question5: string;
  question6: string;
};


export async function POST(request: NextRequest) {
  try {
    const data: OracleRequest = await request.json();

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

Context about the questions:
- Question 1: "When did your soul appear on this planet?" - reveals their temporal/historical connection
- Question 2: "What makes for good flying?" - shows their essence and approach to life
- Question 3: "Describe your ideal nest" - indicates their comfort zone and lifestyle preferences
- Question 4: "You just lost your group, how do you call them back?" - demonstrates how they connect with others
- Question 5: "In what kind of environment do you flourish the most?" - shows their ideal habitat and conditions
- Question 6: "Tell me about your mating ritual" - reveals their approach to connection and attraction

Their answers:
${answers}

Based on their personality traits, temporal origins, and spiritual essence revealed through these answers, which bird category best represents them?

Consider:
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

