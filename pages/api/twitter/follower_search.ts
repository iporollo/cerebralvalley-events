import type { NextApiRequest, NextApiResponse } from "next"
import { getToken } from "next-auth/jwt"
import Twitter from "twitter-lite"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const queryParams = req.query

  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  })

  const client = new Twitter({
    subdomain: "api",
    consumer_key: process.env.TWITTER_CLIENT_ID!,
    consumer_secret: process.env.TWITTER_CLIENT_SECRET!,
    access_token_key: token?.credentials.authToken,
    access_token_secret: token?.credentials.authSecret,
  })

  try {
    let options = {}
    if (queryParams.screen_name) {
      options = {
        screen_name:
          queryParams.screen_name instanceof Array
            ? queryParams.screen_name.join(",")
            : queryParams.screen_name,
      }
    } else if (queryParams.user_id) {
      options = {
        user_id:
          queryParams.user_id instanceof Array
            ? queryParams.user_id.join(",")
            : queryParams.user_id,
      }
    }

    const results: FriendshipLookup[] = await client.get(
      "friendships/lookup",
      options
    )
    let followerResults: FriendshipLookup[] = []

    if (results.length > 0) {
      followerResults = results.filter((r) =>
        r.connections.includes("following")
      )
    }

    return res.status(200).json({
      status: "Ok",
      data: followerResults,
    })
  } catch (e) {
    return res.status(400).json({
      status: e,
    })
  }
}
