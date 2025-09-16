import axios from "axios";
import { useState } from "react";
import {
  useLoaderData,
  useSearchParams,
  useRevalidator,
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

  // Set or update a parameter – triggers navigation
  function updateParam(e) {
    // clone current params (important to preserve existing values)
    const next = new URLSearchParams(searchParams);
    next.set(e.target.id, e.target.value);
    setSearchParams(next, { replace: true });
    revalidator.revalidate();
  }

  // Remove a parameter
  function removeParam(e) {
    const next = new URLSearchParams(searchParams);
    next.delete(e.target.id);
    setSearchParams(next, { replace: true });
    revalidator.revalidate();
  }

  //add or remove filter
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

  return (
    <div>
      <Container>
        <Row>
          <Col>
            <SearchForm
              allServices={allServices}
              formData={formData}
              updateSearch={updateSearch}
              updateParam={updateParam}
              filterClick={filterClick}
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
              lat={user.lat}
              lng={user.lng}
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

  const queryString = url.search.split("&");

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

    let searchString = `http://localhost:3000/search/${servicename}/${userId}`;

    if (queryString.length > 1) {
      searchString += "?";
    }
    for (let i = 1; i < queryString.length; i++) {
      searchString += `${queryString[i]}&`;
    }

    if (searchString[searchString.length - 1] === "&s") {
      searchString.slice(0, -1);
    }

    console.log(searchString);

    const listings = await axios.get(searchString);

    return {
      listings: listings.data.listings,
      user: user,
      allServices: allServices,
    };
  } catch (err) {
    console.log(err);
  }
}
