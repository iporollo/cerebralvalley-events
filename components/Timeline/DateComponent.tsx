import { format } from "date-fns"
import { processDate } from "src/utils/helpers"

export default function DateComponent({
  startDate,
  endDate,
}: {
  startDate: string
  endDate: string
}) {
  // TODO: Output in this format:
  // Jun 15 Thurs -
  // Jun 18 Sun
  // Where Thurs/Sun are small and grayer than the date

  // TODO: Only add dates on startDate change

  return (
    <div className="mb-4 w-40 flex-none">
      <div className="relative left-[-0.45rem]">
        {/* TODO: Only add this glowing dot every time there's a new date. e.g. on StartDate switch		 */}
        <div className="-left absolute mt-1 h-3 w-3 animate-ping rounded-full border border-white bg-[#1982FC] dark:border-gray-900 dark:bg-emerald-500"></div>
        <div className="-left absolute mt-1 h-3 w-3 rounded-full border border-white bg-[#1982FC] dark:border-gray-900 dark:bg-emerald-500"></div>
      </div>
      <time className="sticky mb-1 ml-8 font-mono text-base font-medium leading-none text-black dark:text-gray-500">
        {processDate(startDate, endDate)}
      </time>
    </div>
  )
}

//TODO: What is the time element/what does it do
