import React from 'react';

//import material UI components
import { Stack } from '@mui/material';
import Avatar from '@mui/material/Avatar';

function MessageBody(props) {
    return (
        <div className='msg-body-container'>
            <div className='msg-sender-info-container'>
                <Stack direction="row" spacing={2} className='msg-list-item-info-container'>

                    <Avatar sx={{ width: 45 , height: 45 }} alt={`${props.msgusername.charAt(0)}`} src="/static/images/avatar/1.jpg" />
                    <p className='msg-sender-text'>{props.msgname}</p>


                </Stack>
            </div>

            <div className='msg-date-container'>
                    <p className='msg-date-text'>{props.date}</p>
            </div>
            <div className='msg-text-contains-container'>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam convallis, odio et faucibus mattis, justo odio consectetur nibh, accumsan porta eros lorem nec ipsum. Aliquam suscipit libero eros, sit amet rhoncus eros aliquam eget. Duis nec fringilla lacus. Morbi dui metus, congue nec ante non, tincidunt sollicitudin mi. Nam sollicitudin lorem lorem, sit amet consectetur magna congue id. Duis tellus ipsum, commodo nec semper vel, blandit id velit. Praesent tempus orci nec imperdiet porttitor. Phasellus ut vestibulum sem. Donec dictum, felis vel accumsan euismod, eros turpis vehicula erat, in sollicitudin orci urna in tellus. Vivamus et luctus mauris, sit amet feugiat sem. Nullam sit amet posuere arcu, eget egestas justo. Integer sed augue quis enim fermentum consectetur sed vitae nisl. Mauris pellentesque ligula felis, sed volutpat justo bibendum a. Donec risus metus, sodales at viverra id, interdum blandit libero. </p>
            </div>
        </div>
    )
}

export default MessageBody;