import React from 'react';
import { Link } from 'react-router-dom';

import { makeStyles } from '@mui/styles';
import { withStyles } from "@material-ui/core/styles";

import "../css/Profile.css"

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import CheckIcon from '@mui/icons-material/Check';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';

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

function Profile() {
    
    const profiletypes = ['Seller', 'Bidder', 'Malakas'];

    const [edit, setEdit] = React.useState(false);
    const [profiletype, setProfiletype] = React.useState('Seller');

    const handleChange = (event) => {
        setProfiletype(event.target.value);
    };

    return (
      
        <div className="main-container">
            <div className="column-left" />
            <div className="column-right"/>
            <div className="column-middle" style={{backgroundColor: "#fff"}}>
            


                <div className="profile-container">
                    <div className="profile-column-left" >
                        <img className="profile-picture" src="/faithplusone.jpg"></img>
                    </div>
                    <div className="profile-column-right">
                        <h2 className="name-title">Stavros Kostopoulos</h2>
                        
                        <div className="profile-info-container">
                            <div className="left-profile-info-column">

                                {edit &&
                                    <CssTextField
                                        disabled={!edit}
                                        id="outlined-disabled"
                                        label="First name"
                                        defaultValue="Stavros"
                                        className="profileinfo-tf"
                                        sx={{ mt: 5}} 
                                    />
                                }
                                <CssTextField
                                    disabled={!edit}
                                    id="outlined-disabled"
                                    label="Email"
                                    defaultValue="sdi1700068@di.uoa.gr"
                                    className="profileinfo-tf" 
                                    sx={{ mt: 5}}
                                />
                                <CssTextField
                                    disabled={!edit}
                                    id="outlined-disabled"
                                    label="Phone number"
                                    defaultValue="6983892580"
                                    className="profileinfo-tf" 
                                    sx={{ mt: 5}}
                                />
                            </div>
                            <div className="right-profile-info-column">
                                {edit &&

                                    <CssTextField
                                        disabled={!edit}
                                        id="outlined-disabled"
                                        label="Last name"
                                        defaultValue="Kostopoulos"
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
                                    defaultValue="128213692134"
                                    className="profileinfo-tf" 
                                    sx={{ mt: 5}}
                                />  
                            </div>
                        </div>
                        
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
            
                
                


            </div>
        </div>
            
            
          
  
  
  
        
      
    );
  }
  
  export default Profile;