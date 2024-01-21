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
  const [slidesToShow, setSlidesToShow] = useState(0)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSlidesToShow(1)
      } else if (events.length <= 2) {
        setSlidesToShow(events.length)
      } else if (window.innerWidth <= 1320) {
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

  const getSliderClassName = (eventCount: number) => {
    let widthClass = "max-w-[900px]"

    if (eventCount === 1) {
      widthClass = "w-[250px]"
    } else if (eventCount === 2) {
      widthClass = "w-[280px] md:w-[500px] lg:w-[500px]"
    } else if (eventCount >= 3) {
      widthClass = "w-[280px] md:w-[450px] lg:w-[600px] xl:w-[740px]"
    }

    return `${widthClass} md:overflow-hidden`
  }

  var sliderSettings = {
    dots: false,
    arrows: true,
    infinite: true,
    fade: false,
    pauseOnHover: false,
    className: getSliderClassName(events.length),
    autoplay: true,
    autoplaySpeed: 6000,
    speed: 1000,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
  }

  return (
    <div className="mb-2 grid w-[100%] justify-center md:justify-start">
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
