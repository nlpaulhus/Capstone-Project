import { useNavigate, useLoaderData } from "react-router-dom";
import { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Stack from "react-bootstrap/Stack";
import axios from "axios";

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
    <Container>
      <Stack gap={3}>
        <Card>
          <h1 style={{ textAlign: "center" }}>Hollywood Hires Hollywood</h1>
          <p style={{ textAlign: "center" }}>
            Get a Grip is a platform built by Hollywood for Hollywood. We've
            weathered pandemic shutdowns, labor union strikes and production
            cutbacks by taking care of one another and Get a Grip hopes to
            provide another means to do so.
          </p>
        </Card>
        <Card>
          <h1 style={{ textAlign: "center" }}>Who Is It For?</h1>
          <p style={{ textAlign: "center" }}>
            Anyone with an IMDb page! Whether you're a 2nd AD looking to hire a
            dog sitter to cover you on a Fraturday or a script coordinator with
            a proofreading side hustle, Get a Grip is for you.
          </p>
        </Card>
        <Card>
          <h1 style={{ textAlign: "center" }}>How Does It Work?</h1>
          <p style={{ textAlign: "center" }}>
            Signup using your IMDb page, create your network, list your services
            and/or connect with those offering theirs, with ability to search
            within your network and by location.
          </p>
        </Card>
        <Card>
          <h1 style={{ textAlign: "center" }}>Current Services Offered</h1>
          <ul>
            {currentServices.map((service) => (
              <li>{service}</li>
            ))}
          </ul>
        </Card>

        <p style={{ textAlign: "center" }}>
          Is your service not listed? Having an issue with your account? Have an
          idea on how we can build upon this platform? <br></br>Reach out at{" "}
          <a href={`mailto:contactagrip@gmail.com`}>contactagrip@gmail.com</a>
        </p>
      </Stack>
    </Container>
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
