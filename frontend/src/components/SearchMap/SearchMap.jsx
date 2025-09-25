import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { LatLngBounds } from "leaflet";
import MarkerComponent from "../Marker/MarkerComponent";
import { useEffect } from "react";

const SearchMap = ({
  listings,
  handleMouseEnter,
  handleMouseLeave,
  activeItem,
}) => {
  const markerPositions = [];

  listings.forEach((listing) =>
    markerPositions.push([listing.lat, listing.lng])
  );

  const bounds = new LatLngBounds(markerPositions);

  function MapUpdater({ bounds }) {
    const map = useMap();

    useEffect(() => {
      if (map && bounds) {
        map.fitBounds(bounds, { padding: [50, 50] });
      }
    }, [map, bounds]);

    return null;
  }

  return (
    <MapContainer bounds={bounds} scrollWheelZoom={false}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <MapUpdater bounds={bounds} />

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
