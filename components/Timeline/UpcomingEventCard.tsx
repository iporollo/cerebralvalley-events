import * as React from "react"

import type { EventType } from "@/types/event"

import UpcomingEvent from "./TimelineRow"

export default function UpcomingEventCard({ event }: { event: EventType }) {
  return (
    <div className="w-400 grow">
      {/*<div className="relative left-[-0.45rem]">*/}
      {/* TODO: Only add this glowing dot every time there's a new date. e.g. on StartDate switch		 */}
      {/*<div className="-left absolute mt-1 h-3 w-3 animate-ping rounded-full border border-white bg-[#1982FC] dark:border-gray-900 dark:bg-emerald-500"></div>
        <div className="-left absolute mt-1 h-3 w-3 rounded-full border border-white bg-[#1982FC] dark:border-gray-900 dark:bg-emerald-500"></div>
      </div>*/}
      <div className="ml-8 flex grow flex-col rounded-lg border-[1px] border-b-[#d3d3d5] border-l-[#e3e3e3] border-r-[#e3e3e3] border-t-[#e7e7e9] bg-white px-5 py-3.5 text-[#717078] duration-200 hover:border-b-[#b2b3b5] hover:border-l-[#bbbbbd] hover:border-r-[#bbbbbd] hover:border-t-[#c3c3c5] hover:shadow-[0_0_8px_rgba(178,179,181,0.20)] dark:border-b-[#333237] dark:border-l-[#313035] dark:border-r-[#313035] dark:border-t-[rgba(64,63,68,1)] dark:bg-[#27262b] dark:hover:border-[#a1a1a3] dark:hover:bg-[#1b1a1f] dark:hover:text-[#a1a1a3] dark:hover:shadow-[0_0_8px_rgba(255,255,255,0.15)]">
        <a href={event.link}>
          <h3 className="text-medium mb-2 font-medium text-gray-900 dark:font-normal dark:text-white">
            {event.event}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="feather feather-arrow-up-right mb-1 ml-1 inline"
            >
              <line x1="7" y1="17" x2="17" y2="7"></line>
              <polyline points="7 7 17 7 17 17"></polyline>
            </svg>
          </h3>
          <p className="text-base font-normal text-[#6f737c]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15.5"
              height="15.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="feather feather-map-pin mb-1 mr-2.5 inline opacity-80"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            {event.location}
          </p>

          {/* <a
          href={event.link}
          className="mt-4 inline-flex items-center rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:text-blue-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
        >
          Sign Up{" "}
          <svg
            className="ml-2 h-3 w-3"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </a> */}
        </a>
      </div>
    </div>
  )
}
