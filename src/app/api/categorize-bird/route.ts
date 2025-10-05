import { NextRequest, NextResponse } from 'next/server';

type OracleRequest = {
  question1: string;
  question1Other?: string;
  question2: string;
  question2Other?: string;
  question3: string;
  question3Other?: string;
  question4: string;
  question4Other?: string;
};

const BIRD_CATEGORIES = [
  "Birds of Paradise",
  "Origami Birds",
  "Walking Birds",
  "Ocean Birds",
  "Dinosaur Birds",
  "Cartoon Birds",
  "Chicks",
  "Mecha Birds",
  "Night Birds",
  "Dark Birds",
  "Mythological Birds",
  "Birds of Prey",
] as const;

export async function POST(request: NextRequest) {
  try {
    const data: OracleRequest = await request.json();

    // Format answers for the prompt
    const answers = [
      `Question 1: ${data.question1}${data.question1 === 'other' && data.question1Other ? ` (${data.question1Other})` : ''}`,
      `Question 2: ${data.question2}${data.question2 === 'other' && data.question2Other ? ` (${data.question2Other})` : ''}`,
      `Question 3: ${data.question3}${data.question3 === 'other' && data.question3Other ? ` (${data.question3Other})` : ''}`,
      `Question 4: ${data.question4}${data.question4 === 'other' && data.question4Other ? ` (${data.question4Other})` : ''}`,
    ].join('\n');

    // Prepare the prompt for Mistral
    const prompt = `You are the Metta-Oracle, a mystical guide helping people discover their spirit bird for a magical journey to Ventara.

Categorize this person based on their answers to the following questions into one of these 12 bird categories:
${BIRD_CATEGORIES.map((cat, i) => `${i + 1}. ${cat}`).join('\n')}

Context about the questions:
- Question 1: "Your soul is definitely from" - reveals their connection to different eras and realms
- Question 2: "For good flying, it's best to be" - shows their essence and way of being
- Question 3: "A good nest is" - indicates their comfort zone and lifestyle
- Question 4: "To call your flock, you" - demonstrates how they connect with others

Their answers:
${answers}

Based on their personality traits, temporal origins, and spiritual essence revealed through these answers, which bird category best represents them?

Consider:
- Mythological Birds: ancient, mystical, legendary
- Mecha Birds: futuristic, technological, mechanical
- Origami Birds: delicate, crafted, paper-like
- Night Birds / Dark Birds: nocturnal, mysterious, shadowy
- Ocean Birds: coastal, water-loving, shore-dwelling
- Birds of Paradise: tropical, exotic, vibrant
- Cartoon Birds: playful, 20th century, animated
- Chicks: young, fresh, energetic
- Birds of Prey: powerful, precise, aerodynamic
- Walking Birds: grounded, functional, terrestrial
- Dinosaur Birds: prehistoric, ancient, primal

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

