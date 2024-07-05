import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

import "leaflet/dist/leaflet.css"
import { useMap } from 'react-leaflet/hooks'
import './App.css';
import data from './Sample.json';
import { useState } from 'react';

function App() {
  console.log("data", data)
  const [country, setCountry] = useState('')
  const [latitude, setLatitude] = useState('')

  const [ finalData, setFinalData] = useState([])
  //console.log("Position", position)
  const filteredItem = () => 
    setFinalData(data.filter(item => item.country.includes(country)))

  const filteredItemLat = () => 
    setFinalData(data.filter(item => latitude == item.latitude))

  console.log("Filtered Item", finalData)

 

  return (
    <div className="MapContainer">
    <input type="text" value={country} onChange={(e) => setCountry(e.target.value)}/>
    <button onClick={filteredItem}>SEARCH COUNTRY</button>

    <input type="text" value={latitude} onChange={(e) => setLatitude(e.target.value)}/>
    <button onClick={filteredItemLat}>SEARCH LATITUDE</button>

    <MapContainer style={{height: 580+"px", width:680+"px"}} center={[data[0].latitude, data[0].longitude]} zoom={13} scrollWheelZoom={false}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    {finalData.map((item, index) => 
      <Marker key={index} position={[item.latitude, item.longitude]}>
        <Popup>
          <ul>
            <li>{item.name}</li>
            <li>{item.branch}</li>
            <li>{item.latitude}</li>
            <li>{item.longitude}</li>
            <li>{item.country}</li>
            <li>{item.operatorCountry}</li>
          </ul>
        </Popup>
      </Marker>
    )}
  </MapContainer>
  </div>
  );
}

export default App;
