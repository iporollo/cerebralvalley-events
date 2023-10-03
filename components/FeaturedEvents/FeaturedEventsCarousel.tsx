import { Navigation } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"

import FeaturedEventsCard from "./FeaturedEventsCard"
// Import Swiper styles
import "swiper/css"
import "swiper/css/navigation"

type FeaturedEventsCarouselProps = {
  events: EventType[]
}

export const FeaturedEventsCarousel = ({
  events,
}: FeaturedEventsCarouselProps) => {
  return (
    <div className="mb-2 grid w-[100%] justify-start">
      <Swiper
        navigation
        spaceBetween={10}
        slidesPerView={2.7}
        modules={[Navigation]}
      >
        {events.map((event: EventType, idx: number) => (
          <SwiperSlide className="py-2" key={idx}>
            <FeaturedEventsCard event={event} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
