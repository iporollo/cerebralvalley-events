import Airtable from "airtable"
import {
  AIRTABLE_SPONSORS_BASE,
  AirtableTableSponsorColumns,
  AirtableTables,
} from "src/utils/constants"

type Sponsor = {
  name: string
  email: string
  social: string
  message: string
}

class SponsorService {
  base: Airtable.Base

  constructor() {
    Airtable.configure({
      endpointUrl: "https://api.airtable.com",
      // TODO: Remove
      // Hack: exposing Airtable API Key to client
      apiKey: process.env.NEXT_PUBLIC_AIRTABLE_PERSONAL_TOKEN,
    })
    this.base = Airtable.base(AIRTABLE_SPONSORS_BASE)
  }

  createSponsor = async (sponsor: Sponsor): Promise<any[]> => {
    return new Promise((resolve, reject) => {
      this.base(AirtableTables.SPONSORS_TABLE).create(
        [
          {
            //@ts-ignore
            fields: {
              [AirtableTableSponsorColumns.NAME]: sponsor.name,
              [AirtableTableSponsorColumns.EMAIL]: sponsor.email,
              [AirtableTableSponsorColumns.SOCIAL]: sponsor.social,
              [AirtableTableSponsorColumns.MESSAGE]: sponsor.message,
            },
          },
        ],
        function (err: any, records: any) {
          if (err) {
            console.error(err)
            reject(err)
          }
          resolve(records)
        }
      )
    })
  }
}

const sponsorService = new SponsorService()
export default sponsorService
