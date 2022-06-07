import React from 'react'

//import material UI components
import { Stack } from '@mui/material';
import Avatar from '@mui/material/Avatar';

function MessageListItem(props) {

    const unreadMsg = props.unreadFlag;

    return (
        <div className='msg-list-item'>
            <Stack direction="row" spacing={2} className='msg-list-item-info-container'>
                <Avatar sx={{ width: 40 , height: 40 }} alt={`${props.msgusername.charAt(0)}`} src="/static/images/avatar/1.jpg" />
                {unreadMsg ? <p className='msg-list-item-name-bold'>{props.msgusername}</p> : <p className='msg-list-item-name'>{props.msgusername}</p>}
                
            </Stack>              
        </div>
    )
}

export default MessageListItem;