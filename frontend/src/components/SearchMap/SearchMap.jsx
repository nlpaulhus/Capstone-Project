import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerComponent from "../Marker/MarkerComponent";

const SearchMap = ({
  listings,
  lat,
  lng,
  handleMouseEnter,
  handleMouseLeave,
  activeItem,
}) => {

    
  return (
    <MapContainer center={[lat, lng]} zoom={11} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {listings.map((listing) => (
        <MarkerComponent
          key={listing.id}
          location={listing}
          isActive={activeItem === listing.id}
          onMouseEnter={() => handleMouseEnter(listing.id)}
          onMouseLeave={handleMouseLeave}
        />
      ))}
    </MapContainer>
  );
};

export default SearchMap;
