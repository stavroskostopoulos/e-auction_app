package com.di.app.message;

import com.di.app.item.Item;
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


    public Message SaveMessage(Message newMess) {
        return messageRepository.save(newMess);
    }

    public void DeleteMessage(Long id) {
        Message message = messageRepository.getById(id);
        messageRepository.delete(message);
    }


}

