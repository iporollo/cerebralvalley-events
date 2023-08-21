import React from "react"
import Link from "next/link"
import { Plus } from "lucide-react"

import { Button } from "./ui/button"

export default function SubmitEvent({ variant = "default" }) {
  return (
    <div className="flex">
      <Button
        // @ts-ignore
        variant={variant}
        className=" flex h-fit w-full border-[#e3e3e3] bg-gray-200 text-xs text-gray-600 dark:border-[#313035] dark:bg-black dark:text-white dark:hover:text-gray-300"
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
