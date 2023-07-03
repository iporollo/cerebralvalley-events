import { format } from "date-fns"

const processDate = (startDate: string, endDate: string) => {
  if (!!startDate && !!endDate) {
    const startDateObj = new Date(startDate)
    const endDateObj = new Date(endDate)
    if (startDateObj.getDay() === endDateObj.getDay()) {
      return `${format(new Date(startDate), "MMM d")}`
    } else if (startDateObj.getMonth() === endDateObj.getMonth()) {
      return `${format(new Date(startDate), "MMM d")}-${format(
        new Date(endDate),
        "d"
      )}`
    } else {
      return `${format(new Date(startDate), "MMM d")} - ${format(
        new Date(endDate),
        "MMM d"
      )}`
    }
  } else if (!!startDate) {
    return `${format(new Date(startDate), "MMM d")}`
  } else if (!!endDate) {
    return `${format(new Date(endDate), "MMM d")}`
  } else {
    return "-"
  }
}

export { processDate }
