type UserType = {
  airtableRecordId: string
  twitterHandle?: string
  twitterProfileImage?: string
  twitterFollowerCount?: number
  displayName?: string
}

type EventType = {
  id: string
  name: string // name of event
  startDateTime: string
  endDateTime: string
  location: string
  url: string
  type?: string
}

type FeaturedEventType = EventType & {
  imageLink?: string
  featuredStartDate: string | undefined
  featuredEndDate: string | undefined
  paid: boolean
  cvEvent: string
}

type AddToCalEvent = {
  description: string
  ctz?: string
  duration: string
  endDatetime: string
  location: string
  startDatetime: string
  timezone: string
  title: string
}
