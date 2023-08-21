import Pusher from "pusher-js"
import { useViewerStore } from "src/store"
import { PUSHER_EVENT_CHANNEL } from "src/utils/constants"

const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY!, {
  cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER!,
  forceTLS: true,
  channelAuthorization: {
    endpoint: `/events/api/pusher/auth`,
    transport: "ajax",
  },
})

export const usePageViewers = () => {
  const pageViewers: PageViewer[] = useViewerStore(
    (state: any) => state.pageViewers
  )
  const setPageViewers = useViewerStore((state: any) => state.setPageViewers)

  // Pusher.js logic
  if (typeof window !== "undefined") {
    const channel = pusher?.subscribe(PUSHER_EVENT_CHANNEL)

    channel.bind("pusher:subscription_succeeded", () => {
      const allChannelMembers: PageViewer[] = []
      //@ts-ignore
      channel.members.each((member) => {
        //@ts-ignore
        if (member.id !== channel.members.me.id) {
          allChannelMembers.unshift(member)
        }
      })
      setPageViewers(allChannelMembers)
    })
    channel.bind("pusher:member_added", (member: any) => {
      const currentViewers = [...pageViewers]
      //@ts-ignore
      if (member.id !== channel.members.me.id) {
        currentViewers.unshift(member)
      }
      setPageViewers(currentViewers)
    })
    channel.bind("pusher:member_removed", (member: any) => {
      const currentViewers = [...pageViewers]
      currentViewers.splice(pageViewers.indexOf(member.id), 1)
      setPageViewers(currentViewers)
    })
  }

  return { pageViewers }
}
