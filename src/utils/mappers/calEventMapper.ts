export const mapCalEvent = (calEvent: EventType): AddToCalEvent => {
  const startDate = new Date(calEvent.startDate)
  const endDate = new Date(calEvent.endDate)
  const timezoneOffsetMinutes = startDate.getTimezoneOffset()
  const timezone = `UTC${timezoneOffsetMinutes >= 0 ? "-" : "+"}${Math.abs(
    timezoneOffsetMinutes / 60
  )}`

  const formatDateToYYYYMMDDTHHmmssZ = (date: Date) => {
    const YYYY = date.getUTCFullYear()
    const MM = (date.getUTCMonth() + 1).toString().padStart(2, "0")
    const DD = date.getUTCDate().toString().padStart(2, "0")
    const HH = date.getUTCHours().toString().padStart(2, "0")
    const mm = date.getUTCMinutes().toString().padStart(2, "0")
    const ss = date.getUTCSeconds().toString().padStart(2, "0")
    return `${YYYY}${MM}${DD}T${HH}${mm}${ss}Z`
  }

  const startDatetime = formatDateToYYYYMMDDTHHmmssZ(startDate)
  const endDatetime = formatDateToYYYYMMDDTHHmmssZ(endDate)

  const durationInMilliseconds = endDate.getTime() - startDate.getTime()
  const durationInHours = durationInMilliseconds / (1000 * 60 * 60)
  const durationHours = Math.floor(durationInHours)
  const durationMinutes = Math.round((durationInHours - durationHours) * 60)
  const duration = `${durationHours
    .toString()
    .padStart(2, "0")}${durationMinutes.toString().padStart(2, "0")}`

  return {
    description: "",
    duration: duration,
    endDatetime: endDatetime,
    location: calEvent.location,
    startDatetime: startDatetime,
    timezone: timezone,
    title: calEvent.event,
  }
}
