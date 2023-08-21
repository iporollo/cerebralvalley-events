import { el } from "date-fns/locale"
import NextAuth, { type NextAuthOptions } from "next-auth"
import TwitterProvider, {
  TwitterLegacyProfile,
  TwitterProfile,
} from "next-auth/providers/twitter"
import AirtableService from "src/services/airtable"
import { AirtableTableUserColumns } from "src/utils/constants"

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export const authOptions: NextAuthOptions = {
  // https://next-auth.js.org/configuration/providers
  providers: [
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID!,
      clientSecret: process.env.TWITTER_CLIENT_SECRET!,
      name: "Twitter",
    }),
  ],
  // Database optional. MySQL, Maria DB, Postgres and MongoDB are supported.
  // https://next-auth.js.org/configuration/databases
  //
  // Notes:
  // * You must install an appropriate node_module for your database
  // * The Email provider requires a database (OAuth providers do not)
  // database: process.env.DATABASE_URL,

  // The secret should be set to a reasonably long random string.
  // It is used to sign cookies and to sign and encrypt JSON Web Tokens, unless
  // a separate secret is defined explicitly for encrypting the JWT.
  secret: process.env.NEXTAUTH_SECRET,

  session: {
    // Use JSON Web Tokens for session instead of database sessions.
    // This option can be used with or without a database for users/accounts.
    // Note: `strategy` should be set to 'jwt' if no database is used.
    strategy: "jwt",

    // Seconds - How long until an idle session expires and is no longer valid.
    // maxAge: 30 * 24 * 60 * 60, // 30 days

    // Seconds - Throttle how frequently to write to database to extend a session.
    // Use it to limit write operations. Set to 0 to always update the database.
    // Note: This option is ignored if using JSON Web Tokens
    // updateAge: 24 * 60 * 60, // 24 hours
  },

  // JSON Web tokens are only used for sessions if the `strategy: 'jwt'` session
  // option is set - or by default if no database is specified.
  // https://next-auth.js.org/configuration/options#jwt
  jwt: {
    // A secret to use for key generation (you should set this explicitly)
    secret: process.env.NEXTAUTH_SECRET,
    // Set to true to use encryption (default: false)
    // encryption: true,
    // You can define your own encode/decode functions for signing and encryption
    // if you want to override the default behaviour.
    // encode: async ({ secret, token, maxAge }) => {},
    // decode: async ({ secret, token, maxAge }) => {},
  },

  // You can define custom pages to override the built-in ones. These will be regular Next.js pages
  // so ensure that they are placed outside of the '/api' folder, e.g. signIn: '/auth/mycustom-signin'
  // The routes shown here are the default URLs that will be used when a custom
  // pages is not specified for that route.
  // https://next-auth.js.org/configuration/pages
  pages: {
    // signIn: '/auth/signin',
    // signOut: '/auth/signout', // Displays form with sign out button
    // error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // Used for check email page
    // newUser: null // If set, new users will be directed here on first sign in
  },

  // Callbacks are asynchronous functions you can use to control what happens
  // when an action is performed.
  // https://next-auth.js.org/configuration/callbacks
  callbacks: {
    // async signIn({ user, account, profile, email, credentials }) { return true },
    // async redirect({ url, baseUrl }) { return baseUrl },
    // async session({ session, token, user }) { return session },
    // async jwt({ token, user, account, profile, isNewUser }) { return token }
    async jwt({ token, user, account, profile, isNewUser, trigger, session }) {
      // if a session update has been triggered - like in page header
      // where we are trying to update the correct airtableRecordId and walletAddress
      if (trigger === "update" && session) {
        // update with newly passed session object
        return {
          ...token,
          userProfile: {
            ...token.userProfile,
            airtableRecordId: session?.airtableRecordId,
          },
        }
      } else {
        let record: any
        if (profile) {
          const twitterProfile = profile as
            | TwitterLegacyProfile
            | TwitterProfile

          let User: UserType
          let followersCount = 0,
            twitterHandle,
            userID,
            twitterProfileImage

          // Function to check type of payload
          const isTwitterProfile = (input: any): input is TwitterProfile =>
            input.screen_name === undefined &&
            input.followers_count === undefined

          // Payload structure for Oauth 1.0
          if (!isTwitterProfile(twitterProfile)) {
            followersCount = twitterProfile.followers_count
            twitterHandle = `${twitterProfile.screen_name}`
            userID = twitterProfile.id_str
            twitterProfileImage = twitterProfile.profile_image_url_https
            // Payload structure for Oauth 2.0
          } else {
            twitterHandle = twitterProfile.data.username
            userID = twitterProfile.data.id
            twitterProfileImage = `${twitterProfile.data.profile_image_url}`
          }
          // build a dummy User object
          User = {
            airtableRecordId: "",
            twitterHandle,
            twitterFollowerCount: followersCount,
            twitterProfileImage,
            displayName: "",
          }

          record = await AirtableService.findOrCreateUser(User)

          token["userProfile"] = {
            followersCount,
            twitterHandle,
            userID,
            airtableRecordId: record ? record.id : "",
            image: twitterProfileImage,
          }
        }

        if (account) {
          token["credentials"] = {
            authToken: account.oauth_token as string,
            authSecret: account.oauth_token_secret as string,
          }
        }

        return token
      }
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      session.twitter = {
        followersCount: token.userProfile.followersCount,
        handle: token.userProfile.twitterHandle,
        userID: token.userProfile.userID,
        image: token.userProfile.image,
      }
      session.user = {
        airtableRecordId: token.userProfile.airtableRecordId || "",
      }
      return session
    },
  },

  // Events are useful for logging
  // https://next-auth.js.org/configuration/events
  events: {},

  // Enable debug messages in the console if you are having problems
  debug: true,
}

export default NextAuth(authOptions)
