import Carousel from "react-multi-carousel";
import Image from "react-bootstrap/esm/Image";
import "react-multi-carousel/lib/styles.css"; // Import the default styles
import Badge from "react-bootstrap/esm/Badge";
import ProfileCreditBox from "../CreditBox/ProfileCreditBox";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const NetworkCarousel = ({ items }) => {
  return (
    <Carousel
      responsive={responsive}
      infinite={true} // Optional: for endless loop
      autoPlay={true} // Optional: for autoplay
      autoPlaySpeed={3000} // Optional: autoplay speed
      keyBoardControl={true} // Optional: keyboard navigation
      containerClass="carousel-container" // Optional: custom class for container
      itemClass="carousel-item-padding-40-px" // Optional: custom class for items
    >
      {items.map((item, index) => (
        <ProfileCreditBox
          key={index}
          credit={item}
          inNetwork={item.inNetwork}
        />
      ))}
    </Carousel>
  );
};

export default NetworkCarousel;
