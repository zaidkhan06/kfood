import React from 'react';
import scooter from '../assets/scooter.png';
import home from '../assets/home.png';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, Polyline, Popup, TileLayer } from 'react-leaflet';

const deliveryBoyIcon = new L.Icon({
  iconUrl: scooter,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const customerIcon = new L.Icon({
  iconUrl: home,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});



const DeileveryBoyTracking = ({ data }) => {
  console.log(data);

  const deliveryBoyLat = data?.deliveryBoyLocation?.lat;
  const deliveryBoyLon = data?.deliveryBoyLocation?.lon;

  const customerLat = data?.customerLocation?.lat;
  const customerLon = data?.customerLocation?.lon;

  if (
    !deliveryBoyLat ||
    !deliveryBoyLon ||
    !customerLat ||
    !customerLon
  ) {
    return (
      <p className="text-center mt-3 text-gray-600">
        Location data not available
      </p>
    );
  }

  const path = [
    [deliveryBoyLat, deliveryBoyLon],
    [customerLat, customerLon],
  ];

  const center = [
    (deliveryBoyLat + customerLat) / 2,
    (deliveryBoyLon + customerLon) / 2,
  ];

  return (
    <div className="w-full h-[400px] mt-3 rounded-xl overflow-hidden shadow-md">
      <MapContainer className="w-full h-full" center={center} zoom={17}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={[deliveryBoyLat, deliveryBoyLon]} icon={deliveryBoyIcon}>
          <Popup>Rider Location</Popup>
        </Marker>

        <Marker position={[customerLat, customerLon]} icon={customerIcon}>
          <Popup>Customer Location</Popup>
        </Marker>

        <Polyline positions={path} color="orange" />
      </MapContainer>
    </div>
  );
};

export default DeileveryBoyTracking;
