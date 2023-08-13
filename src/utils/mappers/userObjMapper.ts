import { AirtableTableUserColumns } from "src/utils/constants"

export const userObjItem = (user: any): UserType => {
  return {
    airtableRecordId: user.getId(),
    twitterHandle: user.get(AirtableTableUserColumns.HANDLE) || "",
    twitterProfileImage: user.get(AirtableTableUserColumns.AVATAR) || "",
    twitterFollowerCount:
      user.get(AirtableTableUserColumns.CACHED_FOLLOWER_COUNT) || 0,
    displayName: user.get(AirtableTableUserColumns.NAME) || "",
  }
}

export const userObjMapper = (users: any): UserType[] => {
  return users.map((a: any) => userObjItem(a))
}
