import { Marker } from "react-leaflet";
import L from "leaflet";
import { useMemo } from "react";

// Define two custom icons: a default one and a highlighted one
const defaultIcon = new L.Icon({
  iconUrl:
    "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const highlightedIcon = new L.Icon({
  iconUrl:
    "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

export default function MarkerComponent({
  location,
  isActive,
  onMouseEnter,
  onMouseLeave,
}) {
  const markerLat = location.lat.toString();
  const markerLng = location.lng.toString();

  const icon = useMemo(
    () => (isActive ? highlightedIcon : defaultIcon),
    [isActive]
  );

  const eventHandlers = useMemo(
    () => ({
      mouseover: () => onMouseEnter(location.id),
      mouseout: () => onMouseLeave(),
    }),
    [location.id, onMouseEnter, onMouseLeave]
  );

  return (
    <Marker
      position={[markerLat, markerLng]}
      icon={icon}
      eventHandlers={eventHandlers}
    />
  );
}
