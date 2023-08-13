import React from "react"
import Link from "next/link"
import { Plus } from "lucide-react"

import { Button } from "./ui/button"

export default function SubmitEvent({ variant = "default" }) {
  return (
    <div className="flex">
      {/* @ts-ignore */}
      <Button variant={variant} className="flex h-fit w-full  text-xs">
        <Plus className="mr-2 h-4 w-4" />
        <Link
          target="_black"
          referrerPolicy="no-referrer"
          href="https://airtable.com/appNOa0dRcLXhHft1/shrhGUZFG8n4YAaU1"
        >
          Submit Event
        </Link>
      </Button>
    </div>
  )
}
