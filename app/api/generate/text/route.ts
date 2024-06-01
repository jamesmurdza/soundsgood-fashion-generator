import { NextResponse } from 'next/server';
import { generateText } from '@/lib/openai';

export async function POST(req: Request) {
  const body = await req.json();
  const { input, style } = body;
  const generatedText: string = await generateText({
    image: input,
    prompt: `This is a picture of me. Please recommend an outfit for me given the following information:\n${style}\n Be verbose. Your recommendation should be JSON in the format { "character_name" : string, "color_palatte" : string, "silhouette" : string, "hair_and_makeup" : string, "outfit_image_prompt" : string }`
  });
  return NextResponse.json({ generatedText });
}
