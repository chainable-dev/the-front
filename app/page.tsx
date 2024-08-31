import ChatComponent from './chat/ChatComponent';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export default async function Home() {
  const supabase = createServerComponentClient({ cookies });
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    // Handle unauthenticated state, maybe redirect to login
    return <div>Please log in to use the chat.</div>;
  }

  return <ChatComponent userId={session.user.id} />;
}