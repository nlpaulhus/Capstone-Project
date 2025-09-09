import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const SearchMap = ({listings, lat, lng}) => {
  return (
    <MapContainer
      center={[lat, lng]}
      zoom={11}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {listings.map((listing, index) => (
        <Marker
          key={index}
          position={[listing.lat, listing.lng]}
          id={`marker${index}`}
        >
          <Popup>{listing.firstname}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default SearchMap;
