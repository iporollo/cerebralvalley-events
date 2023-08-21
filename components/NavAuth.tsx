"use client"

import { signIn, useSession } from "next-auth/react"

import { UserNav } from "./UserNav"
import { Button } from "./ui/button"

export function NavAuth() {
  const { data: session, status: sessionStatus } = useSession()

  if (sessionStatus === "loading") {
    return null
  }

  return (
    <div className="flex flex-1 items-center justify-end space-x-4">
      <nav className="flex items-center space-x-1">
        {sessionStatus === "authenticated" ? (
          <UserNav
            imgUrl={session?.twitter.image}
            handle={session?.twitter.handle}
          />
        ) : (
          <Button
            className="flex h-fit w-fit justify-end px-4 text-xs"
            onClick={() => {
              console.log(window.location.href)

              // signIn("twitter", {
              //   callback: window.location.href,
              // })
            }}
          >
            Log In
          </Button>
        )}
      </nav>
    </div>
  )
}
