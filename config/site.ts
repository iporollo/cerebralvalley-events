import { NavItem } from "@/types/nav"

interface SiteConfig {
  name: string
  description: string
  mainNav: NavItem[]
  links: {
    slack: string
    twitter: string
  }
}

export const siteConfig: SiteConfig = {
  name: "Cerebral Valley Events",
  description: "Tracking the latest AI events happening around the world.",
  mainNav: [
    {
      title: "Google Sheet",
      href: "https://docs.google.com/spreadsheets/d/1P6ut7vL-gXKbeDeh3nuPqBjoCupjIt87Sw7TnhumBSU/edit#gid=1781893986",
    },
  ],
  links: {
    slack: "https://cerebralvalley.ai/slack",
    twitter: "https://twitter.com/cerebral_valley",
  },
}
