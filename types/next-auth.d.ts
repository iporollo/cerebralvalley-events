import NextAuth, { DefaultSession } from "next-auth"
import { DefaultJWT, JWT } from "next-auth/jwt"

declare module "next-auth" {
  interface Session {
    user: {
      airtableRecordId: string
    }
    twitter: {
      followersCount?: number
      handle: string
      userID: string
      image: string
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    userProfile: {
      followersCount?: number
      twitterHandle: string
      userID: string
      image: string
      airtableRecordId: string
    }
    credentials: {
      authToken: string
      authSecret: string
    }
  }
}
