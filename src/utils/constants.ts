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
  FEATURED_EVENTS = "viwBMaTjADVshTW6P",
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
  USERS_INTERESTED = "Users - Interested",
  HANDLES_INTERESTED = "User Interested Handles",
  AVATARS_INTERESTED = "User Interested Avatars",
  IDS_INTERESTED = "User Interested Ids",
}

enum AirtableTableFeaturedEventColumns {
  EVENT = "Event",
  START = "Start",
  END = "End",
  LOCATION = "Location",
  LINK = "Link",
  TAGS = "Tags",
  PAID = "Paid",
  CVEVENT = "CVEvent",
  IMAGE = "Image",
  USERS_INTERESTED = "Users - Interested",
  HANDLES_INTERESTED = "User Interested Handles",
  AVATARS_INTERESTED = "User Interested Avatars",
  IDS_INTERESTED = "User Interested Ids",
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
  BAY_AREA = "BAY_AREA",
  NYC = "New York, NY",
  LONDON = "London, UK",
  REMOTE = "Remote",
}

const BAY_AREA_CITIES = [
  "San Francisco, CA",
  "San Jose, CA",
  "Hillsborough, CA",
  "Stanford, CA",
  "Los Altos, CA",
  "Oakland, CA",
  "Palo Alto, CA",
  "Mountain View, CA",
  "Santa Clara, CA",
  "Sunnyvale, CA",
  "Berkeley, CA",
  "Redwood City, CA",
  "San Mateo, CA",
  "Fremont, CA",
  "Pleasanton, CA",
  "Walnut Creek, CA",
  "Hayward, CA",
  "Concord, CA",
  "Menlo Park, CA",
  "Livermore, CA",
  "Milpitas, CA",
  "San Leandro, CA",
  "San Rafael, CA",
  "South San Francisco, CA",
  "Novato, CA",
  "Union City, CA",
  "Alameda, CA",
  "Napa, CA",
  "Petaluma, CA",
  "Cupertino, CA",
  "Newark, CA",
  "Danville, CA",
  "Burlingame, CA",
  "San Carlos, CA",
  "East Palo Alto, CA",
  "Foster City, CA",
  "Los Gatos, CA",
  "Campbell, CA",
  "San Bruno, CA",
  "Pacifica, CA",
  "Mill Valley, CA",
]
export {
  AIRTABLE_EVENTS_BASE,
  AIRTABLE_SPONSORS_BASE,
  PUSHER_EVENT_CHANNEL,
  AirtableTables,
  AirtableTableEventViews,
  AirtableTableUserViews,
  AirtableTableEventColumns,
  AirtableTableFeaturedEventColumns,
  AirtableTableUserColumns,
  EventState,
  EventTypes,
  LocationTypes,
  BAY_AREA_CITIES,
}
