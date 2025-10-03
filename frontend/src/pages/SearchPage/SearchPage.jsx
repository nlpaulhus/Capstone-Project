import axios from "axios";
import { useState, useEffect } from "react";
import {
  useLoaderData,
  useSearchParams,
  useRevalidator,
  redirect,
} from "react-router-dom";
import ListingBox from "../../components/ListingBox/ListingBox";
import SearchMap from "../../components/SearchMap/SearchMap";
import SearchForm from "../../components/SearchForm/SearchForm";

import "./SearchPage.css";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";

export const SearchPage = () => {
  const { listings, user, allServices, mapCenter } = useLoaderData();
  const [activeItem, setActiveItem] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const revalidator = useRevalidator();
  const [paymentType, setPaymentType] = useState("all");
  const [searchRadius, setSearchRadius] = useState("suggested");
  const [searchAddress, setSearchAddress] = useState(
    searchParams.get("zipcode") || user.zip
  );

  const [page, setPage] = useState(0);

  console.log(listings);

  const handleMouseEnter = (id) => {
    setActiveItem(id);
  };
  const handleMouseLeave = () => setActiveItem(null);

  const formData = {
    servicename: searchParams.get("search"),
  };

  function updateSearch(e) {
    const next = new URLSearchParams(searchParams);
    next.set("search", e.target.value);
    setSearchParams(next, { replace: true });
    revalidator.revalidate();
  }

  function filterClick(e) {
    if (e.target.checked) {
      const next = new URLSearchParams(searchParams);
      next.set(e.target.id, true);
      setSearchParams(next, { replace: true });
      revalidator.revalidate();
    } else {
      const next = new URLSearchParams(searchParams);
      next.delete(e.target.id);
      setSearchParams(next, { replace: true });
      revalidator.revalidate();
    }
  }

  function paymentTypeClick(e) {
    if (e.target.id === "all") {
      setPaymentType("all");
      const next = new URLSearchParams(searchParams);
      next.delete("hourly");
      next.delete("flatrate");
      setSearchParams(next, { replace: true });
      revalidator.revalidate();
    } else {
      const next = new URLSearchParams(searchParams);
      next.set(e.target.id, true);
      next.delete(paymentType);
      setSearchParams(next, { replace: true });
      setPaymentType(e.target.id);
      revalidator.revalidate();
    }
  }

  function searchRadiusClick(e) {
    if (e.target.id === "suggested") {
      setSearchRadius("suggested");
      const next = new URLSearchParams(searchParams);
      next.delete("searchRadius");
      setSearchParams(next, { replace: true });
      revalidator.revalidate();
    } else {
      setSearchRadius(e.target.id);
      const next = new URLSearchParams(searchParams);
      next.delete("searchRadius");
      next.set("searchRadius", e.target.id);
      setSearchParams(next, { replace: true });
      revalidator.revalidate();
    }
  }

  function searchAddressChange(e) {
    setSearchAddress(e.target.value);
  }

  function searchAddressSubmit(e) {
    e.preventDefault();

    if (searchAddress.length === 5 && parseInt(searchAddress)) {
      const next = new URLSearchParams(searchParams);
      next.set("zipcode", searchAddress);
      setSearchParams(next, { replace: true });
    }
    revalidator.revalidate();
  }

  function paginationClick(e) {
    if (e.target.innerText === "Previous") {
      const newPage = page - 1;
      setPage(newPage);
      const next = new URLSearchParams(searchParams);
      next.set("p", newPage);
      setSearchParams(next, { replace: true });
      revalidator.revalidate();
    }

    if (e.target.innerText === "Next") {
      const newPage = page + 1;
      setPage(newPage);
      console.log(page);
      const next = new URLSearchParams(searchParams);
      next.set("p", newPage);
      setSearchParams(next, { replace: true });
      revalidator.revalidate();
    }
  }

  const [open, setOpen] = useState(false);

  return (
    <div id="searchPage">
      <Container>
        <Row>
          <div className="d-md-none">
            <div id="collapseDiv">
              <Button
                variant="outline-primary"
                id="collapseButton"
                onClick={() => setOpen(!open)}
                aria-controls="example-collapse-text"
                aria-expanded={open}
              >
                {open ? "Close" : "Change Search"}
              </Button>
            </div>
            <Collapse in={open}>
              <div>
                <SearchForm
                  allServices={allServices}
                  formData={formData}
                  updateSearch={updateSearch}
                  filterClick={filterClick}
                  paymentTypeClick={paymentTypeClick}
                  paymentType={paymentType}
                  userzip={user.zip}
                  searchRadius={searchRadius}
                  searchRadiusClick={searchRadiusClick}
                  searchAddress={searchAddress}
                  searchAddressChange={searchAddressChange}
                  searchAddressSubmit={searchAddressSubmit}
                />
              </div>
            </Collapse>
          </div>
          <Col md={3} className="d-none d-md-block">
            <div className="sticky">
              <SearchForm
                allServices={allServices}
                formData={formData}
                updateSearch={updateSearch}
                filterClick={filterClick}
                paymentTypeClick={paymentTypeClick}
                paymentType={paymentType}
                userzip={user.zip}
                searchRadius={searchRadius}
                searchRadiusClick={searchRadiusClick}
                searchAddress={searchAddress}
                searchAddressChange={searchAddressChange}
                searchAddressSubmit={searchAddressSubmit}
              />
            </div>
          </Col>

          <Col>
            <Stack id="listingsColumn" gap={3}>
              <Container id="listingsContainer" className="p-2">
                {listings.map((listing) => (
                  <ListingBox
                    key={listing.id}
                    listing={listing}
                    activeItem={activeItem}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  />
                ))}
              </Container>

              <Stack id="prevNextButtonStack" direction="horizontal" gap={3}>
                <Button
                  className="p-2"
                  onClick={paginationClick}
                  variant="link"
                  disabled={page > 0 ? false : true}
                >
                  Previous
                </Button>
                <div className="vr" />
                <Button
                  className="p-2"
                  onClick={paginationClick}
                  variant="link"
                  disabled={listings.length === 10 ? false : true}
                >
                  Next
                </Button>
              </Stack>
            </Stack>
          </Col>

          <Col className="d-none d-md-block">
            <SearchMap
              handleMouseEnter={handleMouseEnter}
              handleMouseLeave={handleMouseLeave}
              listings={listings}
              activeItem={activeItem}
              mapCenter={mapCenter}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export async function searchPageLoader({ request }) {
  const url = new URL(request.url);

  const searchParams = url.searchParams;
  const servicename = url.searchParams.get("search");
  const innetwork = url.searchParams.get("innetwork");
  const zipcode = url.searchParams.get("zipcode");

  const queryString = url.search.split("&");

  let userId;
  let user;
  let allServices;
  let mapCenter = { lat: null, lng: null };

  try {
    allServices = await axios
      .get(`http://localhost:3000/services`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then((allServices) => allServices.data.serviceNames);

    user = await axios
      .get("http://localhost:3000/user", {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then((user) => user.data);

    userId = user.userid;
    if (zipcode) {
      const response = await axios
        .get(
          `http://nominatim.openstreetmap.org/search.php?q=${zipcode}&format=json`
        )
        .then((response) => response.data[0]);
      mapCenter = { lat: response.lat, lng: response.lon };
    } else {
      mapCenter = { lat: user.lat, lng: user.lng };
    }
  } catch {
    return redirect("/login");
  }

  try {
    let searchString = `http://localhost:3000/search/${servicename}/${userId}`;

    if (queryString.length > 1) {
      searchString += "?";
    }
    for (let i = 1; i < queryString.length; i++) {
      searchString += `${queryString[i]}&`;
    }

    if (searchString[searchString.length - 1] === "&") {
      searchString.slice(0, -1);
    }

    let listings = await axios
      .get(searchString)
      .then((listings) => listings.data.listings);

    if (innetwork === "true") {
      const innetworkListings = listings.filter(
        (listing) => listing.inNetwork === true
      );

      

      return {
        listings: innetworkListings,
        user: user,
        allServices: allServices,
        mapCenter: mapCenter,
      };
    } else
      return {
        listings: listings,
        user: user,
        allServices: allServices,
        mapCenter: mapCenter,
      };
  } catch (err) {
    console.log(err);
  }
}
