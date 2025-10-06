import {
  useLoaderData,
  useParams,
  redirect,
  useNavigate,
} from "react-router-dom";
import { useState } from "react";
import axios from "axios";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Badge from "react-bootstrap/esm/Badge";
import NetworkCarousel from "../../components/NetworkCarousel/NetworkCarousel";
import "./ProfilePage.css";

export const ProfilePage = () => {
  const navigate = useNavigate();
  const { profile, listings, listerNetwork } = useLoaderData();
  const { listingId } = useParams();
  const startListing = listings.filter((listing) => listing.id === listingId);
  const startOtherListings = listings.filter(
    (listing) => listing.id !== listingId
  );
  const [currentListing, setCurrentListing] = useState(startListing[0]);
  const [otherListings, setOtherListings] = useState(startOtherListings);

  const inNetworkCredits = listerNetwork.filter(
    (credit) => credit.inNetwork === true
  );

  const nonNetworkCredits = listerNetwork.filter(
    (credit) => credit.inNetwork === false
  );

  const creditsOrdered = [...inNetworkCredits, ...nonNetworkCredits];

  const profilePhoto =
    profile.profilephoto !== "undefined"
      ? profile.profilephoto
      : "../../../public/assets/noprofilepicture.png";

  const otherServiceClick = (e) => {
    const newCurrentListing = otherListings.filter(
      (listing) => listing.id === e.target.id
    );
    const newOtherListings = otherListings.filter(
      (listing) => listing.id !== e.target.id
    );
    newOtherListings.push(currentListing);
    setCurrentListing(newCurrentListing[0]);
    setOtherListings(newOtherListings);
  };

  function pageBack() {
    navigate(-1);
  }

  return (
    <div id="profilePageContainer">
      <Button id="backButton" onClick={pageBack} variant="link">
        Back
      </Button>
      <div id="profileInfoandCarousel">
        <div id="profileInfoCard">
          <img
            className="circular-image"
            id="profilePhotoImage"
            src={profilePhoto}
          />

          <h1 className="nowrap-text">
            {profile.firstname} {profile.lastname[0]}.
          </h1>
          {inNetworkCredits.length > 0 ? (
            <Badge className="profileBadge" pill bg="secondary">
              In Your Network
            </Badge>
          ) : null}
          <div>
            <p className="nowrap-text">
              {profile.city}, {profile.state}
            </p>
            <a
              href={`http://imdb.com/name/${profile.imdbname}`}
              target="_blank"
            >
              IMDb Page
            </a>
          </div>
          <Button className="contactButton" href={`mailto:${profile.email}`}>
            Contact {profile.firstname}
          </Button>
        </div>

        <div id="networkCarouselCard">
          <NetworkCarousel items={creditsOrdered} />
        </div>
      </div>

      <div id="selectedServiceCard">
        <h1>{currentListing.servicename}</h1>
        <h3>
          ${currentListing.price}/{currentListing.paymenttype}
        </h3>
        <p>{currentListing.description}</p>
        <Button
          href={`mailto:${profile.email}?subject=${currentListing.servicename}%20Inquiry`}
        >
          Contact About {currentListing.servicename}
        </Button>
      </div>
      {otherListings.length > 0 ? (
        <Card id="otherServices">
          <Card.Title>{profile.firstname}'s Other Services</Card.Title>
          <ListGroup as="ul" id="otherServicesList">
            {otherListings.map((listing, index) => (
              <ListGroup.Item
                key={index}
                action
                onClick={otherServiceClick}
                id={listing.id}
                as="li"
                className="d-flex justify-content-between align-items-center"
              >
                <div id={listing.id} className="ms-2">
                  {listing.servicename}
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card>
      ) : null}
    </div>
  );
};

export async function profilePageLoader({ params }) {
  const listingId = params.listingId;

  try {
    const listingUser = await axios
      .get(`http://localhost:3000/profile/${listingId}`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then((listingUser) => listingUser.data);

    const profile = listingUser.profile;
    const listings = listingUser.listings;
    const listerNetwork = listingUser.listerNetwork;

    return { profile, listings, listerNetwork };
  } catch (err) {
    console.log(err);
  }
}
