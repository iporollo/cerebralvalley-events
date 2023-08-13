"use client"

import Avatar from "components/Avatar/Avatar"

interface StackedAvatarListProps {
  people: SimpleTwitterUser[]
  eventId?: string
}

export default function StackedAvatarList({
  people,
  eventId,
}: StackedAvatarListProps) {
  const numAvatars = 4
  if (!people || people.length === 0) {
    return null
  } else if (people.length < numAvatars + 2) {
    return (
      <div className="flex -space-x-2 overflow-hidden">
        {people
          .sort((a, b) => b.followerCount! - a.followerCount!)
          .map((person) => (
            <Avatar
              key={`${person.avatar || person.handle}${eventId}`}
              className={"inline-block h-8 w-8 rounded-full"}
              imgSrc={person.avatar}
              handle={person.handle}
            />
          ))}
      </div>
    )
  } else {
    const sortedPeople = people.sort(
      (a, b) => b.followerCount! - a.followerCount!
    )
    const remainingImages = sortedPeople.length - numAvatars
    const firstThree = sortedPeople.slice(0, numAvatars)
    return (
      <div className="flex -space-x-2 overflow-hidden">
        {firstThree.map((p) => (
          <Avatar
            key={`${p.avatar || p.handle}${eventId}`}
            className={"inline-block h-8 w-8 rounded-full"}
            imgSrc={p.avatar}
            handle={p.handle}
          />
        ))}
        <div
          className={"flex h-8 w-8 items-center justify-center rounded-full"}
          style={{
            backgroundColor: "#D9D9D9",
          }}
        >
          <span>{`+${remainingImages}`}</span>
        </div>
      </div>
    )
  }
}
