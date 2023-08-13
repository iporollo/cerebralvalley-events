"use client"

import dynamic from "next/dynamic"
import { usePageViewers } from "@/src/hooks/usePageViewers"

import { siteConfig } from "@/config/site"
import { MainNav } from "@/components/main-nav"

import { NavAuth } from "./NavAuth"

const StackedAvatarList = dynamic(
  () => import("@/components/StackedAvatarList/StackedAvatarList"),
  { ssr: false }
)

export function SiteHeader() {
  const { pageViewers } = usePageViewers()

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white dark:border-b-[#28272c] dark:bg-[#18171c]">
      <div className="container flex h-16 items-center justify-between space-x-4 sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />
        <div className="flex">
          <div className="hidden px-2 sm:px-8 md:block">
            <StackedAvatarList
              people={
                pageViewers
                  ?.map((v, idx) => {
                    return {
                      airtableId: v.info.airtableRecordId || v.id,
                      avatar: v.info.twitterAvatar || "",
                      handle: v.info.twitterHandle || v.id,
                      followerCount: v.info.followerCount || 0,
                    }
                  })
                  .sort((a, b) => {
                    if (
                      a.handle.includes("anonymousdegen") &&
                      !b.handle.includes("anonymousdegen")
                    ) {
                      return 1 // a should be placed after b
                    } else if (
                      !a.handle.includes("anonymousdegen") &&
                      b.handle.includes("anonymousdegen")
                    ) {
                      return -1 // a should be placed before b
                    }
                    return 0 // no specific order between a and b
                  }) || []
              }
            />
          </div>
          <NavAuth />
        </div>
      </div>
    </header>
  )
}
