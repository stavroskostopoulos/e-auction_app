import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';

import "../css/profile.css"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import EditIcon from '@mui/icons-material/Edit';

const useStyles = makeStyles({
    profileTextField: {
        // padding: '10px!important'
        
    }

});

function Profile() {
  
    const classes = useStyles();

    const [edit, setEdit] = React.useState(true);

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

                                {!edit &&
                                    <TextField
                                        disabled={edit}
                                        id="outlined-disabled"
                                        label="First name"
                                        defaultValue="Stavros"
                                        className="profileinfo-tf"
                                        sx={{ mt: 5}} 
                                    />
                                }
                                <TextField
                                    disabled={edit}
                                    id="outlined-disabled"
                                    label="Email"
                                    defaultValue="sdi1700068@di.uoa.gr"
                                    className="profileinfo-tf" 
                                    sx={{ mt: 5}}
                                />
                            </div>
                            <div className="right-profile-info-column">
                                {!edit &&

                                    <TextField
                                        disabled={edit}
                                        id="outlined-disabled"
                                        label="Last name"
                                        defaultValue="Kostopoulos"
                                        className="profileinfo-tf" 
                                        sx={{ mt: 5}}  
                                    />
                                
                                }

                                <TextField
                                    disabled={edit}
                                    id="outlined-disabled"
                                    label="Type"
                                    defaultValue="Seller"
                                    className="profileinfo-tf"
                                    sx={{ mt: 5}} 
                                    />
                            </div>
                        </div>
                    </div>
                    <div className="profile-buttons">
                        <Button variant="contained" endIcon={<EditIcon/>} className="edit-btn" sx={{ mt: 2}} onClick={() => setEdit(false)}>
                            Edit
                        </Button>
                    </div>
                </div> 
            
                
                


            </div>
        </div>
            
            
          
  
  
  
        
      
    );
  }
  
  export default Profile;