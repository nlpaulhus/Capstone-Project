import { MapContainer, TileLayer } from "react-leaflet";
import MarkerComponent from "../Marker/MarkerComponent";

const SearchMap = ({
  listings,
  user,
  handleMouseEnter,
  handleMouseLeave,
  activeItem,
}) => {
  const mapLat = user.lat.toString();
  const mapLng = user.lng.toString();

  return (
    <MapContainer center={[mapLat, mapLng]} zoom={11} scrollWheelZoom={false}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {listings.length > 0
        ? listings.map((listing) => (
            <MarkerComponent
              key={listing.id}
              location={listing}
              isActive={activeItem === listing.id}
              onMouseEnter={() => handleMouseEnter(listing.id)}
              onMouseLeave={handleMouseLeave}
            />
          ))
        : null}
    </MapContainer>
  );
};

export default SearchMap;
