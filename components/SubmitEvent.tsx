import React from "react"
import Link from "next/link"
import { Plus } from "lucide-react"

import { Button } from "./ui/button"

export default function SubmitEvent({ variant = "default" }) {
  return (
    <div className="flex">
      <Button
        variant={variant}
        className="flex h-fit w-full  text-xs"
        onClick={() =>
          window.open(
            "https://airtable.com/appNOa0dRcLXhHft1/shrhGUZFG8n4YAaU1",
            "_blank"
          )
        }
      >
        <Plus className="mr-2 h-4 w-4" />
        Submit Event
      </Button>
    </div>
  )
}
