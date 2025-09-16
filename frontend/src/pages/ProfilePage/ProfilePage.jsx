import { useLoaderData } from "react-router-dom";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";

export const ProfilePage = () => {
  const currentUser = useLoaderData();
  console.log(currentUser);

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

    return { currentUser };
  } catch (err) {
    console.log(err);
  }
}
