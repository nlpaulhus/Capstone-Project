import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { LatLngBounds } from "leaflet";
import MarkerComponent from "../Marker/MarkerComponent";
import { useEffect } from "react";

const SearchMap = ({
  listings,
  handleMouseEnter,
  handleMouseLeave,
  activeItem,
  mapCenter,
}) => {
  const markerPositions = [];
  console.log(mapCenter);
  let newCenter = [Number(mapCenter.lat), Number(mapCenter.lng)];

  listings.forEach((listing) =>
    markerPositions.push([listing.lat, listing.lng])
  );

  const bounds = new LatLngBounds(markerPositions);
  const boundsValid = bounds.isValid();

  function MapUpdater({ bounds }) {
    const mapOne = useMap();

    useEffect(() => {
      if (mapOne && bounds) {
        mapOne.fitBounds(bounds, { padding: [50, 50] });
      }
    }, [mapOne, bounds]);

    return null;
  }

  function EmptyMapUpdater({ newCenter }) {
    const mapTwo = useMap();

    useEffect(() => {
      if (newCenter) {
        mapTwo.setView(newCenter, mapTwo.getZoom());
      }
    }, [newCenter, mapTwo]);
  }

  return (
    <div>
      {boundsValid ? (
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
      ) : (
        <MapContainer center={newCenter} zoom={11}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <EmptyMapUpdater newCenter={newCenter} />
        </MapContainer>
      )}
    </div>
  );
};

export default SearchMap;
