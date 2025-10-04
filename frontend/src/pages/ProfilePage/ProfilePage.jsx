import { useLoaderData, useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";

import Stack from "react-bootstrap/esm/Stack";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import NetworkCarousel from "../../components/NetworkCarousel/NetworkCarousel";
import "./ProfilePage.css";

export const ProfilePage = () => {
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

  return (
    <Container id="profilePageContainer">
      <div id="profileInfoandCarousel">
        <Card id="profileInfoCard">
          <img
            className="circular-image"
            id="profilePhotoImage"
            src={profilePhoto}
          />

          <h1 className="nowrap-text">
            {profile.firstname} {profile.lastname[0]}.
          </h1>
          <p className="nowrap-text">
            {profile.city}, {profile.state}
          </p>

          <Button href={`mailto:${profile.email}`}>
            Contact {profile.firstname}
          </Button>
        </Card>

        <div id="networkCarouselCard">
          <NetworkCarousel items={creditsOrdered} />
        </div>
      </div>

      {/* <Stack>
        <Card>
          <h1>{currentListing.servicename}</h1>
          <h3>
            ${currentListing.price}/{currentListing.paymenttype}
          </h3>
          <Card.Text>{currentListing.description}</Card.Text>
        </Card>
      </Stack> */}
    </Container>
  );
};

export async function profilePageLoader({ params }) {
  const listingId = params.listingId;

  try {
    const currentUser = await axios
      .get("http://localhost:3000/user", {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then((currentUser) => currentUser.data);

    const listingUser = await axios
      .get(`http://localhost:3000/profile/${listingId}/${currentUser.userid}`)
      .then((listingUser) => listingUser.data);

    const profile = listingUser.profile;
    const listings = listingUser.listings;
    const listerNetwork = listingUser.listerNetwork;

    return { profile, listings, listerNetwork };
  } catch (err) {
    console.log(err);
  }
}
