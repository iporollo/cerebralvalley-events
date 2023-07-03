import Airtable from "airtable"
import {
  AIRTABLE_EVENTS_BASE,
  AirtableTableEventColumns,
  AirtableTableEventViews,
  AirtableTables,
} from "src/utils/constants"

class EventService {
  base: Airtable.Base

  constructor() {
    Airtable.configure({
      endpointUrl: "https://api.airtable.com",
      // TODO: Remove
      // Hack: exposing Airtable API Key to client
      apiKey: process.env.NEXT_PUBLIC_AIRTABLE_PERSONAL_TOKEN,
    })
    this.base = Airtable.base(AIRTABLE_EVENTS_BASE)
  }

  async fetchUpcomingEvents() {
    let allRecords: any[] = []

    const records = await this.base(AirtableTables.EVENTS_TABLE)
      .select({ view: AirtableTableEventViews.UPCOMING_EVENTS })
      .all()

    // Hack: setting to an array of type any[] to bypass TypeScript
    allRecords = Array.from(records)
    return allRecords
  }
}

const eventService = new EventService()
export default eventService
