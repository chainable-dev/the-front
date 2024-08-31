import { NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  const { message } = await request.json();
  const supabase = createRouteHandlerClient({ cookies });

  // TODO: Implement AI response logic here
  const aiResponse = `AI response to: ${message}`;

  // Store the message in the database
  const { data: { user } } = await supabase.auth.getUser();
  if (user) {
    const { error } = await supabase
      .from('chat_histories')
      .insert({ user_id: user.id, title: message });

    if (error) {
      console.error('Error storing message:', error);
      return NextResponse.json({ error: 'Failed to store message' }, { status: 500 });
    }
  }

  return NextResponse.json({ response: aiResponse });
}