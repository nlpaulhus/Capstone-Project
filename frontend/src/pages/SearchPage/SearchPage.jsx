import axios from "axios";
import { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import ListingBox from "../../components/ListingBox/ListingBox";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

import "./SearchPage.css";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";

export const SearchPage = () => {
  const { servicename, listings, user } = useLoaderData();
  console.log(listings);

  return (
    <div>
      <Container>
        <Row>
          <Col></Col>
          <Col>
            <Container>
              {listings.map((listing, index) => (
                <ListingBox key={index} listing={listing} />
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

export async function searchPageLoader({ params }) {
  const servicename = params.servicename;
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
    servicename: servicename,
    listings: listings.data.listings,
    user: user,
  };
}
