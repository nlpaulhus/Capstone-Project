import Card from "react-bootstrap/Card";
import Stack from "react-bootstrap/Stack";
import "./ListingBox.css";
import { useNavigate } from "react-router-dom";

const ListingBox = ({ listing, activeItem, onMouseEnter, onMouseLeave }) => {
  const navigate = useNavigate();

  return (
    <Card
      className="listingBoxes"
      onMouseEnter={() => onMouseEnter(listing.id)}
      onMouseLeave={onMouseLeave}
      onClick={() => navigate(`/profile/${listing.id}`)}
      style={{
        margin: "5px",
        border: activeItem === listing.id ? "1px solid blue" : "1px solid grey",
      }}
    >
      <Stack direction="horizontal" gap={3}>
        <div className="p-2" id="listing-profile-photo">
          <img className="circular-image" src={listing.profilephoto} />
        </div>
        <div className="p-2">
          <Stack>
            <h3 className="nowrap-text">
              {listing.firstname} {listing.lastname[0]}.
            </h3>
            <p className="nowrap-text">
              {listing.city}, {listing.state}
            </p>
          </Stack>
        </div>
        <div className="p-2">
          <p>
            ${listing.price}
            <br></br>/{listing.paymenttype}
          </p>
        </div>
      </Stack>
      <Card.Body>
        <p className="description">{listing.description}</p>
      </Card.Body>
    </Card>
  );
};

export default ListingBox;
