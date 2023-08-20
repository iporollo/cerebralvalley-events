const AIRTABLE_EVENTS_BASE = "appNOa0dRcLXhHft1"
const AIRTABLE_SPONSORS_BASE = "appO1X4PqFvkUyaLy"

const PUSHER_EVENT_CHANNEL: string = "presence-cv-events"

enum AirtableTables {
  EVENTS_TABLE = "tblY9mWxFMnTp7IzP",
  USERS_TABLE = "tblWaB36hntfjxqcR",
}

enum AirtableTableEventViews {
  ALL_EVENTS = "viwGjHO5VHWJMFaRn",
  UPCOMING_EVENTS = "viwKfbSNjj5KeKtpD",
  PAST_EVENTS = "viwzNbCT5E20LpmH5",
}

enum AirtableTableUserViews {
  ALL_DATA = "viwEmS7RLq50IuYBa",
}

enum AirtableTableEventColumns {
  EVENT = "Event",
  START = "Start",
  END = "End",
  LOCATION = "Location",
  LINK = "Link",
  TAGS = "Tags",
  IDS_INTERESTED = "Users - Interested",
  // USERS_INTERESTED = "Users Interested - Aggregate",
  // AVATARS_INTERESTED = "Avatars Interested - Aggregate",
}

enum AirtableTableUserColumns {
  HANDLE = "Handle",
  NAME = "Name",
  AVATAR = "Avatar",
  EVENTS_INTERESTED = "Events - Interested",
  CACHED_FOLLOWER_COUNT = "Cached follower count",
  ADMIN = "Admin",
  LAST_LOG_IN = "Last Log In",
  RECORD_ID = "record_id",
}

enum EventState {
  PAST = "PAST",
  UPCOMING = "UPCOMING",
}

enum EventTypes {
  ALL = "ALL_EVENTS",
  CO_WORKING = "Co-Working",
  HACKATHON = "Hackathon",
}

enum LocationTypes {
  ALL = "ALL_LOCATIONS",
  SF = "San Francisco, CA",
  NYC = "New York, NY",
  LONDON = "London, UK",
  REMOTE = "Remote",
}

export {
  AIRTABLE_EVENTS_BASE,
  AIRTABLE_SPONSORS_BASE,
  PUSHER_EVENT_CHANNEL,
  AirtableTables,
  AirtableTableEventViews,
  AirtableTableUserViews,
  AirtableTableEventColumns,
  AirtableTableUserColumns,
  EventState,
  EventTypes,
  LocationTypes,
}
