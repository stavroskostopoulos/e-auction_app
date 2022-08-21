import React from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from "@material-ui/core/styles";
import axios from 'axios';


import "../../css/Administration.css"

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

const CssListItemButton = withStyles({
    root: {
		// backgroundColor: 'red !important',
		height: '54px !important',
		
	}
      
})(ListItemButton);

const CssListItem = withStyles({
    root: {
		// backgroundColor: 'red !important',
		height: '54px !important',
		
	}
      
})(ListItem);

function UsersList(props) {

    const handleDelete = async (userid) => {
        try{
            const res = await axios.delete(`https://localhost:8443/api/users/delete/${userid}`, { headers: {  Access_token: 'Bearer ' + localStorage.getItem('jwt')} });
            console.log(res);
        }catch(err){
            console.log(err);
        }
    }

    const renderUsers = () => {

        //if there are users
        if(props.totalUsersList.length!==0){
            return (
                <List sx={{ width: '100%' }}>
                    {(props.totalUsersList.map((user) => (
                        <>
                            <Link to={ `/profile/${user.id}`} state={{id: user.id }} style={{ textDecoration: 'none' }} className="linkcomponent">

                                <CssListItem	component={Link} to={'/profile'} >
                                    <CssListItemButton className='list-item-button'>
                                        <ListItemAvatar>
                                            <Avatar sx={{ width: 34 , height: 34 }} alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                                        </ListItemAvatar>
                                        <ListItemText primary={user.realname + " " + user.surname} className='list-item-admin'/>
                                        <ListItemSecondaryAction>
                                            <Tooltip title={<p>Delete user</p>} arrow>
                                                <IconButton edge="end" aria-label="delete" onClick={() => {handleDelete(user.id)}} component={Link} to={'/administration'} className='delete-icon-admin'>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Tooltip>
                                        </ListItemSecondaryAction>
                                    </CssListItemButton>
                                </CssListItem>


                                <Divider variant="middle"  component="li" className='admin-list-divider'/>
                            </Link>
                        
                        </>

                    )))}
                </List>
            );
        }


        // if there are no users
        return (
            <div className='empty-msg-container'>
                <p className='empty-list-msg'>There are no registered users yet</p>
            </div>
        );

    }


    return (
        <div>
            
           {renderUsers()} 
           
        </div>

    );

}

export default UsersList;
