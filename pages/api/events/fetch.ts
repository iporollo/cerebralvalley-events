import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // approved can be "true", "false"
    // featured can be "true", "false"
    // show can be "past", "upcoming", "all"
    const { approved, featured, startDate, endDate, show } = req.query

    const params = new URLSearchParams({
      approved: approved as string,
      featured: featured as string,
    })

    if (startDate) {
      params.append("startDate", startDate as string)
    }

    if (endDate) {
      params.append("endDate", endDate as string)
    }

    if (!startDate && !endDate && !!show) {
      params.append("show", show as string)
    }

    const apiUrl = process.env.API_HOST || "http://localhost:8000"
    const response = await fetch(
      `${apiUrl}/v1/events/pull?${params.toString()}`,
      {
        method: "GET",
        headers: {
          "x-api-key": process.env.API_KEY || "",
        },
      }
    )

    if (!response.ok) {
      const errorData = await response.json()
      res.status(response.status).json(errorData)
      return
    }

    const data = await response.json()

    res.status(200).json(data)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Failed to pull data" })
  }
}
