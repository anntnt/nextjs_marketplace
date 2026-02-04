// app/api/chat/route.ts
import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "invalid messages" }, { status: 400 });
    }

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini", 
      messages
    });

    const replyMessage = completion.choices?.[0]?.message;
    if (!replyMessage) {
      return NextResponse.json({ error: "No reply message found" }, { status: 500 });
    }
    return NextResponse.json({ reply: replyMessage });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
