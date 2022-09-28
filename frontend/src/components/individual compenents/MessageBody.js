import React from 'react';
import { useEffect } from 'react';
import axios from 'axios';

//import material UI components
import { Stack } from '@mui/material';
import Avatar from '@mui/material/Avatar';

function MessageBody(props) {
    
    const [name, setName] = React.useState('');


    

    return (
        <div className='msg-body-container'>
            <div className='msg-sender-info-container'>
                <Stack direction="row" spacing={2} className='msg-list-item-info-container'>

                    <Avatar sx={{ width: 45 , height: 45 }} alt={`${props.msgUsername.charAt(0)}`} src="/static/images/avatar/1.jpg" />
                    <p className='msg-sender-text'>{props.msgRealname + ' ' + props.msgSurname}</p>{props.sentFlag && <p className='msg-sender-text-sent'>from you</p>}


                </Stack>
            </div>

            <div className='msg-date-container'>
                    <p className='msg-date-text'>{props.date}</p>
            </div>
            <div className='msg-text-contains-container'>
                <h3 className='msg-title'>{props.msgTitle} </h3>
                <p className='msg-text-contains-text'>{props.msgContent}</p>
            </div>
        </div>
    )
}

export default MessageBody;