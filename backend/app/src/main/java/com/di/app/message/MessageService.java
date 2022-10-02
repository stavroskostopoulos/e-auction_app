package com.di.app.message;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class MessageService {
    private final MessageRepository messageRepository;


    public List<Message> GetAllMessages(){
        return messageRepository.findAll();
    }

    public Message GetMessage(Long id){
        return messageRepository.getById(id);
    }

    public List<Message> GetInbox(Long receiverId) {
        return messageRepository.getInbox(receiverId);
    }

    public List<Message> GetOutbox(Long senderId) {
        return messageRepository.getOutbox(senderId);
    }

    public Message SeenMessage(Long id){
        Message mess = messageRepository.getById(id);

        mess.setSeen(Boolean.TRUE);
        return mess;
    }

    public Boolean CheckUnreadMessages(Long id){
        Message check = messageRepository.checkUnread(id);

        if(check == null){
            return false;
        }
        return true;
    }

    public Message SaveMessage(Message newMess) {
        return messageRepository.save(newMess);
    }

    public void DeleteMessage(Long id) {
        Message message = messageRepository.getById(id);
        messageRepository.delete(message);
    }


}

