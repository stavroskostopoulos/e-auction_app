import React from 'react'
import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const icon = L.icon({
    iconUrl: "./mymarker.png",
    iconSize: [38,38]
});

function Map(props) {
    // const position = [37.96867087793514, 23.76662747322076];

    const [position, setPosition] = React.useState([props.longitude, props.latitude]);


    return (
        <>
            
            <p>{props.longitude} , {props.latitude}</p>
            <MapContainer center={position} key={`${position[0]}-${position[1]}`} zoom={13} scrollWheelZoom={true} style={{width: "100%", height: "100%"}}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://api.maptiler.com/maps/basic/256/{z}/{x}/{y}.png?key=jQFpRfB2sw8PKgehbIRl"
                />
                <Marker position={position} icon={icon}>
                    <Popup>
                        This is your location
                    </Popup>
                </Marker>
            </MapContainer>
        </>
    );
}

export default Map