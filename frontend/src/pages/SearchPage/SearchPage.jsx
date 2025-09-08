import axios from "axios";
import { useState, useEffect } from "react";
import {
  useLoaderData,
  useNavigate,
  useSearchParams,
  useParams,
} from "react-router-dom";
import ListingBox from "../../components/ListingBox/ListingBox";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import InputGroup from "react-bootstrap/InputGroup";
import AllServicesList from "../../components/AllServicesList/AllServicesList";

import "./SearchPage.css";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";

export const SearchPage = () => {
  const { listings, user, allServices } = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();

  const formData = {
    servicename: searchParams.get("search"),
    sort: searchParams.get("sort"),
    innetwork: searchParams.get("innetwork"),
    hourly: searchParams.get("hourly"),
    flatrate: searchParams.get("flatrate"),
  };

  const navigate = useNavigate();

  function updateSearch(e) {
    const next = new URLSearchParams(searchParams);
    next.set("search", e.target.value);
    setSearchParams(next);
  }

  // Set or update a parameter – triggers navigation
  function updateParam(e) {
    // clone current params (important to preserve existing values)
    const next = new URLSearchParams(searchParams);
    next.set(e.target.id, e.target.value);
    setSearchParams(next);
  }

  // Remove a parameter
  function removeParam(e) {
    const next = new URLSearchParams(searchParams);
    next.delete(e.target.id);
    setSearchParams(next);
  }

  function filterClick(e) {
    if (e.target.checked) {
      const next = new URLSearchParams(searchParams);
      next.set(e.target.id, true);
      setSearchParams(next);
    } else {
      const next = new URLSearchParams(searchParams);
      next.delete(e.target.id);
      setSearchParams(next);
    }
  }

  return (
    <div>
      <Container>
        <Row>
          <Col>
            <Form>
              <Form.Label>Service:</Form.Label>
              <AllServicesList
                serviceNames={allServices}
                formData={formData}
                onChangeHandler={updateSearch}
              />

              <Form.Group className="mb-3" controlId="sort">
                <Form.Label>Sort By:</Form.Label>
                <Form.Select onChange={updateParam} defaultValue={"rating"}>
                  <option value={"rating"}>Rating</option>
                  <option value={"price"}>Price</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3" controlId="filters">
                <Form.Label>Filters</Form.Label>
                <Form.Check
                  label="In My Network"
                  id="innetwork"
                  onChange={filterClick}
                />
                <Form.Check label="Hourly" id="hourly" onChange={filterClick} />
                <Form.Check
                  label="Flat Rate"
                  id="flatrate"
                  onChange={filterClick}
                />
              </Form.Group>
            </Form>
          </Col>
          <Col>
            <Container>
              {listings.map((listing, index) => (
                <ListingBox key={index} listing={listing} index={index} />
              ))}
            </Container>
          </Col>

          <Col>
            <MapContainer
              center={[user.lat, user.lng]}
              zoom={11}
              scrollWheelZoom={false}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {listings.map((listing, index) => (
                <Marker key={index} position={[listing.lat, listing.lng]}>
                  <Popup>This is a popup</Popup>
                </Marker>
              ))}
            </MapContainer>
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
