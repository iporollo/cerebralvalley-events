import type { NextApiRequest, NextApiResponse } from "next"
import { getToken } from "next-auth/jwt"
import Pusher from "pusher"

const pusher = new Pusher({
  appId: process.env.NEXT_PUBLIC_PUSHER_APP_ID!,
  key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY!,
  secret: process.env.NEXT_PUBLIC_PUSHER_APP_SECRET!,
  cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER!,
  useTLS: true,
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const socketId = req.body.socket_id
    const channel = req.body.channel_name

    const token = await getToken({ req })

    let randomString = (Math.random() + 1).toString(36).substring(7)

    const presenceData = {
      user_id: token?.sub || "anonymous" + randomString,
      user_info: {
        twitterHandle: token?.userProfile.twitterHandle || "",
        airtableRecordId: token?.userProfile.airtableRecordId || "",
        twitterAvatar: token?.picture || "",
        followerCount: token?.userProfile.followersCount || 0,
      },
    }
    const authResponse = pusher.authorizeChannel(
      socketId,
      channel,
      presenceData
    )
    res.send(authResponse)
  }
}
