import React from "react"

import { Button } from "./ui/button"

export default function SubmitEvent() {
  return (
    <div className="flex justify-end">
      <Button className="flex h-fit w-fit justify-end px-2 text-xs">
        Submit Event
      </Button>
    </div>
  )
}
