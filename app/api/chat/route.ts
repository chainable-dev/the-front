import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const { message } = await req.json();
    
    // Here, you would typically send the message to your AI service (e.g., OpenAI)
    // and get a response. For this example, we'll just echo the message back.
    const response = `Echo: ${message}`;

    return NextResponse.json({ response });
}