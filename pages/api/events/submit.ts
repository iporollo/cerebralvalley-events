// pages/api/events/submit.ts

import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    // Handle the POST request
    const { email, name, startDate, endDate, location, link, featured } =
      req.body

    console.log(req.body)

    try {
      const response = await fetch(`${process.env.API_HOST}/v1/events/ingest`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.API_KEY || "",
        },
        body: JSON.stringify({
          name,
          description: "",
          start: startDate,
          end: endDate,
          location,
          link,
          submitter: email,
          feature: featured,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json() // Get error message from the API response
        res
          .status(response.status)
          .json({ message: errorData.message || "Network response was not ok" })
        return
      }

      res.status(200).json({ message: "Form submitted successfully" })
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message)
      } else {
        console.log(error)
      }
      res.status(500).json({ message: "Form submission failed" })
    }
  } else {
    // Handle any other HTTP method
    res.setHeader("Allow", ["POST"])
    res.status(405).json({
      message: `Method ${req.method} is not allowed. Only POST is allowed.`,
    })
  }
}
