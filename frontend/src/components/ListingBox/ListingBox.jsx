import Card from "react-bootstrap/Card";
import Stack from "react-bootstrap/Stack";
import "./ListingBox.css";

export default function ListingBox({ listing, index }) {
  return (
    <Card>
      <Stack direction="horizontal" gap={3}>
        <div className="p-2" id="listing-profile-photo">
          <img className="circular-image" src={listing.profilephoto} />
        </div>
        <div className="p-2">
          <h3 className="nowrap-text">
            {index+1}. {listing.firstname} {listing.lastname[0]}.
          </h3>
        </div>
        <div className="p-2">
          <Card.Text>
            ${listing.price}
            <br></br>/{listing.paymenttype}
          </Card.Text>
        </div>
      </Stack>
      <Card.Body>
        <Card.Text>{listing.description}</Card.Text>
      </Card.Body>
    </Card>
  );
}
