import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Alzyn Burac – Portfolio',
  description: 'Personal portfolio of Alzyn Burac - Computer Science student, gamer, and developer',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link 
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700&display=swap" 
          rel="stylesheet" 
        />
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" 
        />
      </head>
      <body>{children}</body>
    </html>
  )
}