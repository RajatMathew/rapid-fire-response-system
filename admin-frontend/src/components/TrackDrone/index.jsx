import { useEffect, useState, useRef } from "react";
import { ref, onValue } from "firebase/database";
import {db} from '../../main.jsx';

import L from "leaflet";

import "leaflet/dist/leaflet.css";

export default function TrackDrone() {
  const [data, setData] = useState(null);



  const [mapInitialized, setMapInitialized] = useState(false);
  const [map, setMap] = useState(null);

  const mapRef = useRef(null)

  // const bounds = [
  //   [0, 0],
  //   [718, 1234],
  // ];

  useEffect(() => {
    if (!mapInitialized && !map) {
      const mapInstance = L.map(mapRef.current, {
        crs: L.CRS.Simple,
        minZoom: -3,
      });



      setMap(mapInstance);
      setMapInitialized(true);
    }
    // console.log(mapRef.current.style.height)
  }, [mapInitialized, map]);

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


  // useEffect(() => {
  //   // Create map and marker when data is available
  //   if (data) {
  //     const map = L.map("map").setView([data.location.split(",")[0], data.location.split(",")[1]], 13);

  //     L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  //       attribution: "Map data &copy; OpenStreetMap contributors",
  //       maxZoom: 18,
  //     }).addTo(map);

  //     L.marker([data.location.split(",")[0], data.location.split(",")[1]]).addTo(map);
  //   }
  // }, [data]);

  return (
    <div>
      {/* {data.location.} */}
      <h1 className="text-2xl font-bold">Location Data</h1>

      {data && "Current location: " + [data.location.split(",")[0], ", ", data.location.split(",")[1]]}

      {/* <div id="map" style={{ height: "100vh" }}></div> */}

      <div ref={mapRef} className="h-full">
      {map && (
          <>
              {/* <Marker position={[500, 500]} location_id="1" map={map} tooltipContent="VYTT-12-STRT" /> */}
          </>
      )}
      </div>



      {/* {data && (
        <MapContainer center={[data.location.split(",")[0], data.location.split(",")[1]]} zoom={13} style={{ height: "400px", width: "400px" }}>
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

// function Marker(props) {
//   const { position, tooltipContent, map, location_id, popupContent } = props;

//   useEffect(() => {

//     const NewIcon = L.divIcon({
//       className: 'custom-div-icon',
//       html: `<div class='divicon-inner'>${location_id}</div>`,
//       iconSize: [40, 40],
//       iconAnchor: [0,0]
//     });

//     const marker = new L.marker(position, { icon: NewIcon });

//     if (tooltipContent) {
//       marker.bindTooltip(tooltipContent, {
//         permanent: true,
//         direction: "right",
//         className: "my-labels",
//         offset: [40,20],
        
//       });
//     }

//     if (popupContent) {
//       marker.bindPopup(popupContent);
//     }

//     marker.addTo(map);

//     return () => {
//       map.removeLayer(marker);
//     };
//   }, [position, tooltipContent, map]);

//   return null;
// }
