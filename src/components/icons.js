import Leaflet from 'leaflet';

const getMarkerHtmlStyles = color => `
  background-color: ${color};
  width: 3rem;
  height: 3rem;
  display: block;
  left: -1.5rem;
  top: -1.5rem;
  position: relative;
  border-radius: 3rem 3rem 0;
  transform: rotate(45deg);
  border: 1px solid #FFFFFF`;

export const greenIcon = Leaflet.divIcon({
  className: 'leaflet-pin',
  iconAnchor: [0, 24],
  labelAnchor: [-6, 0],
  popupAnchor: [0, -36],
  html: `<span style="${getMarkerHtmlStyles('green')}" />`
});

export const redIcon = Leaflet.divIcon({
  className: 'leaflet-pin',
  iconAnchor: [0, 24],
  labelAnchor: [-6, 0],
  popupAnchor: [0, -36],
  html: `<span style="${getMarkerHtmlStyles('red')}" />`
});

export const orangeIcon = Leaflet.divIcon({
  className: 'leaflet-pin',
  iconAnchor: [0, 24],
  labelAnchor: [-6, 0],
  popupAnchor: [0, -36],
  html: `<span style="${getMarkerHtmlStyles('orange')}" />`
});
