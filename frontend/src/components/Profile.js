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
    const [profiletype, setProfiletype] = React.useState('Seller');

    const [location, setLocation] = React.useState([37.96867087793514, 23.76662747322076]);

	const [isLoading, setIsLoading] = React.useState(true);

    const [userInfo, setUserInfo] = React.useState({});

    //silly flag
    const [flag, setFlag] = React.useState(true);

    const handleChange = (event) => {
        setProfiletype(event.target.value);
    };



    React.useEffect(() => {
    
        let userId = localStorage.getItem('loggedUserId');

        console.log(userId);
        

        axios.get(`https://localhost:8443/api/users/id/${state.id}`,
            { headers: {  Access_token: 'Bearer ' + localStorage.getItem('jwt')} })
        .then(res => {
            setIsLoading(false);
            setUserInfo(res.data);
            setLocation([12, 12])
            console.log(res.data);
        })
        .catch(err => console.log(err));


    }, [])

    return (
      
        <div className="main-container">
            <div className="column-left" />
            <div className="column-right"/>
            <div className="column-middle" style={{backgroundColor: "#fff"}}>
            
                {!isLoading && flag &&
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
                                            defaultValue={userInfo.realname}
                                            className="profileinfo-tf"
                                            sx={{ mt: 5}} 
                                        />
                                    }
                                    <CssTextField
                                        disabled={!edit}
                                        id="outlined-disabled"
                                        label="Email"
                                        defaultValue={userInfo.email}
                                        className="profileinfo-tf" 
                                        sx={{ mt: 5}}
                                    />
                                    <CssTextField
                                        disabled={!edit}
                                        id="outlined-disabled"
                                        label="Phone number"
                                        defaultValue={userInfo.tele}
                                        className="profileinfo-tf" 
                                        sx={{ mt: 5}}
                                    />
                                    {edit &&
                                        <CssTextField
                                            disabled={!edit}
                                            id="outlined-disabled"
                                            label="Longitude, Latitude"
                                            defaultValue={`${location[0]}, ${location[1]}`}
                                            className="profileinfo-tf" 
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
                                            defaultValue={userInfo.surname}
                                            className="profileinfo-tf" 
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
                                        defaultValue={userInfo.afm}
                                        className="profileinfo-tf" 
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
                            { !edit &&
                                <Tooltip title="Edit">
                                    <IconButton color="primary" sx={{ mt: 2}} aria-label="Edit profile info" className="edit-btn" onClick={() => setEdit(true)}>
                                        <EditIcon/>
                                    </IconButton>
                                </Tooltip>
                            }

                            { edit &&  
                                <Tooltip title="Cancel">    
                                    <IconButton color="primary" sx={{ mt: 2}} aria-label="Cancel changes" className="edit-btn cancel-btn" onClick={() => setEdit(false)}>
                                        <CloseOutlinedIcon/>
                                    </IconButton>
                                </Tooltip> 

                                
                            }
                            { edit &&   
                                <Tooltip title="Confirm">
                                    <IconButton color="primary" sx={{ mt: 2}} aria-label="Confirm changes" className="edit-btn confirm-btn" onClick={() => setEdit(false)}>
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