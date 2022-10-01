import React from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from "@material-ui/core/styles";
import axios from 'axios';
import { useEffect } from 'react';

import downloadAsXML from '../services/AdministrationServices';
import { downloadAsJSON } from '../services/AdministrationServices';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "../css/Administration.css"

import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import CircularProgress from '@mui/material/CircularProgress';
import { Stack } from '@mui/material';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import CodeOutlinedIcon from '@mui/icons-material/CodeOutlined';
import DataObjectOutlinedIcon from '@mui/icons-material/DataObjectOutlined';

import UsersList from './individual compenents/UsersList';
import RegistrationRequestsList from './individual compenents/RegistrationRequestsList';


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



    const actions = [
        { icon: <DataObjectOutlinedIcon />, name: 'Download as JSON', operation: "jsondownload" },
        { icon: <CodeOutlinedIcon />, name: 'Download as XML', operation: "xmldownload" },
        
    ];
      
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);   

    React.useEffect(() => {

        

        if(request){
            getPendingUsers();
        }else{
            allUsers(); 
        }

    }, [request, refreshString]);

    const allUsers = async () => {
        try{
            // console.log(totalUsersPagination);
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

    const handlePendingPageChange = (event, pageNumber) => {
        setRefreshString("paginationpendinglist"+pageNumber);
        setPendingPagination(pageNumber);
    }

    const handleTotalUsersPageChange = (event, pageNumber) => {
        setRefreshString("paginationuserslist"+pageNumber);
        setTotalUsersPagination(pageNumber);
    }


    //handler function
    function handleClick (e,operation){
        e.preventDefault();


        if(operation=="xmldownload"){
            downloadAsXML();
        }else if(operation=="jsondownload"){
            downloadAsJSON();
        }
    };


    return (
      
       
  
            
            <div className='main-container'>
                <ToastContainer
                    position="bottom-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
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
							<UsersList totalUsersList={totalUsersList} setRefreshStringFunction={setRefreshString} handleTotalUsersPageChange={handleTotalUsersPageChange}/>
						}
						
						
						



						{/* if we are on the "REGISTRATIONS REQUESTS" tab */}
						{!forbiddenFlag && !isLoading && request && 
							<RegistrationRequestsList requests={usersRegisterList} setRefreshStringFunction={setRefreshString} handlePendingPageChange={handlePendingPageChange} />
						}
						
						
                    </div>
					
                </div>
              </div>
              {!forbiddenFlag && 
                <SpeedDial
                        ariaLabel="SpeedDial basic example"
                        sx={{ position: 'absolute', top: 80, right: 16 }}
                        icon={<ArchiveOutlinedIcon />}
                        direction='down'
                        FabProps={{
                            sx: {
                            bgcolor: 'secondary.main',
                            '&:hover': {
                                bgcolor: 'secondary.main',
                            }
                            }
                        }}
                        onClose={handleClose}
                        onOpen={handleOpen}
                        open={open}
                    >
                        {actions.map((action) => (
                        <SpeedDialAction
                            key={action.name}
                            icon={action.icon}
                            tooltipTitle={action.name}
                            onClick={(e) => {
                                handleClick(e, action.operation)
                        }}
                        />
                        ))}
                    </SpeedDial>
                }
            </div> 
          
  
  
  
        
      
    );
  }
  
  export default Administration;