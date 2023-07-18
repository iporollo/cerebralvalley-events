import Airtable from "airtable"
import { DateRange } from "react-day-picker"
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

  async fetchEvents(
    showPastEvents: boolean,
    dateRangeFilter: DateRange | undefined
  ) {
    let allRecords: any[] = []
    let view = showPastEvents
      ? AirtableTableEventViews.PAST_EVENTS
      : AirtableTableEventViews.UPCOMING_EVENTS
    let options = { view }

    let dateFilterLogic = ""

    const startDateFilter = dateRangeFilter?.from

    if (startDateFilter) {
      const endDateFilter = dateRangeFilter?.to || startDateFilter

      dateFilterLogic = `AND(
      	OR(IS_SAME({${
          AirtableTableEventColumns.START
        }}, "${startDateFilter.toISOString()}", "day"), IS_AFTER({${
        AirtableTableEventColumns.START
      }}, "${startDateFilter.toISOString()}")),
      	OR(IS_SAME({${
          AirtableTableEventColumns.END
        }}, "${endDateFilter.toISOString()}", "day"), IS_BEFORE({${
        AirtableTableEventColumns.END
      }}, "${endDateFilter.toISOString()}"))
        )`

      // @ts-ignore
      options.filterByFormula = dateFilterLogic
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
