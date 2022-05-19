import React from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from "@material-ui/core/styles";


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


function RegistrationRequestsList(props){

    const [pendingRequestsList, setPendingRequestsList] = React.useState([...props.requests]);

    const renderUsers = () => {

        //if there are users
        if(pendingRequestsList.length!==0){
            return (
                <List sx={{ width: '100%' }}>
                    {(pendingRequestsList.map((user) => (
                        <>
                           <CssListItem component={Link} to={'/profile'} >
								<CssListItemButton className='list-item-button'>
									<ListItemAvatar>
										<Avatar sx={{ width: 34 , height: 34 }} alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
									</ListItemAvatar>
									<ListItemText primary="Giorgos Koumpis" className='list-item-admin'/>
									<ListItemSecondaryAction>
										<Tooltip title='Reject'>
											<IconButton edge="end" aria-label="cancel" sx={{mr: 1}} scomponent={Link} to={'/login'} className='cancel-icon-admin'>
												<CloseOutlinedIcon />
											</IconButton>
										</Tooltip>
										<Tooltip title='Approve'>	
											<IconButton edge="end" aria-label="confirm" component={Link} to={'/login'} className='check-icon-admin'>
												<CheckIcon />
											</IconButton>
										</Tooltip>	
									</ListItemSecondaryAction>
								</CssListItemButton>
							</CssListItem>


                            <Divider variant="middle"  component="li" className='admin-list-divider'/>
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

export default RegistrationRequestsList;