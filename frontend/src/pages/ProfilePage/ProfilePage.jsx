import { useLoaderData } from "react-router-dom";
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

  console.log(profile);
  console.log(listings);
  console.log(listerNetwork);

  const inNetworkCredits = listerNetwork.filter(
    (credit) => credit.inNetwork === true
  );

  const nonNetworkCredits = listerNetwork.filter(
    (credit) => credit.inNetwork === false
  );

  const profilePhoto =
    profile.profilephoto !== "undefined"
      ? profile.profilephoto
      : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

  return (
    <Container>
      <Row>
        <Col>
          <Card>
            <img className="circular-image" src={profilePhoto} />

            <h1 className="nowrap-text">
              {profile.firstname} {profile.lastname[0]}.
            </h1>
            <p className="nowrap-text">
              {profile.city}, {profile.state}
            </p>

            <Button>Contact {profile.firstname}</Button>
          </Card>

          {inNetworkCredits ? (
            <Card>
              <Card.Title>You Both Worked On:</Card.Title>
              {inNetworkCredits.map((credit) => (
                <ProfileCreditBox credit={credit} />
              ))}
            </Card>
          ) : null}

           {nonNetworkCredits ? (
            <Card>
              <Card.Title>{profile.firstname}'s Other Work:</Card.Title>
              {nonNetworkCredits.map((credit) => (
                <ProfileCreditBox credit={credit} />
              ))}
            </Card>
          ) : null}
        </Col>

        <Col>
          <div></div>
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
