import { NextResponse } from 'next/server';
import { generateText } from '@/lib/openai';

export async function POST(req: Request) {
  const body = await req.json();
  const { input, style } = body;
  const generatedText: string = await generateText({
    image: input,
    prompt: "Give me fashion advice. The desired style is " + style
  });
  return NextResponse.json({ generatedText });
}
