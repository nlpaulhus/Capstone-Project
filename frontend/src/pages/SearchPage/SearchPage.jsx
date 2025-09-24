import axios from "axios";
import { useState } from "react";
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

export const SearchPage = () => {
  const { listings, user, allServices } = useLoaderData();
  const [activeItem, setActiveItem] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const revalidator = useRevalidator();
  const [paymentType, setPaymentType] = useState("all");
  const [searchRadius, setSearchRadius] = useState("suggested");

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

  return (
    <div>
      <Container>
        <Row>
          <Col>
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
            />
          </Col>
          <Col>
            <Container>
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
          </Col>

          <Col>
            <SearchMap
              handleMouseEnter={handleMouseEnter}
              handleMouseLeave={handleMouseLeave}
              listings={listings}
              user={user}
              activeItem={activeItem}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export async function searchPageLoader({ request }) {
  const url = new URL(request.url);
  // const sort = url.searchParams.get("sort") || "rating";
  const searchParams = url.searchParams;
  const servicename = url.searchParams.get("search");
  const innetwork = url.searchParams.get("innetwork");
  const hourly = url.searchParams.get("hourly");
  const flatrate = url.searchParams.get("flatrate");
  const searchRadius = url.searchParams.get("searchRadius");

  const queryString = url.search.split("&");

  let userId;
  let user;
  let allServices;

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

    console.log(searchString);

    let listings = await axios
      .get(searchString)
      .then((listings) => listings.data.listings);

    if (innetwork === "true") {
      const innetworkListings = listings.filter(
        (listing) => listing.inNetwork === true
      );

      console.log(listings);
      return {
        listings: innetworkListings,
        user: user,
        allServices: allServices,
      };
    } else
      return {
        listings: listings,
        user: user,
        allServices: allServices,
      };
  } catch (err) {
    console.log(err);
  }
}
