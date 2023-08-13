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
    const screenNames: string[] = []
    if (queryParams.screen_name) {
      if (queryParams.screen_name instanceof Array) {
        queryParams.screen_name.forEach((name, idx) => {
          screenNames[idx] = name
        })
      } else {
        if (queryParams.screen_name.substring(0, 1) === "@") {
          screenNames.push(
            queryParams.screen_name.substring(1, queryParams.screen_name.length)
          )
        } else {
          screenNames.push(queryParams.screen_name)
        }
      }
      options = {
        screen_name: screenNames.join(","),
      }
    } else if (queryParams.user_id) {
      options = {
        user_id: queryParams.user_id,
      }
    }
    const results = await client.get("users/lookup", options)
    return res.status(200).json({
      status: "Ok",
      data: results,
    })
  } catch (e) {
    return res.status(400).json({
      // @ts-ignore
      status: e.message,
    })
  }
}
