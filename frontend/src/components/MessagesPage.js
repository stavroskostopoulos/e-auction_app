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
import axios from 'axios';

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

    const [inboxMessages, setInboxMessages] = React.useState([]);
    const [sentMessages, setSentMessages] = React.useState([]);

    const [newMessage, setNewMessage] = React.useState('');
    

    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {


        if(tab==="1"){
            getInbox();
        }else{
            getSent();
        }

        //check for unread messages(so we remove or keep the badge)
        checkUnread();

    }, [tab, newMessage]);

    const getInbox = async () => {
        try{
            const result = await axios.get(`https://localhost:8443/api/messages/inbox/${localStorage.getItem('loggedUserId')}`, { headers: {  Access_token: 'Bearer ' + localStorage.getItem('jwt')} });

            setInboxMessages(result.data);
            console.log(result);
            if(result.data.length){setCurrentMessage(result.data[0])}
        }catch(err){
            console.log(err);
        }

    };

    const getSent = async () => {
        try{
            const result = await axios.get(`https://localhost:8443/api/messages/sent/${localStorage.getItem('loggedUserId')}`
    
                                    ,{ headers: {  Access_token: 'Bearer ' + localStorage.getItem('jwt')} });
            
            setSentMessages(result.data);
            console.log(result);
            if(result.data.length){setCurrentMessage(result.data[0])}
            
        }catch(err){
            console.log(err);
        }
        
    };
    
    const checkUnread = async () => {
        const unreadmessages = await axios.get(`https://localhost:8443/api/messages/unread/${localStorage.getItem("loggedUserId")}`, { headers: {  Access_token: 'Bearer ' + localStorage.getItem('jwt')} });
        if(!unreadmessages){
            localStorage.setItem('unreadMessages', false);
        }
    };

    //newMail
    const [newMailTitle, setNewMailTitle] = React.useState("");
    const [showEmptyTitle, setShowEmptyTitle] = React.useState(false);

    const [newMailText, setNewMailText] = React.useState("");
    const [showEmptyText, setShowEmptyText] = React.useState(false);


    const [contacts, setContacts] = React.useState([]);
    const [chosenReceiver, setChosenReceiver] = React.useState('');
    const [showEmptyReceiver, setShowEmptyReceiver] = React.useState(false);
    const [currentMessage, setCurrentMessage] = React.useState();
    
    
    const handleClickOpen = () => {
      setOpen(true);
      getContacts();
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const getContacts = async() => {
        try{
            const res = await axios.get(`https://localhost:8443/api/contacts/${localStorage.getItem('loggedUserId')}`, { headers: {  Access_token: 'Bearer ' + localStorage.getItem('jwt')} })
            setContacts(res.data);
            console.log(res);
        }catch(err){
            console.log(err);
        }
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

        // http request
        try{
            const receiverInfo = await axios.get(`https://localhost:8443/api/users/username/${chosenReceiver}`, { headers: {  Access_token: 'Bearer ' + localStorage.getItem('jwt')} });
            let receiverId = receiverInfo.data.id;
            let receiverRealname = receiverInfo.data.realname;
            let receiverSurname = receiverInfo.data.surname;

            const senderInfo = await axios.get(`https://localhost:8443/api/users/id/${localStorage.getItem('loggedUserId')}`, { headers: {  Access_token: 'Bearer ' + localStorage.getItem('jwt')} });

            let senderRealname = senderInfo.data.realname;
            let senderSurname = senderInfo.data.surname;
            
            let currentDate = new Date();

            
            // http request
            await axios.post(`https://localhost:8443/api/messages/save`, 
            {

                receiverId: Number(receiverId),
                senderId: Number(localStorage.getItem('loggedUserId')),
                title: newMailTitle,
                content: newMailText,
                username: chosenReceiver,
                receiverRealname: receiverRealname,
                receiverSurname: receiverSurname,
                senderRealname: senderRealname,
                senderSurname: senderSurname,
                msgDate: currentDate,
                seen: false,
            }
            ,{ headers: {  Access_token: 'Bearer ' + localStorage.getItem('jwt')} });

            setNewMessage(currentDate);

        }catch(err){
            console.log(err);
        }


        handleClose();
    };

    const handleCurrentMessageInbox = (e, index) => {
        setCurrentMessage(inboxMessages[index]);
        markAsSeen(inboxMessages[index].messageId);
        console.log("otidhpote"+index);
    };

    const handleCurrentMessageSent = (e, index) => {
        setCurrentMessage(sentMessages[index]);
        markAsSeen(sentMessages[index].messageId);
        console.log("otidhpote2"+index);
    };

    const markAsSeen = async (msgId) => {
        // await http request
        await axios.get(`https://localhost:8443/api/messages/seen/${msgId}`, { headers: {  Access_token: 'Bearer ' + localStorage.getItem('jwt')} });
    }


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
                                label={(localStorage.getItem("unreadMessages")) ? <Badge anchorOrigin={{vertical: 'top', horizontal: 'left'}} color="primary" variant="dot">Inbox</Badge> : <p>Inbox</p>}
                                onClick={() => setRequest(false)} 
                                className='admin-menu-option' 
                            />
                            <Tab value="2" label={<p>Sent</p>} onClick={() => setRequest(true)} className='admin-menu-option' />
                            
                        </Tabs>
                    </div>
                


                    {   (tab==="1") ? 
                    
                        (!inboxMessages.length) ? 
                            <div className='empty-msg-content'>
                                <div className='empty-auctions'>
                                    <p>Looks like your inbox is empty!</p>
                                </div>
                            </div>
                            :
                            <div className='msg-content'>
                                <div className='msg-list-container'>
                                    <Stack spacing={1}>
                                        {inboxMessages.map((msg, index) => (
                                            
                                            <>
                                                <MessageListItem msgusername={msg.username} messageTitle={msg.title} seenFlag={msg.seen} onClick={e => handleCurrentMessageInbox(e, index) }  sentFlag={false} />
                                                <Divider/>
                                            </>    


                                        ))}

                                    </Stack>
                                </div>
                                <div className='msg-text-container'>
                                    {/* <MessageBody msgId={msg.senderId} msgusername={msg.username} date="12/5/2022"/> */}

                                    <MessageBody msgId={currentMessage.messageId} msgRealname={currentMessage.senderRealname} msgSurname={currentMessage.senderSurname} msgSenderReceiverId={currentMessage.senderId} msgContent={currentMessage.content} msgUsername={currentMessage.username} msgTitle={currentMessage.title} date={new Date(currentMessage.msgDate).toDateString()} sentFlag={false}/>
                                </div>
                                
                            </div>
                    
                    :

                        (!sentMessages.length) ? 
                        <div className='empty-msg-content'>
                            <div className='empty-auctions'>
                                <p>Looks like you haven't sent any messages yet!</p>
                            </div>
                        </div>
                        :
                        <div className='msg-content'>
                            <div className='msg-list-container'>
                                <Stack spacing={1}>
                                    {sentMessages.map((msg, index) => (
                                        
                                        <>
                                            <MessageListItem msgusername={msg.username} messageTitle={msg.title} seenFlag={false} onClick={e => {handleCurrentMessageSent(e, index)} } sentFlag={true}/>
                                            <Divider/>
                                        </>    


                                    ))}

                                </Stack>
                            </div>
                            <div className='msg-text-container'>
                                {/* <MessageBody msgiId={msg.receiverId} msgusername={msg.username} date="6/7/2021"/> */}
                                <MessageBody msgId={currentMessage.messageId} msgRealname={currentMessage.receiverRealname} msgSurname={currentMessage.receiverSurname} msgSenderReceiverId={currentMessage.receiverId} msgContent={currentMessage.content} msgUsername={currentMessage.username} msgTitle={currentMessage.title} date={new Date(currentMessage.msgDate).toDateString()} sentFlag={true}/>

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
                                inputProps={{ maxLength: 240 }}
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