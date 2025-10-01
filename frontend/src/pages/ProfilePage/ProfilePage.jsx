import { useLoaderData, useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import Stack from "react-bootstrap/esm/Stack";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ProfileCreditBox from "../../components/CreditBox/ProfileCreditBox";

export const ProfilePage = () => {
  const { profile, listings, listerNetwork } = useLoaderData();
  const { listingId } = useParams();
  const startListing = listings.filter((listing) => listing.id === listingId);
  const startOtherListings = listings.filter(
    (listing) => listing.id !== listingId
  );
  const [currentListing, setCurrentListing] = useState(startListing[0]);
  const [otherListings, setOtherListings] = useState(startOtherListings);
  console.log(currentListing);

  const inNetworkCredits = listerNetwork.filter(
    (credit) => credit.inNetwork === true
  );

  let networkTitle =
    inNetworkCredits.length > 0
      ? `${profile.firstname}'s Other Work:`
      : `${profile.firstname}'s Credits:`;

  const nonNetworkCredits = listerNetwork.filter(
    (credit) => credit.inNetwork === false
  );

  const profilePhoto =
    profile.profilephoto !== "undefined"
      ? profile.profilephoto
      : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

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
    <Container>
      <Row>
        <Col sm={4}>
          <Stack gap={3}>
            <Card>
              <img className="circular-image" src={profilePhoto} />

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

            {inNetworkCredits.length > 0 ? (
              <Card>
                <Card.Title>You Both Worked On:</Card.Title>
                {inNetworkCredits.map((credit) => (
                  <ProfileCreditBox credit={credit} />
                ))}
              </Card>
            ) : null}

            {nonNetworkCredits.length > 0 ? (
              <Card>
                <Card.Title>{networkTitle}</Card.Title>
                {nonNetworkCredits.map((credit) => (
                  <ProfileCreditBox credit={credit} />
                ))}
              </Card>
            ) : null}
          </Stack>
        </Col>

        <Col sm={8}>
          <Stack gap={3}>
            <Card>
              <h1>{currentListing.servicename}</h1>
              <h3>
                ${currentListing.price}/{currentListing.paymenttype}
              </h3>
              <Card.Text>{currentListing.description}</Card.Text>
            </Card>

            {otherListings.length > 0 ? (
              <Card>
                <h1>Other Services:</h1>
                <Row>
                  {otherListings.map((listing) => (
                    <Col>
                      <Card>
                        <Card.Title>{listing.servicename}</Card.Title>
                        <Card.Text>
                          ${listing.price}/{listing.paymenttype}
                        </Card.Text>
                        <Button id={listing.id} onClick={otherServiceClick}>
                          Details
                        </Button>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Card>
            ) : null}
          </Stack>
        </Col>
      </Row>
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
