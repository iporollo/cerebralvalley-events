import React from "react"
import dynamic from "next/dynamic"

const SubmitEventPageForm = dynamic(
  () => import("@/components/SubmitEventPageForm"),
  { ssr: false }
)

export default async function SubmitPage() {
  return <SubmitEventPageForm />
}
