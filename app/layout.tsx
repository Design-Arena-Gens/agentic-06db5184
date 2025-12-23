import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Sora 2 Anime Prompt Generator | 2D Anime Style',
  description: 'Gerador de prompts para criar vídeos de anime 2D incríveis com Sora 2 da OpenAI',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700;900&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  )
}
