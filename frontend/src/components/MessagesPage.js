import React from 'react'

//import styling
import '../css/MessagesPage.css'

//import custom components
import MessageListItem from './individual compenents/MessageListItem';
import MessageBody from './individual compenents/MessageBody';

//import material UI components
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Badge from '@mui/material/Badge';
import { Stack } from '@mui/material';
import Divider from '@mui/material/Divider';

function MessagesPage() {
    const [tab, setTab] = React.useState("1");
    const [request, setRequest] = React.useState(false);
    const [unreadMsgs, setUnreadMsgs] = React.useState(true);


    const messages = [...Array(6).keys()];

    return (
        <div className="main-container">
            <div className="column-left" />
            <div className="column-right"/>
            <div className="column-middle" style={{backgroundColor: "#fff"}}>
                <div className='msg-main-container'>

                    <div className='msg-title-container'>
                        <h3>Messages</h3>
                    </div>

                    <div className='msg-tab-container'>
                        <Tabs
                            value={tab}
                            onChange={(e,value) => {setTab(value);}}                        
                            textColor="secondary"
                            indicatorColor="secondary"
                            aria-label="secondary tabs example"
                            >
                                
                            <Tab 
                                value="1" 
                                label={(unreadMsgs) ? <Badge anchorOrigin={{vertical: 'top', horizontal: 'left'}} color="primary" variant="dot">Inbox</Badge> : <p>Inbox</p>}
                                onClick={() => setRequest(false)} 
                                className='admin-menu-option' 
                            />
                            <Tab value="2" label={<p>Sent</p>} onClick={() => setRequest(true)} className='admin-menu-option' />
                            
                        </Tabs>
                    </div>
                


                    {   (tab==="1") ? 
                    
                        <div className='msg-content'>
                            <div className='msg-list-container'>
                                <Stack spacing={1}>
                                    {messages.map((msg) => (
                                        
                                        <>
                                            <MessageListItem msgusername="vaspio" unreadFlag={true}/>
                                            <Divider/>
                                        </>    


                                    ))}

                                </Stack>
                            </div>
                            <div className='msg-text-container'>
                                <MessageBody msgname="Giorgos Koumpis" msgusername="gkmp" date="12/5/2022"/>
                            </div>
                            
                        </div>
                    
                    :

                        <div className='msg-content'>
                            <div className='msg-list-container'>
                                <Stack spacing={1}>
                                    {messages.map((msg) => (
                                        
                                        <>
                                            <MessageListItem msgusername="gkmp" unreadFlag={false}/>
                                            <Divider/>
                                        </>    


                                    ))}

                                </Stack>
                            </div>
                            <div className='msg-text-container'>
                                <MessageBody msgname="Vasilis Pasios" msgusername="vaspio" date="6/7/2021"/>
                            </div>
                        
                        </div>

                    }

                
                </div>

            </div>
        </div>
    )
}

export default MessagesPage