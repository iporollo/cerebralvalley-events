const AIRTABLE_EVENTS_BASE = "appNOa0dRcLXhHft1"
const AIRTABLE_SPONSORS_BASE = "appO1X4PqFvkUyaLy"

enum AirtableTables {
  EVENTS_TABLE = "tblY9mWxFMnTp7IzP",
  SPONSORS_TABLE = "tblu5cjfP51GBgabk",
}

enum AirtableTableEventViews {
  ALL_EVENTS = "viwGjHO5VHWJMFaRn",
  UPCOMING_EVENTS = "viwKfbSNjj5KeKtpD",
  PAST_EVENTS = "viwzNbCT5E20LpmH5",
}

enum AirtableTableEventColumns {
  EVENT = "Event",
  START = "Start",
  END = "End",
  LOCATION = "Location",
  LINK = "Link",
  TAGS = "Tags",
}

enum AirtableTableSponsorColumns {
  NAME = "Name",
  EMAIL = "Email",
  SOCIAL = "Social",
  MESSAGE = "Message",
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
  AirtableTables,
  AirtableTableEventViews,
  AirtableTableEventColumns,
  AirtableTableSponsorColumns,
  EventState,
  EventTypes,
  LocationTypes,
}
