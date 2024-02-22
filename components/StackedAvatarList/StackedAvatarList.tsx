"use client"

import Avatar from "components/Avatar/Avatar"

interface StackedAvatarListProps {
  people: SimpleTwitterUser[]
  eventId?: string
  iconSize?: number
}

export default function StackedAvatarList({
  people,
  eventId,
  iconSize = 8,
}: StackedAvatarListProps) {
  const numAvatars = 4

  // Remove duplicates in list
  const cleanPeople =
    people?.filter(
      (v, i, a) => a.findIndex((v2) => v2.airtableId === v.airtableId) === i
    ) || []
  if (!cleanPeople || cleanPeople.length === 0) {
    return null
  } else if (cleanPeople.length < numAvatars + 2) {
    return (
      <div className="flex -space-x-2 overflow-hidden">
        {people
          .sort((a, b) => b.followerCount! - a.followerCount!)
          .map((person) => (
            <Avatar
              key={`${person.avatar || person.handle}${eventId}`}
              className={`inline-block h-${iconSize} w-${iconSize} rounded-full`}
              imgSrc={person.avatar}
              handle={person.handle}
              showTooltip
            />
          ))}
      </div>
    )
  } else {
    const sortedPeople = cleanPeople.sort(
      (a, b) => b.followerCount! - a.followerCount!
    )

    const avatarsToShow = sortedPeople.slice(0, numAvatars)
    const remainingAvatars = sortedPeople.length - numAvatars

    return (
      <div className="flex items-center -space-x-2 overflow-hidden">
        {avatarsToShow.map((p) => (
          <Avatar
            key={`${p.avatar || p.handle}${eventId}`}
            className={`inline-block h-${iconSize} w-${iconSize} rounded-full`}
            imgSrc={p.avatar}
            handle={p.handle}
            showTooltip
          />
        ))}
        <div
          className={`flex h-${iconSize} w-${iconSize} items-center justify-center rounded-full bg-gray-700`}
        >
          <span className="text-xs">{`+${remainingAvatars}`}</span>
        </div>
      </div>
    )
  }
}
