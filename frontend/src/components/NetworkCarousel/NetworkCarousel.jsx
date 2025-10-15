import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css"; // Import the default styles
import ProfileCreditBox from "../CreditBox/ProfileCreditBox";

const NetworkCarousel = ({ items }) => {
  const itemcount = items.length;
  console.log(itemcount);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: itemcount < 5 ? itemcount : 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: itemcount < 3 ? itemcount : 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: itemcount < 3 ? itemcount : 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: itemcount < 3 ? itemcount : 3,
    },
  };

  return (
    <Carousel
      responsive={responsive}
      infinite={true} // Optional: for endless loop
      autoPlay={false} // Optional: for autoplay
      autoPlaySpeed={3000} // Optional: autoplay speed
      keyBoardControl={true} // Optional: keyboard navigation
      // containerClass="carousel-container" // Optional: custom class for container
      // itemClass="carousel-item-padding-40-px" // Optional: custom class for items
    >
      {items.map((item, index) => (
        <ProfileCreditBox key={index} credit={item} />
      ))}
    </Carousel>
  );
};

export default NetworkCarousel;
