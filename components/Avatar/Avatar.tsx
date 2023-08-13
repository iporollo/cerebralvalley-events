import { useMemo } from "react"
import { minidenticon } from "minidenticons"
import { hashCode } from "src/utils/helpers"

import {
  AvatarFallback,
  AvatarImage,
  Avatar as BaseAvatar,
} from "@/components/ui/avatar"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export interface AvatarProps {
  className?: string
  imgSrc?: string
  handle?: string
  showTooltip?: boolean
}

const Avatar = ({
  className = "h-8 w-8",
  imgSrc,
  handle,
  showTooltip,
}: AvatarProps) => {
  let avatarImage = imgSrc
  if (!avatarImage) {
    avatarImage =
      "data:image/svg+xml;utf8," +
      encodeURIComponent(minidenticon(handle!, "100", "50"))
  }

  if (showTooltip) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <BaseAvatar className={className}>
              <AvatarImage src={avatarImage} alt={handle} />
              <AvatarFallback>CV</AvatarFallback>
            </BaseAvatar>
          </TooltipTrigger>
          <TooltipContent>
            <p>{handle}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }

  return (
    <BaseAvatar className={className}>
      <AvatarImage src={avatarImage} alt={handle} />
      <AvatarFallback>CV</AvatarFallback>
    </BaseAvatar>
  )
}

export default Avatar
