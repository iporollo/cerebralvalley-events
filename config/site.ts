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
  mainNav: [],
  links: {
    slack:
      "https://join.slack.com/t/cerebral-valley/shared_invite/zt-1x3ajihhs-XVyLxWO84uY7CCnShfI1cw",
    twitter: "https://twitter.com/cerebral_valley",
  },
}
