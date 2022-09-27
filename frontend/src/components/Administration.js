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
import CircularProgress from '@mui/material/CircularProgress';
import { Stack } from '@mui/material';


import UsersList from './individual compenents/UsersList';
import RegistrationRequestsList from './individual compenents/RegistrationRequestsList';
import { useEffect } from 'react';
import axios from 'axios';


function Administration(props) {
  
    const [value, setValue] = React.useState("1");
	const [request, setRequest] = React.useState(false);

	const [totalUsersList, setTotalUsersList] = React.useState([]);
	const [usersRegisterList, setUsersRegisterList] = React.useState([]);

    //is Loading
    const [isLoading, setIsLoading] = React.useState(true);

    //pagination state variables
    const [pendingPagination, setPendingPagination] = React.useState(1);
    const [totalUsersPagination, setTotalUsersPagination] = React.useState(1);

    const [forbiddenFlag, setForbiddenFlag] = React.useState(true);

    const [refreshString, setRefreshString] = React.useState("refresh")


    React.useEffect(() => {

        

        if(request){
            getPendingUsers();
        }else{
            allUsers(); 
        }

    }, [request, refreshString]);

    const allUsers = async () => {
        try{
            const res = await axios.get(`https://localhost:8443/api/users/${totalUsersPagination-1}`, { headers: {  Access_token: 'Bearer ' + localStorage.getItem('jwt')} });

            setTotalUsersList(res.data.content)
            setForbiddenFlag(false);
            setIsLoading(false);

        }catch(err){

            console.log(err);
            setIsLoading(true);

            if(err.response.status === 403){

                console.log("forbidden");
                setForbiddenFlag(true);
                setIsLoading(false);

            }
            

        }
    }

    const getPendingUsers = async () => {
        try{
            const res = await axios.get(`https://localhost:8443/api/users/pending/${pendingPagination-1}`, { headers: {  Access_token: 'Bearer ' + localStorage.getItem('jwt')} });

            setUsersRegisterList(res.data.content);
            setForbiddenFlag(false);
            setIsLoading(false);

            // console.log(res.data.content);
        }catch(err){

            console.log(err);
            setIsLoading(true);

            if(err.response.status === 403){

                console.log("forbidden");
                setForbiddenFlag(true);
                setIsLoading(false);

            }
            

        }
    }

    const handlePendingPageChange = (pageNumber) => {
        setPendingPagination(pageNumber);
    }

    const handleTotalUsersPageChange = (pageNumber) => {
        setTotalUsersPagination(pageNumber);
    }

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
                            onChange={(e,value) => {setValue(value);}}                        
                            textColor="secondary"
                            indicatorColor="secondary"
                            aria-label="secondary tabs example"
                            >
                            <Tab value="1" label={<p>All users</p>} onClick={() => setRequest(false)} className='admin-menu-option' />
                            <Tab value="2" label={<p>Pending registration requests</p>} onClick={() => setRequest(true)} className='admin-menu-option' />
                            
                        </Tabs>
                    </div>



                    <div className='admin-content'>

						{/* if we are on the "ALL USERS" requets tab */}

                        {isLoading && 
                            <div className='profile-loading'>
                                <CircularProgress color="secondary" />
                            </div>
                        }

                        {!isLoading && forbiddenFlag &&
                            <div className='forbidden-container'>
                                <Stack spacing={2} className="forbidden-stack">
                                    <img className="forbidden-img" src="/forbidden.png"></img>
                                    <p className='forbidden-msg'>You are not authorized to be here!</p>
                                
                                </Stack>
                            </div>
                        }


						{!forbiddenFlag && !isLoading && !request &&
							<UsersList totalUsersList={totalUsersList} setRefreshStringFunction={setRefreshString}/>
						}
						
						{/* pagination */}
						{!forbiddenFlag && !isLoading && !request && (totalUsersList.length > 6) &&
							<div className='pagination-container'>
								<Pagination variant="outlined" className='pagination-admin' count={10} color="secondary" onChange={(pageNumber) => handleTotalUsersPageChange(pageNumber)}/>
							</div>
						}
						



						{/* if we are on the "REGISTRATIONS REQUESTS" tab */}
						{!forbiddenFlag && !isLoading && request && 
							<RegistrationRequestsList requests={usersRegisterList} setRefreshStringFunction={setRefreshString}/>
						}
						{/* pagination */}
						{!forbiddenFlag && !isLoading && request && (usersRegisterList.length > 6) &&
							<div className='pagination-container'>
								<Pagination variant="outlined" className='pagination-admin' count={10} color="secondary" onChange={(pageNumber) => handlePendingPageChange(pageNumber)}/>
							</div>
						}
						
                    </div>
					
                </div>
              </div>
            </div> 
          
  
  
  
        
      
    );
  }
  
  export default Administration;