import React from "react"
import Link from "next/link"

import { Button } from "./ui/button"

export default function SubmitEvent() {
  return (
    <div className="flex justify-end">
      <Button className="flex h-fit w-fit justify-end px-2 text-xs">
        <Link href="https://airtable.com/appNOa0dRcLXhHft1/shrhGUZFG8n4YAaU1">
          Submit Event
        </Link>
      </Button>
    </div>
  )
}
