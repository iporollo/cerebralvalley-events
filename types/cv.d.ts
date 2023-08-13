type UserType = {
  airtableRecordId: string
  twitterHandle?: string
  twitterProfileImage?: string
  twitterFollowerCount?: number
  displayName?: string
}

type EventType = {
  id: string
  event: string
  startDate: string
  endDate: string
  location: string
  link: string
  tags?: string[]
}
