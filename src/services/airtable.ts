import Airtable from "airtable"
import { DateRange } from "react-day-picker"
import {
  AIRTABLE_EVENTS_BASE,
  AirtableTableEventColumns,
  AirtableTableEventViews,
  AirtableTableUserColumns,
  AirtableTableUserViews,
  AirtableTables,
} from "src/utils/constants"
import { userObjMapper } from "src/utils/mappers/userObjMapper"

class AirtableService {
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

  // EVENTS

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

  async fetchFeaturedEvents() {
    let allRecords: any[] = []
    let view = AirtableTableEventViews.FEATURED_EVENTS
    let options = { view }

    const records = await this.base(AirtableTables.EVENTS_TABLE)
      .select(options)
      .all()

    // Hack: setting to an array of type any[] to bypass TypeScript
    allRecords = Array.from(records)
    return allRecords
  }

  // USERS

  // Retrieves all users on page load for the member's directory
  getAllUsers = (): Promise<any[]> => {
    return new Promise((resolve, reject) => {
      const allRecords: any[] = []
      this.base(AirtableTables.USERS_TABLE)
        .select({
          view: AirtableTableUserViews.ALL_DATA,
          sort: [
            {
              field: AirtableTableUserColumns.CACHED_FOLLOWER_COUNT,
              direction: "desc",
            },
          ],
        })
        .eachPage(
          function page(records: any, fetchNextPage: any) {
            const cleanedRecords = userObjMapper(records)
            allRecords.push(cleanedRecords)
            fetchNextPage()
          },
          function done(err: any) {
            if (err) {
              console.error(err)
              reject(err)
            } else {
              resolve(allRecords.flat())
            }
          }
        )
    })
  }

  findUserById = (airtableRecordId: string): Promise<any> => {
    return new Promise((resolve, reject) => {
      if (!airtableRecordId) reject()
      this.base(AirtableTables.USERS_TABLE).find(
        airtableRecordId,
        function (err: any, record: any) {
          if (err) {
            console.error(err)
            reject(err)
          }
          resolve(record)
        }
      )
    })
  }

  findUsersByIds = (airtableRecordIds: string[]): Promise<any> => {
    const filterFormula = `OR(${
      airtableRecordIds.length && [
        ...airtableRecordIds.map(
          (id) => `${AirtableTableUserColumns.RECORD_ID}='${id}'`
        ),
      ]
    })`
    return new Promise((resolve, reject) => {
      this.base(AirtableTables.USERS_TABLE)
        .select({
          view: AirtableTableUserViews.ALL_DATA,
          filterByFormula: filterFormula,
        })
        .firstPage(function (err: any, records: any) {
          if (err) {
            console.error(err)
            reject
          }
          resolve(records)
        })
    })
  }

  findUserByTwitterHandle = (
    twitterHandle: string
  ): Promise<Airtable.Record<any>> => {
    return new Promise((resolve, reject) => {
      this.base(AirtableTables.USERS_TABLE)
        .select({
          maxRecords: 1,
          view: AirtableTableUserViews.ALL_DATA,
          filterByFormula: `LOWER(${AirtableTableUserColumns.HANDLE})=LOWER('${twitterHandle}')`,
        })
        .firstPage(function (err: any, records: any) {
          if (err) {
            console.error(err)
            reject
          }
          resolve((records && records[0]) || null)
        })
    })
  }

  findUsersByTwitterHandle = (twitterHandles: string[]): Promise<any> => {
    const filterFormula = `OR(${[
      ...twitterHandles.map(
        (handle) =>
          `LOWER(${AirtableTableUserColumns.HANDLE})=LOWER('${handle}')`
      ),
    ]})`
    return new Promise((resolve, reject) => {
      this.base(AirtableTables.USERS_TABLE)
        .select({
          view: AirtableTableUserViews.ALL_DATA,
          filterByFormula: filterFormula,
        })
        .firstPage(function (err: any, records: any) {
          if (err) {
            console.error(err)
            reject
          }
          resolve(records)
        })
    })
  }

  findCurrentUser = async ({ airtableRecordId, twitterHandle }: UserType) => {
    // If we are checking via twitter / airtable user method,
    // use either findUserById or findUserByTwitterHandle

    let record: any
    if (airtableRecordId) record = await this.findUserById(airtableRecordId)
    if (twitterHandle)
      record = await this.findUserByTwitterHandle(twitterHandle)

    return record
  }

  findOrCreateUser = async (user: UserType): Promise<Airtable.Record<any>> => {
    let newUser = await this.findCurrentUser(user)
    if (!newUser) {
      newUser = await this.createUser(user)
    } else {
      user.airtableRecordId = newUser.id
      this.base(AirtableTables.USERS_TABLE).update([
        {
          //@ts-ignore
          id: user.airtableRecordId,
          fields: {
            //@ts-ignore
            [AirtableTableUserColumns.LAST_LOG_IN]: new Date(),
          },
        },
      ])
    }
    return new Promise(async (resolve) => {
      resolve(newUser)
    })
  }

  createUser = async (user: UserType): Promise<any[]> => {
    let memberRecordIds: any = []
    return new Promise((resolve, reject) => {
      this.base(AirtableTables.USERS_TABLE).create(
        [
          {
            //@ts-ignore
            fields: {
              [AirtableTableUserColumns.HANDLE]:
                user.twitterHandle?.toLowerCase(),
              [AirtableTableUserColumns.CACHED_FOLLOWER_COUNT]:
                user.twitterFollowerCount,
              [AirtableTableUserColumns.AVATAR]: user.twitterProfileImage || "",
              [AirtableTableUserColumns.NAME]: user.displayName || "",
              [AirtableTableUserColumns.LAST_LOG_IN]: new Date(),
            },
          },
        ],
        function (err: any, records: any) {
          if (err) {
            console.error(err)
            reject(err)
          }
          resolve(records[0])
        }
      )
    })
  }

  setUserAvatarAndFollowerCount = async (
    userRecordId: string,
    avatar: string,
    followerCount: number
  ): Promise<any[]> => {
    return new Promise((resolve, reject) => {
      this.base(AirtableTables.USERS_TABLE).update(
        [
          {
            id: userRecordId,
            fields: {
              [AirtableTableUserColumns.AVATAR]: avatar,
              [AirtableTableUserColumns.CACHED_FOLLOWER_COUNT]: followerCount,
            },
          },
        ],
        function (err: any, records: any) {
          if (err) {
            console.error(err)
            reject(err)
          }
          resolve(records[0])
        }
      )
    })
  }

  setUserInterestedEvents = async (
    userId: string,
    eventIds: string[]
  ): Promise<any[]> => {
    return new Promise((resolve, reject) => {
      this.base(AirtableTables.USERS_TABLE).update(
        [
          {
            id: userId,
            fields: {
              [AirtableTableUserColumns.EVENTS_INTERESTED]: eventIds,
            },
          },
        ],
        function (err: any, records: any) {
          if (err) {
            console.error(err)
            reject(err)
          }
          //TODO check if returns array, and in this case make sure it only returns one item
          resolve(records)
        }
      )
    })
  }

  // setUserCachedFollowed = async (
  //   userId: string,
  //   followedIds: string[]
  // ): Promise<any[]> => {
  //   return new Promise((resolve, reject) => {
  //     this.base(AirtableTables.USERS_TABLE).update(
  //       [
  //         {
  //           id: userId,
  //           fields: {
  //             [AirtableTableUserColumns.CACHED_FOLLOWED]: followedIds,
  //           },
  //         },
  //       ],
  //       function (err: any, records: any) {
  //         if (err) {
  //           console.error(err)
  //           reject(err)
  //         }
  //         //TODO check if returns array, and in this case make sure it only returns one item
  //         resolve(records)
  //       }
  //     )
  //   })
  // }
}

const airtableService = new AirtableService()
export default airtableService
