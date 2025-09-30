import { useLoaderData } from "react-router-dom";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";

export const ProfilePage = () => {
  const { profile, listings, listerNetwork } = useLoaderData();

  console.log(profile);
  console.log(listings);
  console.log(listerNetwork);

  return (
    <Container>
      <Col></Col>
      <Col></Col>
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
