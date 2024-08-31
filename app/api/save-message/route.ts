import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { chatId, message, model } = await request.json();
  const supabase = createRouteHandlerClient({ cookies });

  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { error } = await supabase
    .from('chat_messages')
    .insert({ 
      chat_id: chatId, 
      user_id: session.user.id, 
      content: message,
      model: model // Add this line to save the model used
    });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}