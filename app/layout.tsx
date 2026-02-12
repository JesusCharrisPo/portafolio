import React from "react"
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { CustomCursor } from "@/components/custom-cursor"

import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter'
})

export const metadata: Metadata = {
  title: 'Jesus Charris | Marketing Digital, Desarrollo Web y Produccion Audiovisual con IA',
  description: 'Especialista integral en marketing digital estrategico, trafico y conversion, desarrollo web y produccion audiovisual con enfoque practico en IA aplicada a negocios.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`${inter.variable} font-sans antialiased bg-background text-foreground`}>
        <CustomCursor />
        {children}
      </body>
    </html>
  )
}