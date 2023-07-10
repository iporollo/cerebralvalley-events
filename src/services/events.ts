import Airtable from "airtable"
import {
  AIRTABLE_EVENTS_BASE,
  AirtableTableEventColumns,
  AirtableTableEventViews,
  AirtableTables,
  EventTypes,
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

  async fetchEvents(showPastEvents: boolean, dateFilter: Date | undefined) {
    console.log(dateFilter)
    let allRecords: any[] = []
    let view = showPastEvents
      ? AirtableTableEventViews.PAST_EVENTS
      : AirtableTableEventViews.UPCOMING_EVENTS

    const filterLogic =
      dateFilter &&
      `IS_SAME({${
        AirtableTableEventColumns.START
      }}, "${dateFilter.toISOString()}", 'day')`

    let options = { view }

    if (filterLogic) {
      // @ts-ignore
      options.filterByFormula = filterLogic
    }

    const records = await this.base(AirtableTables.EVENTS_TABLE)
      .select(options)
      .all()

    // Hack: setting to an array of type any[] to bypass TypeScript
    allRecords = Array.from(records)
    return allRecords
  }
}

const eventService = new EventService()
export default eventService
