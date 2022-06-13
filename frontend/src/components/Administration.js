import React from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from "@material-ui/core/styles";


import "../css/Administration.css"

import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import ListItemButton from '@mui/material/ListItemButton';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import CheckIcon from '@mui/icons-material/Check';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import Pagination from '@mui/material/Pagination';
import PersonSharpIcon from '@mui/icons-material/PersonSharp';


import UsersList from './individual compenents/UsersList';
import RegistrationRequestsList from './individual compenents/RegistrationRequestsList';


function Administration() {
  
    const [value, setValue] = React.useState("1");
	const [request, setRequest] = React.useState(false);

	const [totalUsersList, setTotalUsersList] = React.useState(["1", "2", "3", "4", "5", "6", "7", "8"]);
	const [usersRegisterList, setUsersRegisterList] = React.useState(["1", "2", "3", "4", "5", "6", "7", "8"]);

    return (
      
       
  
            
            <div className='main-container'>
              <div className="column-left" />
              <div className="column-right"/>
              <div className="column-middle" style={{backgroundColor: "#fff"}}>
                <div className='admin-container'>


                    <div className='admin-title-box'>
                        <h1 className='admin-title'>Administration page</h1>
                    </div>


                    <div className='admin-menu'>
                        <Tabs
                            value={value}
                            onChange={(e,value) => {setValue(value);}}                        textColor="secondary"
                            indicatorColor="secondary"
                            aria-label="secondary tabs example"
                            >
                            <Tab value="1" label={<p>All users</p>} onClick={() => setRequest(false)} className='admin-menu-option' />
                            <Tab value="2" label={<p>Pending registration requests</p>} onClick={() => setRequest(true)} className='admin-menu-option' />
                            
                        </Tabs>
                    </div>



                    <div className='admin-content'>

						{/* if we are on the "ALL USERS" requets tab */}


						{!request &&
							<UsersList totalUsersList={totalUsersList}/>
						}
						
						{/* pagination */}
						{!request && (totalUsersList.length > 6) &&
							<div className='pagination-container'>
								<Pagination variant="outlined" className='pagination-admin' count={10} color="secondary" />
							</div>
						}
						



						{/* if we are on the "REGISTRATIONS REQUESTS" tab */}
						{request && 
							<RegistrationRequestsList requests={usersRegisterList}/>
						}
						{/* pagination */}
						{request && (usersRegisterList.length > 6) &&
							<div className='pagination-container'>
								<Pagination variant="outlined" className='pagination-admin' count={10} color="secondary" />
							</div>
						}
						
                    </div>
					
                </div>
              </div>
            </div> 
          
  
  
  
        
      
    );
  }
  
  export default Administration;