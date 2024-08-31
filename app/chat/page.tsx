import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import ChatComponent from './ChatComponent';

export default async function ChatPage() {
  const supabase = createServerComponentClient({ cookies });
  
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    redirect('/');
  }

  return (
    <ChatComponent userId={session.user.id} />
  );
}