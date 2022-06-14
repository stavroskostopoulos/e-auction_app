import React from 'react'
import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { withStyles } from "@material-ui/core/styles";
import MyLocationIcon from '@mui/icons-material/MyLocation';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';

const icon = L.icon({
    iconUrl: "./mymarker.png",
    iconSize: [38,38]
});

const CssTextField = withStyles({
    root: {
        '& label.Mui-focused': {
            color: '#1e2749',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#1e2749',
        },
        '& .MuiOutlinedInput-root': {
            textAlign: 'left',
            

            '&.Mui-focused fieldset': {
            borderColor: '#1e2749',
            } 

        }

    }
})(TextField);



function InputMap(props) {
    // const position = [37.96867087793514, 23.76662747322076];

    const [position, setPosition] = React.useState([props.longitude, props.latitude]);
    
    const [location, setLocation] = React.useState([37.96867087793514, 23.76662747322076]);

    const [locationStr, setLocationStr] = React.useState('');
    const [showEmptyLocationStr, setShowEmptyLocationStr] = React.useState(false);

    const parseLocation = (e) => {

        e.preventDefault();

        //errror checking

        //if there was no location given
        if(!locationStr){   
            setShowEmptyLocationStr(true);
            return; 
        }

        //if the format is not correct
        //contains ","
        if(!locationStr.includes(",")){   
            setShowEmptyLocationStr(true);
            return; 
        }

        let parsedlocation = locationStr.replace(/ /g,'').split(',');
        
        //if there are more than one "," or there is nothing before or after the ","
        if(parsedlocation.length!=2 || parsedlocation[0] === "" || parsedlocation[1] === ""){
            setShowEmptyLocationStr(true);
            return; 
        }

        //if these are not numbers
        if( isNaN(parsedlocation[0]) || isNaN(parseFloat(parsedlocation[0])) || isNaN(parsedlocation[1]) || isNaN(parseFloat(parsedlocation[1])) ) {
            setShowEmptyLocationStr(true);
            return;
        }

        setShowEmptyLocationStr(false);


        console.log(parsedlocation);

        setLocation([parsedlocation[0], parsedlocation[1]]);
        props.inputMapSetLocation([parsedlocation[0], parsedlocation[1]]);
        // console.log(location);
    };
    
    return (

        <Stack spacing={1.5} className={props.containsStackClass}>


            <div className='location-fields-container'>


                <div className='location-textfield-container'>
                    <CssTextField id="outlined-basic" 
                        className={props.textFieldClass}
                        label="Longitude, Latitude" 
                        type="text" 
                        variant="outlined" 
                        value={locationStr}
                        size={props.fieldSize}
                        onChange={(e)=>setLocationStr(e.target.value)} 
                        error={props.textfieldError || showEmptyLocationStr}
                    />
                </div>

                <div className={props.buttonContainerClass}>
                    <Tooltip title={<p className='tooltip-text'>Submit Location</p>} placement="right" arrow>
                        <Button className={props.buttonClass} onClick={parseLocation} size={props.fieldSize}><MyLocationIcon style={{color: '#fff'}} /></Button>
                        
                    </Tooltip>


                </div>

            </div>


            <div style={{width: props.mapWidth, height: props.mapHeight, paddingTop: "10px"}} >
 

                {/* <RegisterMap longitude={location[0]} latitude={location[1]}/> */}
                <MapContainer center={location} key={`${location[0]}-${location[1]}`} zoom={13} scrollWheelZoom={true} style={{width: "100%", height: "100%"}}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://api.maptiler.com/maps/basic/256/{z}/{x}/{y}.png?key=jQFpRfB2sw8PKgehbIRl"
                    />
                    <Marker position={location} icon={icon}>
                        <Popup>
                            This is your location
                        </Popup>
                    </Marker>
                </MapContainer>
            </div>


        </Stack>
           
    );
}

export default InputMap