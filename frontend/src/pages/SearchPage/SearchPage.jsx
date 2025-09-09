import axios from "axios";

import { useLoaderData, useNavigate, useSearchParams } from "react-router-dom";
import ListingBox from "../../components/ListingBox/ListingBox";
import SearchMap from "../../components/SearchMap/SearchMap";
import SearchForm from "../../components/SearchForm/SearchForm";

import { useRef } from "react";

import Button from "react-bootstrap/esm/Button";
import InputGroup from "react-bootstrap/InputGroup";

import "./SearchPage.css";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";

export const SearchPage = () => {
  const { listings, user, allServices } = useLoaderData();

  const navigate = useNavigate();

  return (
    <div>
      <Container>
        <Row>
          <Col>
            <SearchForm allServices={allServices} />
          </Col>
          <Col>
            <Container>
              {listings.map((listing, index) => (
                <ListingBox
                  key={index}
                  id={`listing${index + 1}`}
                  listing={listing}
                  index={index}
                />
              ))}
            </Container>
          </Col>

          <Col>
            <SearchMap listings={listings} lat={user.lat} lng={user.lng} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export async function searchPageLoader({ request }) {
  const url = new URL(request.url);
  const sort = url.searchParams.get("sort") || "rating";
  const servicename = url.searchParams.get("search");
  const innetwork = url.searchParams.get("innetwork") || false;
  const hourly = url.searchParams.get("hourly") || false;
  const flatrate = url.searchParams.get("flatrate") || false;

  try {
    const allServices = await axios
      .get(`http://localhost:3000/services`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then((allServices) => allServices.data.serviceNames);

    const user = await axios
      .get("http://localhost:3000/user", {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then((user) => user.data);

    const userId = user.userid;
    const listings = await axios.get(
      `http://localhost:3000/search/${servicename}/${userId}`
    );

    return {
      listings: listings.data.listings,
      user: user,
      allServices: allServices,
    };
  } catch (err) {
    console.log(err);
  }
}
