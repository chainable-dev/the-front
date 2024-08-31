import './globals.css'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Metadata } from 'next'
import { ThemeProvider } from '@/contexts/ThemeContext'

export const metadata: Metadata = {
  title: 'Your App Name',
  description: 'Description of your app',
  metadataBase: new URL('https://your-domain.com'),
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createServerComponentClient({ cookies })
  const { data: { session } } = await supabase.auth.getSession()
  const initialTheme = session?.user.user_metadata.theme || 'light'

  return (
    <html lang="en" className={initialTheme}>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
        <script dangerouslySetInnerHTML={{
          __html: `
            (function() {
              var theme = localStorage.getItem('theme') || '${initialTheme}';
              document.documentElement.classList.remove('light', 'dark');
              document.documentElement.classList.add(theme);
            })();
          `
        }} />
      </body>
    </html>
  )
}