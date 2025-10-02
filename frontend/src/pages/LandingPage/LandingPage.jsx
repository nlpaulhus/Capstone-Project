import { useNavigate, useLoaderData } from "react-router-dom";
import { useEffect } from "react";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import Carousel from "react-bootstrap/Carousel";
import Card from "react-bootstrap/Card";
import axios from "axios";
import "./LandingPage.css";

export const LandingPage = () => {
  const navigate = useNavigate();
  const { currentServices } = useLoaderData();

  const isLoggedIn = localStorage.getItem("loggedIn");

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/dashboard");
    }
  }, []);

  return (
    <div id="landingPage">
      <Stack className="col-md-9 mx-auto">
        <div id="headerImage">
          <div id="landingCarousel">
            <Carousel fade>
              <Carousel.Item>
                <img
                  className="carouselImage"
                  src="../../public/assets/slide1.svg"
                ></img>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="carouselImage"
                  src="../../public/assets/slide2.svg"
                ></img>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="carouselImage"
                  src="../../public/assets/slide3.svg"
                ></img>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="carouselImage"
                  src="../../public/assets/slide4.svg"
                ></img>
              </Carousel.Item>
            </Carousel>
          </div>
        </div>
        <div id="signupButton" className="d-grid gap-2">
          <Button as="a" href="/login" size="lg">
            Sign Up or Login
          </Button>
        </div>
        <div id="currentServicesCard">
          <Card>
            <h1 style={{ textAlign: "center" }}>Current Services Offered</h1>
            <ul>
              {currentServices.map((service) => (
                <li>{service}</li>
              ))}
            </ul>
          </Card>
        </div>
      </Stack>
    </div>
  );
};

export async function LandingPageLoader() {
  try {
    const data = await axios.get(`http://localhost:3000/services`);
    const currentServices = data.data.serviceNames;
    return { currentServices };
  } catch (error) {
    console.log(error);
  }
}
