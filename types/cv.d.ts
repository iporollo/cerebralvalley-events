type UserType = {
  airtableRecordId: string
  twitterHandle?: string
  twitterProfileImage?: string
  twitterFollowerCount?: number
  displayName?: string
}

type EventType = {
  id: string
  event: string // name of event
  startDate: string
  endDate: string
  location: string
  link: string
  tags?: string[]
  usersInterested?: SimpleTwitterUser[]
  imageUri?: string // for featured events
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
