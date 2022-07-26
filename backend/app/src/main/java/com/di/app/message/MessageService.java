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

    public List<Message> GetInbox(Long receiverId, Integer offset) {
        Integer limit = 8;
        return messageRepository.getInbox(receiverId,limit,offset);
    }

    public List<Message> GetOutbox(Long senderId, Integer offset) {
        Integer limit = 8;
        return messageRepository.getOutbox(senderId,limit,offset);
    }


    public Message SaveMessage(Message newMess) {
        return messageRepository.save(newMess);
    }

    public void DeleteMessage(Long id) {
        Message message = messageRepository.getById(id);
        messageRepository.delete(message);
    }


}

