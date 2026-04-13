// app/api/chat/route.ts
export const runtime = 'nodejs';
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

function getOpenAiClient() {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error('OPENAI_API_KEY is not configured');
  }

  return new OpenAI({ apiKey });
}

export async function POST(req: Request) {
  try {
    const client = getOpenAiClient();
    const { messages } = await req.json();
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'invalid messages' }, { status: 400 });
    }

    const completion = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages,
    });

    const replyMessage = completion.choices?.[0]?.message;
    if (!replyMessage) {
      return NextResponse.json({ error: 'No reply message found' }, { status: 500 });
    }
    return NextResponse.json({ reply: replyMessage });
  } catch (err: unknown) {
    console.error(err);
    const message = err instanceof Error ? err.message : 'Unknown server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
