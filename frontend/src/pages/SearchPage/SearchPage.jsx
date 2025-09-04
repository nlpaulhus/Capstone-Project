import axios from "axios";
import { useLoaderData } from "react-router-dom";
import ListingBox from "../../components/ListingBox/ListingBox";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";

export const SearchPage = () => {
  const { servicename, listings } = useLoaderData();
  console.log(listings);

  return (
    <Container>
      <Row>
        <Col></Col>
        <Col>
          <Container>
            {listings.map((listing) => (
              <ListingBox key={listing.id} listing={listing} />
            ))}
          </Container>
        </Col>

        <Col></Col>
      </Row>
    </Container>
  );
};

export async function searchPageLoader({ params }) {
  const servicename = params.servicename;
  const user = await axios.get("http://localhost:3000/user", {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });
  const userId = user.data.userid;
  const listings = await axios.get(
    `http://localhost:3000/search/${servicename}/${userId}`
  );
  return { servicename: servicename, listings: listings.data.listings };
}
