import React from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { withStyles } from "@material-ui/core/styles";

//import styling
import "../css/profile.css"

//import variables
import userTypes from '../variables/userTypes';


//import Material UI components
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import CheckIcon from '@mui/icons-material/Check';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import Divider from '@mui/material/Divider';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

//import custom components
import InputMap from './individual compenents/InputMap';
import Map from './individual compenents/Map';

const CssTextField = withStyles({
    root: {
      '& label.Mui-focused': {
            color: '#1e2749',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#1e2749',
        },
        '& .MuiOutlinedInput-root': {
        
            '&.Mui-focused fieldset': {
                borderColor: '#1e2749',
            } 

        }

    }
})(TextField);

function Profile(props) {

    const { state } = useLocation();

    const profiletypes = userTypes;

    const [edit, setEdit] = React.useState(false);
    
    const [location, setLocation] = React.useState([37.96867087793514, 23.76662747322076]);
    const [locationStr, setLocationStr] = React.useState([37.96867087793514, 23.76662747322076]);
    const [showEmptyLocationStr, setShowEmptyLocationStr] = React.useState(false);
    

	const [isLoading, setIsLoading] = React.useState(true);
    
    const [userInfo, setUserInfo] = React.useState({});

    const [firstName, setFirstName] = React.useState("");
    const [surName, setSurName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [tele, setTele] = React.useState("");
    const [profiletype, setProfiletype] = React.useState("Seller");
    const [afm, setAfm] = React.useState("");


    const handleChange = (event) => {
        setProfiletype(event.target.value);
    };


    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const parseLocation = () => {


        //errror checking

        //if there was no location given
        if(!locationStr){   
            setShowEmptyLocationStr(true);
            return true; 
        }

        //if the format is not correct
        //contains ","
        if(!locationStr.includes(",")){   
            setShowEmptyLocationStr(true);
            return true; 
        }

        let parsedlocation = locationStr.replace(/ /g,'').split(',');
        
        //if there are more than one "," or there is nothing before or after the ","
        if(parsedlocation.length!=2 || parsedlocation[0] === "" || parsedlocation[1] === ""){
            setShowEmptyLocationStr(true);
            return true; 
        }

        //if these are not numbers
        if( isNaN(parsedlocation[0]) || isNaN(parseFloat(parsedlocation[0])) || isNaN(parsedlocation[1]) || isNaN(parseFloat(parsedlocation[1])) ) {
            setShowEmptyLocationStr(true);
            return true;
        }

        setShowEmptyLocationStr(false);


        console.log(parsedlocation);

        setLocation([parsedlocation[0], parsedlocation[1]]);

    };


    React.useEffect(() => {
    
        let userId = localStorage.getItem('loggedUserId');

        console.log(userId);
        

        axios.get(`https://localhost:8443/api/users/id/${state.id}`,
            { headers: {  Access_token: 'Bearer ' + localStorage.getItem('jwt')} })
        .then(res => {
            setIsLoading(false);

            //save the initial data, because we might need to retrieve it if the user edits and then cancels (data backup)
            setUserInfo(res.data);
            
            //Store the data to the editable textfields
            setFirstName(res.data.realname);
            setSurName(res.data.surname);
            setEmail(res.data.email);
            setTele(res.data.tele);
            setProfiletype(capitalizeFirstLetter(res.data.roles[0].name.toLowerCase()));
            setAfm(res.data.afm);
            setLocationStr([res.data.longitude.toString(), res.data.latitude.toString()]);

            console.log(res.data);
        })
        .catch(err => console.log(err));


    }, [state])


    const handleCancel = () => {

        //restore the initial data using our backup userInfo
        setFirstName(userInfo.realname);
        setSurName(userInfo.surname);
        setEmail(userInfo.email);
        setTele(userInfo.tele);
        setProfiletype(capitalizeFirstLetter(userInfo.roles[0].name.toLowerCase()));
        setAfm(userInfo.afm);
        setLocationStr([userInfo.longitude.toString(), userInfo.latitude.toString()])
        setEdit(false);

    }

    const handleConfirm = async () => {

        
        //check location input
        if(parseLocation()) return;
        //restore the initial data using our backup userInfo
        try{
            console.log(location[0].toString());
            console.log(location[1].toString());
            

            const res = await axios.put('https://localhost:8443/api/users/update',
            {
                username: userInfo.username,
                email,
                realname: firstName,
                surname: surName,
                tele,
                latitude: '12',
                longitude: '15',
                afm,
            },
            { headers: {  Access_token: 'Bearer ' + localStorage.getItem('jwt')} });

            await axios.put('https://localhost:8443/api/role/update',
            {
                username: userInfo.username,
                rolename: profiletype.toUpperCase(),
            },
            { headers: {  Access_token: 'Bearer ' + localStorage.getItem('jwt')} });

        }catch(err){
            console.log(err);
        }



        setEdit(false);
        
    }

    return (
      
        <div className="main-container">
            <div className="column-left" />
            <div className="column-right"/>
            <div className="column-middle" style={{backgroundColor: "#fff"}}>
            
                {!isLoading && localStorage.getItem("guest") &&
                    <Alert severity="info" className='guest-alert'>
                        <AlertTitle><strong>Registration pending</strong></AlertTitle>
                        Your registration hasn't been accepted yet! You can still browse as a guest until then!
                    </Alert>
                }
                    
                {isLoading && 
                    <div className='profile-loading'>
                        <CircularProgress color="secondary" />
                    </div>
                }

                {!isLoading && 
                

                    <div className="profile-container">
                        <div className="profile-column-left" >
                            <img draggable="false" className="profile-picture" src="/faithplusone.jpg"></img>
                        </div>
                        <div className="profile-column-right">

                            <div className='name-title-container'>
                                <h2 className="name-title">{userInfo.realname + " " + userInfo.surname}</h2>
                            </div>

                            
                            
                                <div className="left-profile-info-column">

                                    {edit &&
                                        <CssTextField
                                            disabled={!edit}
                                            id="outlined-disabled"
                                            label="First name"
                                            value={firstName}
                                            className="profileinfo-tf"
                                            onChange={(e)=> setFirstName(e.target.value)}
                                            sx={{ mt: 5}} 
                                        />
                                    }
                                    <CssTextField
                                        disabled={!edit}
                                        id="outlined-disabled"
                                        label="Email"
                                        value={email}
                                        className="profileinfo-tf" 
                                        onChange={(e)=> setEmail(e.target.value)}
                                        sx={{ mt: 5}}
                                    />
                                    <CssTextField
                                        disabled={!edit}
                                        id="outlined-disabled"
                                        label="Phone number"
                                        value={tele}
                                        className="profileinfo-tf"
                                        onChange={(e)=> setTele(e.target.value)}
                                        sx={{ mt: 5}}
                                    />
                                    {edit &&
                                        <CssTextField
                                            disabled={!edit}
                                            id="outlined-disabled"
                                            label="Longitude, Latitude"
                                            // value={`${location[0]}, ${location[1]}`}
                                            value={locationStr}
                                            className="profileinfo-tf" 
                                            onChange={(e)=> setLocationStr(e.target.value)}
                                            error={showEmptyLocationStr}
                                            sx={{ mt: 5}}
                                        />
                                    }
                                </div>
                                <div className="right-profile-info-column">
                                    {edit &&

                                        <CssTextField
                                            disabled={!edit}
                                            id="outlined-disabled"
                                            label="Last name"
                                            value={surName}
                                            className="profileinfo-tf" 
                                            onChange={(e)=> setSurName(e.target.value)}
                                            sx={{ mt: 5}}  
                                        />
                                    
                                    }

                                    <CssTextField
                                        disabled={!edit}
                                        id="outlined-select-currency"
                                        select
                                        label="Type"
                                        value={profiletype}
                                        onChange={handleChange}
                                        sx={{ mt: 5}} 
                                        className="profileinfo-tf"
                                    >
                                        {profiletypes.map((option) => (
                                            <MenuItem key={option} value={option}>
                                            {option}
                                            </MenuItem>
                                        ))}
                                    </CssTextField> 
                                    <CssTextField
                                        disabled={!edit}
                                        id="outlined-disabled"
                                        label="ΑΦΜ"
                                        value={afm}
                                        className="profileinfo-tf"
                                        onChange={(e)=> setAfm(e.target.value)}
                                        sx={{ mt: 5}}
                                    />  
                                </div>
                                
                        </div>
                        
                        <div className='profile-map'>
                            <Divider/>
                            <p className='profile-map-text'>Location:</p>
                            <Map longitude={location[0]} latitude={location[1]}/>
                        </div>
                        <div className="profile-buttons">
                            { !edit && (localStorage.getItem("loggedUserId")===state.id) &&
                                <Tooltip title="Edit">
                                    <IconButton color="primary" sx={{ mt: 2}} aria-label="Edit profile info" className="edit-btn" onClick={() => setEdit(true)}>
                                        <EditIcon/>
                                    </IconButton>
                                </Tooltip>
                            }

                            { edit &&  
                                <Tooltip title="Cancel">    
                                    <IconButton color="primary" sx={{ mt: 2}} aria-label="Cancel changes" className="edit-btn cancel-btn" onClick={() => handleCancel()}>
                                        <CloseOutlinedIcon/>
                                    </IconButton>
                                </Tooltip> 

                                
                            }
                            { edit &&   
                                <Tooltip title="Confirm">
                                    <IconButton color="primary" sx={{ mt: 2}} aria-label="Confirm changes" className="edit-btn confirm-btn" onClick={() => handleConfirm()}>
                                        <CheckIcon/>
                                    </IconButton>
                                </Tooltip>

                                
                            }
                            
                        </div>
                    </div>
                }
            
                
                


            </div>
        </div>
            
            
          
  
  
  
        
      
    );
  }
  
  export default Profile;