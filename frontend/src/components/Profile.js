import React from 'react';
import { Link } from 'react-router-dom';

import "../css/profile.css"


function Profile() {
  

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
                </div>
                </div> 
            




            </div>
        </div>
            
            
          
  
  
  
        
      
    );
  }
  
  export default Profile;