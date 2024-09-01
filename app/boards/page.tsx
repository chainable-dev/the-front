import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { Board } from '@/types'
import BoardList from '@/app/components/BoardList'

export default async function BoardsPage() {
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect('/login')
  }

  const { data: boards } = await supabase
    .from('boards')
    .select('id, title, description, created_at, user_id') // Specify the columns you want to fetch
    .order('created_at', { ascending: false })

  return (
    <div className="w-full max-w-2xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-8">Your Boards</h1>
      <BoardList boards={boards as Board[] || []} />
    </div>
  )
}