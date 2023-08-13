type SimpleTwitterUser = {
  avatar?: string
  handle?: string
  followerCount?: number
  name?: string /* If record exists in airtable*/
  airtableId: string
}

type FriendshipLookup = {
  name: string
  screen_name: string
  id: number
  id_str: string
  connections: string[]
}
