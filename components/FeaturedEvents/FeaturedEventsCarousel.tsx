import { useEffect, useState } from "react"
import Slider from "react-slick"

import FeaturedEventsCard from "./FeaturedEventsCard"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

type FeaturedEventsCarouselProps = {
  events: FeaturedEventType[]
}

export const FeaturedEventsCarousel = ({
  events,
}: FeaturedEventsCarouselProps) => {
  const [slidesToShow, setSlidesToShow] = useState(3)

  useEffect(() => {
    const handleResize = () => {
      if (events.length <= 2) {
        setSlidesToShow(events.length)
      } else if (window.innerWidth > 768 && window.innerWidth <= 1320) {
        setSlidesToShow(2)
      } else {
        setSlidesToShow(3)
      }
    }

    handleResize() // Call the function once to set the initial state
    window.addEventListener("resize", handleResize) // Update state whenever the window size changes

    // Clean up event listener on unmount
    return () => window.removeEventListener("resize", handleResize)
  }, [events])

  var sliderSettings = {
    dots: true,
    dotsClass: "slick-dots",
    arrows: false,
    infinite: true,
    fade: false,
    pauseOnHover: true,
    className: `w-full ${
      slidesToShow === 3 ? "w-[794px]" : "max-w-[794px]"
    } md:overflow-hidden`,
    autoplay: true,
    autoplaySpeed: 6000,
    speed: 1000,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
  }

  return (
    <div className="mb-2 grid w-[100%] justify-start">
      <Slider {...sliderSettings}>
        {events.map((event: FeaturedEventType, idx: number) => (
          <div className="p-2" key={idx}>
            <FeaturedEventsCard event={event} />
          </div>
        ))}
      </Slider>
    </div>
  )
}
