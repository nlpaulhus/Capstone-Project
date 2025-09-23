import Card from "react-bootstrap/Card";
import Stack from "react-bootstrap/Stack";
import "./ListingBox.css";
import { useNavigate } from "react-router-dom";

const ListingBox = ({ listing, activeItem, onMouseEnter, onMouseLeave }) => {
  const navigate = useNavigate();

  const profilePhoto =
    listing.profilephoto ||
    "https://github.com/nlpaulhus/Capstone-Project/blob/master/frontend/src/assets/blank-profile-picture.webp"
  return (
    <Card
      className="listingBoxes"
      onMouseEnter={() => onMouseEnter(listing.id)}
      onMouseLeave={onMouseLeave}
      onClick={() => navigate(`/profile/${listing.id}`)}
      style={{
        margin: "5px",
        padding: "10px",
        border: activeItem === listing.id ? "1px solid blue" : "1px solid grey",
      }}
    >
      <Stack direction="horizontal" gap={3}>
        <div className="p-2" id="listing-profile-photo">
          <img className="circular-image" src={profilePhoto} />
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
      <Stack>
        <div>
          {listing.inNetwork === true ? <p>🎬 In Your Network</p> : null}
        </div>
        <div>
          <p className="description">{listing.description}</p>
        </div>
      </Stack>
    </Card>
  );
};

export default ListingBox;
