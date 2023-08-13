import { useMemo } from "react"
import { minidenticon } from "minidenticons"
import { hashCode } from "src/utils/helpers"

import {
  AvatarFallback,
  AvatarImage,
  Avatar as BaseAvatar,
} from "@/components/ui/avatar"

export interface AvatarProps {
  className?: string
  imgSrc?: string
  handle?: string
}

const Avatar = ({ className = "h-8 w-8", imgSrc, handle }: AvatarProps) => {
  let avatarImage = imgSrc
  if (!avatarImage) {
    avatarImage =
      "data:image/svg+xml;utf8," +
      encodeURIComponent(minidenticon(handle!, "100", "50"))
  }
  return (
    <BaseAvatar className={className}>
      <AvatarImage src={avatarImage} alt={handle} />
      <AvatarFallback>CV</AvatarFallback>
    </BaseAvatar>
  )
}

export default Avatar
