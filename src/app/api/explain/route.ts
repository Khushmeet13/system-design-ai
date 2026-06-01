import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic();

export async function POST(req: NextRequest) {
  try {
    const { node, systemContext } = await req.json();

    const prompt = `You are a senior software architect explaining a system component in a ${systemContext} architecture.

Component: ${node.label} (${node.type})
Description: ${node.description}

Provide a concise, insightful explanation (3-4 sentences) covering:
1. Its critical role in this specific system
2. A key engineering challenge it solves
3. A real-world insight or interesting fact

Be conversational, technical, and specific to ${systemContext}. Avoid generic descriptions.`;

    const message = await client.messages.create({
      model: 'claude-opus-4-20250514',
      max_tokens: 300,
      messages: [{ role: 'user', content: prompt }],
    });

    const explanation = message.content[0].type === 'text' ? message.content[0].text : '';
    return NextResponse.json({ explanation });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
