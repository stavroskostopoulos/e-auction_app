import React from 'react'

//import custom components
import MessageListItem from './MessageListItem';
import MessageBody from './MessageBody';



//Material UI components
import Divider from '@mui/material/Divider';
import { Stack } from '@mui/material';


function MessagesList(props) {
  return (
    <>
                        {(!props.messages.length) ? 
                            <div className='empty-msg-content'>
                                <div className='empty-auctions'>
                                    <p>Looks like your inbox is empty!</p>
                                </div>
                            </div>
                            :
                            <div className='msg-content'>
                                <div className='msg-list-container'>
                                    <Stack spacing={1}>
                                        {props.messages.map((msg, index) => (
                                            
                                            <>
                                                <MessageListItem msgusername={msg.username} messageTitle={msg.title} seenFlag={msg.seen} onClick={e => props.handleCurrentMessage(e, index) }  sentFlag={props.sentFlag} />
                                                <Divider/>
                                            </>    


                                        ))}

                                    </Stack>
                                </div>
                                <div className='msg-text-container'>
                                    {/* <MessageBody msgId={msg.senderId} msgusername={msg.username} date="12/5/2022"/> */}

                                    <MessageBody msgId={props.currentMessage.messageId} msgRealname={props.currentMessage.senderRealname} msgSurname={props.currentMessage.senderSurname} msgSenderReceiverId={props.currentMessage.senderId} msgContent={props.currentMessage.content} msgUsername={props.currentMessage.username} msgTitle={props.currentMessage.title} date={new Date(props.currentMessage.msgDate).toDateString()} sentFlag={props.sentFlag}/>
                                </div>
                                
                            </div>}
    </>
  )
}

export default MessagesList;