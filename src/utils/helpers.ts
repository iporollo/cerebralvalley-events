import { format } from "date-fns"

const DATE_FORMAT = "MMM d (eee)"

const processDate = (startDate: string, endDate: string) => {
  if (!!startDate && !!endDate) {
    const startDateObj = new Date(startDate)
    const endDateObj = new Date(endDate)
    if (startDateObj.getDay() === endDateObj.getDay()) {
      return `${format(new Date(startDate), `${DATE_FORMAT}`)}`
    } else if (startDateObj.getMonth() === endDateObj.getMonth()) {
      return `${format(new Date(startDate), `${DATE_FORMAT}`)}-${format(
        new Date(endDate),
        "d"
      )}`
    } else {
      return `${format(new Date(startDate), `${DATE_FORMAT}`)} - ${format(
        new Date(endDate),
        `${DATE_FORMAT}`
      )}`
    }
  } else if (!!startDate) {
    return `${format(new Date(startDate), `${DATE_FORMAT}`)}`
  } else if (!!endDate) {
    return `${format(new Date(endDate), `${DATE_FORMAT}`)}`
  } else {
    return "-"
  }
}

const hashCode = (s: any) =>
  s.split("").reduce((a: any, b: any) => {
    a = (a << 5) - a + b.charCodeAt(0)
    return a & a
  }, 0)

export { processDate, hashCode }
