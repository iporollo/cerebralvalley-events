import { format, isSameDay } from "date-fns"
import { utcToZonedTime } from "date-fns-tz"

const FeaturedEventsCard = ({ event }: { event: EventType }) => {
  return (
    <div
      className={`series-menu-item relative block h-full w-full cursor-pointer overflow-hidden rounded-3xl text-left`}
      onClick={(e) => {
        e.stopPropagation()
        window.open(event.link, "_blank")
      }}
    >
      <div>
        <div
          className={"min-h-[8rem] md:min-h-[12rem]"}
          style={{
            background: `url(${event.imageUri}) no-repeat center`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="border-[1px] border-x-[#e3e3e3]  border-b-[#d3d3d5] border-t-[#e7e7e9] bg-white p-3 text-[#717078] duration-200 dark:border-x-[#313035] dark:border-b-[#333237] dark:border-t-[rgba(64,63,68,1)] dark:bg-[#27262b]">
          <h2 className={"text-left text-sm font-bold dark:text-white"}>
            {event.event}
          </h2>
          {event.event.length < 28 && <div className="m-[1.3rem]" />}
          <div
            className="py-1 text-sm font-normal"
            style={{
              color: "#858585",
            }}
          >
            <div
              className={"text-ssm flex items-center gap-x-2 pb-1 text-left"}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17.5"
                height="17.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-calendar inline opacity-80"
              >
                <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                <line x1="16" x2="16" y1="2" y2="6" />
                <line x1="8" x2="8" y1="2" y2="6" />
                <line x1="3" x2="21" y1="10" y2="10" />
              </svg>
              <span>
                {isSameDay(new Date(event.startDate), new Date(event.endDate))
                  ? format(
                      utcToZonedTime(
                        new Date(event.startDate),
                        "America/Los_Angeles"
                      ),
                      "MMM d"
                    )
                  : `${format(
                      utcToZonedTime(
                        new Date(event.startDate),
                        "America/Los_Angeles"
                      ),
                      "MMM d"
                    )} - ${format(
                      utcToZonedTime(
                        new Date(event.endDate),
                        "America/Los_Angeles"
                      ),
                      "MMM d"
                    )}`}
              </span>
            </div>
            <div className={"text-ssm flex items-center gap-x-2 text-left"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17.5"
                height="17.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-map-pin inline opacity-80"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <span>{`${event.location}`}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeaturedEventsCard
