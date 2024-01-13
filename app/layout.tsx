import "@/styles/globals.css"
import { Metadata } from "next"
import Head from "next/head"
import Script from "next/script"

import { siteConfig } from "@/config/site"
import { fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { Toaster } from "@/components/ui/sonner"
import PostHogProvider from "@/components/posthog-provider"
import { SiteHeader } from "@/components/site-header"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { ThemeProvider } from "@/components/theme-provider"

import { NextAuthProvider } from "./providers"

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: siteConfig.name,
  },
  description: siteConfig.description,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  icons: {
    icon: "/favicon.svg",
    shortcut: "/apple-touch-icon.png",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: "https://events.cerebralvalley.ai",
    siteName: "Cerebral Valley Events",
    images: [
      {
        url: "https://cerebralvalley.ai/cerebralvalley.png",
        width: 800,
        height: 600,
      },
    ],
    locale: "en_US",
    type: "website",
  },
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_TAG}`}
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_TAG}', {
                });
              `,
          }}
        />
      </head>
      <PostHogProvider>
        <NextAuthProvider>
          <body
            className={cn(
              "antialised min-h-screen font-sans",
              fontSans.variable
            )}
          >
            <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
              <div className="relative flex min-h-screen flex-col">
                <SiteHeader />
                <div className="flex-1 bg-white dark:bg-[#18171c]">
                  {children}
                </div>
              </div>
              <Toaster />
              <TailwindIndicator />
            </ThemeProvider>
          </body>
        </NextAuthProvider>
      </PostHogProvider>
    </html>
  )
}

// TODO: add this gradient for light mode
// bg-gradient-to-t from-stone-300 via-slate-200 to-stone-100
