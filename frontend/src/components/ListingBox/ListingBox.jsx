import Card from "react-bootstrap/Card";

export default function ListingBox({ listing }) {
  console.log(listing);
  return (
    <Card>
      <Card.Title>
        {listing.firstname} {listing.lastname}
      </Card.Title>
      <Card.Body>
        <Card.Text>{listing.description}</Card.Text>
        <Card.Text>
          ${listing.price}/{listing.paymenttype}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
