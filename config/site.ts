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
  name: "Cerebral Valley",
  description:
    "A community of founders and builders creating the next generation of technology.",
  mainNav: [
    {
      title: "Google Sheet",
      href: "https://docs.google.com/spreadsheets/d/1P6ut7vL-gXKbeDeh3nuPqBjoCupjIt87Sw7TnhumBSU/edit#gid=1781893986",
    },
  ],
  links: {
    slack:
      "https://join.slack.com/t/cerebral-valley/shared_invite/zt-1x3ajihhs-XVyLxWO84uY7CCnShfI1cw",
    twitter: "https://twitter.com/cerebral_valley",
  },
}
