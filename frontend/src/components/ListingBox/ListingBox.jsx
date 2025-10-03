import Card from "react-bootstrap/Card";
import Stack from "react-bootstrap/Stack";
import Badge from "react-bootstrap/Badge";
import Container from "react-bootstrap/Container";
import "./ListingBox.css";
import { useNavigate } from "react-router-dom";

const ListingBox = ({ listing, activeItem, onMouseEnter, onMouseLeave }) => {
  const navigate = useNavigate();

  const profilePhoto =
    listing.profilephoto !== "undefined"
      ? listing.profilephoto
      : "../../../public/assets/noprofilepicture.png";

  if (listing.description.length > 200) {
    const newlistingdescription = listing.description.slice(0, 200) + "...";
    listing.description = newlistingdescription;
  }

  return (
    <div className="position-relative">
      <Card
        className="listingBoxes"
        onMouseEnter={() => onMouseEnter(listing.id)}
        onMouseLeave={onMouseLeave}
        onClick={() => navigate(`/profile/${listing.id}`)}
        style={{
          margin: "10px",
          padding: "10px",
          border:
            activeItem === listing.id ? "1px solid blue" : "1px solid grey",
          "box-shadow":
            activeItem === listing.id ? "#1b548d 0px 5px 15px" : "none",
        }}
      >
        <Card.Body>
          <Container fluid id="listingContent">
            <Stack direction="horizontal" gap={3} id="topRow">
              <div id="listing-profile-photo">
                <img className="circular-image" src={profilePhoto} />
              </div>

              <div className="p-2">
                <h3 className="nowrap-text">
                  {listing.firstname} {listing.lastname[0]}.
                </h3>
                <p className="nowrap-text">
                  {listing.city}, {listing.state}
                </p>
              </div>

              <div className="p-2">
                <p className="nowrap-text">
                  ${listing.price}
                  <br></br>/{listing.paymenttype}
                </p>
              </div>
            </Stack>
            <Stack>
              <div>
                {listing.inNetwork === true ? (
                  <Badge className="inNetworkBadge">In Your Network</Badge>
                ) : null}
              </div>
              <div>
                <p className="description">{listing.description}</p>
              </div>
            </Stack>
          </Container>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ListingBox;
