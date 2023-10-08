import { useEffect, useState, useRef } from "react";
import { ref, onValue } from "firebase/database";
import {db} from './main.jsx';

import L from "leaflet";

import "leaflet/dist/leaflet.css";

export default function LocationData() {
  const [data, setData] = useState(null);

  const [mapInitialized, setMapInitialized] = useState(false);
  const [map, setMap] = useState(null);

  const mapRef = useRef(null)

  // const [latitude, setLatitude] = useState(null);
  // const [longitude, setLongitude] = useState(null);


  // let lat, lng, recvdata
  useEffect(() => {
    const gpsLocation = ref(db, '/gpsLocation');
    onValue(gpsLocation, (snapshot) => {
      setData(snapshot.val());
      // [lat, lng] = recvdata.split(',');
      // setLatitude(lat);
      // setLongitude(lng);


    });
  }, []);


  useEffect(() => {
    // Create map and marker when data is available
    if (!mapInitialized && !map && data) {
      const mapInstance = L.map(mapRef.current).setView([data.location.split(",")[0], data.location.split(",")[1]], 17);

      L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
        attribution: "Map data &copy; Esri",
        maxZoom: 18,
      }).addTo(mapInstance);

      L.marker([data.location.split(",")[0], data.location.split(",")[1]]).addTo(mapInstance);
      
      setMap(mapInstance);
      setMapInitialized(true);

    }
    
    
  }, [mapInitialized, map, data]);



  useEffect(() => {
    if (map && data) {
      // Remove any existing markers
      map.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          map.removeLayer(layer);
        }
      });
  
      // Add a new marker
      const newMarker = L.marker([data.location.split(",")[0], data.location.split(",")[1]]);
      newMarker.addTo(map);
      map.setView([data.location.split(",")[0], data.location.split(",")[1]], 17);
    }
  }, [data, map]);


  return (
    <div>
      {JSON.stringify(data)}
      {/* {data.location.} */}
      <h1>Location Data</h1>

      <div ref={mapRef} className="h-[100vh]" />

      {/* <div id="map" style={{ height: "400px" }}></div> */}

      {/* {data && (
        <MapContainer center={[data.location.split(",")[0], data.location.split(",")[1]]} zoom={17} style={{ height: "400px", width: "400px" }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={[data.location.split(",")[0], data.location.split(",")[1]]}>
            <Popup>
              <div>
                <h2>HERE</h2>
                 <h2>{data.name}</h2>
                <p>Latitude: {data.latitude}</p>
                <p>Longitude: {data.longitude}</p>
              </div>
            </Popup>
          </Marker>
        </MapContainer>
      )} */}
    </div>
  );
}