import * as React from "react"
import Link from "next/link"
import posthog from "posthog-js"

import { NavItem } from "@/types/nav"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"

interface MainNavProps {
  items?: NavItem[]
}

export function MainNav({ items }: MainNavProps) {
  return (
    <div className="flex items-center gap-6 md:gap-10">
      <Link href="/" className="flex items-center space-x-2">
        {/* <Icons.logo className="h-6 w-6" /> */}
        <span className="inline-block font-semibold">{siteConfig.name}</span>
      </Link>
      {items?.length ? (
        <nav className="hidden gap-6 sm:flex">
          {items?.map((item, index) =>
            item.href ? (
              item.title === "Google Sheet" ? (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    buttonVariants({ variant: "default", size: "sm" }),
                    "flex h-fit w-fit justify-end px-4 py-2 text-xs",
                    item.disabled && "cursor-not-allowed opacity-80"
                  )}
                  onClick={() => {
                    if (item.title === "Google Sheet") {
                      posthog.capture("click-google-sheet")
                    }
                  }}
                >
                  {item.title}
                </Link>
              ) : (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    "flex items-center text-sm font-medium text-gray-400 duration-300 hover:text-white",
                    item.disabled && "cursor-not-allowed opacity-80"
                  )}
                >
                  {item.title}
                </Link>
              )
            ) : null
          )}
        </nav>
      ) : null}
    </div>
  )
}
