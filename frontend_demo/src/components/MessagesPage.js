import React from 'react'

//import styling
import '../css/MessagesPage.css'
import { withStyles } from "@material-ui/core/styles";

//import custom components
import MessageListItem from './individual compenents/MessageListItem';
import MessageBody from './individual compenents/MessageBody';

//import material UI components
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Badge from '@mui/material/Badge';
import { Stack } from '@mui/material';
import Divider from '@mui/material/Divider';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import SendIcon from '@mui/icons-material/Send';
import CancelIcon from '@mui/icons-material/Cancel';

const fabStyle = {
    position: 'fixed',
    top: 84,
    right: 24,
};

const CssTextField = withStyles({
    root: {
      '& label.Mui-focused': {
            color: '#1e2749',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#1e2749',
        },
        '& .MuiOutlinedInput-root': {
        
            '&.Mui-focused fieldset': {
                borderColor: '#1e2749',
            } 

        }

    }
})(TextField);

function MessagesPage() {
    const [tab, setTab] = React.useState("1");
    const [request, setRequest] = React.useState(false);
    const [unreadMsgs, setUnreadMsgs] = React.useState(true);

    const messages = [...Array(6).keys()];

    const [open, setOpen] = React.useState(false);

    
    
    //newMail
    const [newMailTitle, setNewMailTitle] = React.useState("");
    const [showEmptyTitle, setShowEmptyTitle] = React.useState(false);

    const [newMailText, setNewMailText] = React.useState("");
    const [showEmptyText, setShowEmptyText] = React.useState(false);


    const [contacts, setContacts] = React.useState(["vaspio", "gkmp", "kostopez", "nota"])
    const [chosenReceiver, setChosenReceiver] = React.useState(false)
    const [showEmptyReceiver, setShowEmptyReceiver] = React.useState(false);
    
    
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const handleChangeReceiver = (event) => {
        setChosenReceiver(event.target.value);
    };

    const sendEmail = async () => {

        if(!newMailTitle){
            setShowEmptyTitle(true);
            (!newMailText) ? setShowEmptyText(true) : setShowEmptyText(false);
            (!chosenReceiver) ? setShowEmptyReceiver(true): setShowEmptyReceiver(false);
            return;
        }else{
            setShowEmptyTitle(false);
        }


        if(!newMailText){
            setShowEmptyText(true);
            (!chosenReceiver) ? setShowEmptyReceiver(true) : setShowEmptyReceiver(false);
            return;
        }else{
            setShowEmptyText(false);
        }

        if(!chosenReceiver){
            setShowEmptyReceiver(true);
            return;
        }else{
            setShowEmptyReceiver(false);
        }

        console.log("proxwraw");
        // http request
        handleClose();
    };


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

                    <Tooltip title={<p className='tooltip-text'>Write a new mail</p>} placement="left" arrow>
                        <Fab size="large" TransitionComponent={Zoom} sx={fabStyle} color="secondary" aria-label="add" onClick={handleClickOpen}>
                            <AddIcon />
                        </Fab>
                    </Tooltip>
                </div>


                <Dialog open={open} onClose={handleClose} className='new-mail-dialog'>
                    <DialogTitle><p className='new-mail-dialog-title'>Write a new mail</p></DialogTitle>
                    <DialogContent>
                        
                        <Stack className='new-mail-textfields-container' spacing={3}>
                            
                            <CssTextField
                                id="outlined-select-currency"
                                className="new-mail-textfield" 
                                select
                                label="To:"
                                // value={`${chosenDuration} days`}
                                value={chosenReceiver}
                                sx={{textAlign: 'left !important'}}
                                onChange={handleChangeReceiver} 
                                size="small"
                                error={showEmptyReceiver}
                            >
                                {contacts.map((option) => (
                                    <MenuItem key={option} value={option}>
                                    {option}
                                    </MenuItem>
                                ))}
                            </CssTextField>

                            <CssTextField 
                                className="new-mail-textfield" 
                                label="Title" 
                                type='text'
                                size="small"
                                value={newMailTitle}
                                onChange={(e) => setNewMailTitle(e.target.value)}
                                error={showEmptyTitle}
                            />

                            <CssTextField 
                                id="outlined-multiline-static" 
                                className="new-mail-textfield" 
                                label="Mail text"
                                type='text'
                                multiline
                                rows={10}
                                size="small"
                                value={newMailText}
                                onChange={(e) => setNewMailText(e.target.value)}
                                error={showEmptyText}

                            />


                        </Stack>



                    </DialogContent>
                    <DialogActions className='dialog-action'>
                        <Button endIcon={<CancelIcon/>} onClick={handleClose} className="cancel-button" size='small'>Cancel</Button>
                        <Button endIcon={<SendIcon/>} onClick={sendEmail} className="send-button" size='small'>Send mail</Button>
                    </DialogActions>
                </Dialog>


            </div>
        </div>
    )
}

export default MessagesPage