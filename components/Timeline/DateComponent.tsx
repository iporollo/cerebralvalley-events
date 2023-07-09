import { format } from "date-fns"
import { processDate } from "src/utils/helpers"

export default function DateComponent({
  startDate,
  endDate,
}: {
  startDate: string
  endDate: string
}) {
  return (
    <div className="w-50 mb-4 flex-none">
      <div className="relative left-[-0.45rem]">
        {/* TODO: Only add this glowing dot every time there's a new date. e.g. on StartDate switch		 */}
        <div className="-left absolute mt-1 h-3 w-3 animate-ping rounded-full border border-white bg-[#1982FC] dark:border-gray-900 dark:bg-emerald-500"></div>
        <div className="-left absolute mt-1 h-3 w-3 rounded-full border border-white bg-[#1982FC] dark:border-gray-900 dark:bg-emerald-500"></div>
      </div>
      <time className="sticky mb-1 ml-8 font-mono text-base font-medium leading-none text-black dark:text-gray-500">
        <span className="text-lg text-black dark:text-white">
          {format(new Date(startDate), "MMM d")}
        </span>
        <span className="">{format(new Date(startDate), " eeee")}</span>
      </time>
    </div>
  )
}
