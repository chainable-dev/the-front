import { GoogleGenerativeAI } from '@google/generative-ai';
import { GoogleGenerativeAIStream, StreamingTextResponse } from '@vercel/ai';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');

export const runtime = 'edge';

export async function POST(req: Request) {
  const { messages } = await req.json();
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  const chat = model.startChat({
    history: messages,
  });

  const response = await chat.sendMessageStream(messages[messages.length - 1].content);

  const stream = GoogleGenerativeAIStream(response);

  return new StreamingTextResponse(stream);
}