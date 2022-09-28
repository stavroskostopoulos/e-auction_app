package com.di.app.message;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping(path = "/api")
@RestController
@CrossOrigin(origins = "*")
public class MessageController {

    private final MessageService messageService;

    @Autowired
    public MessageController(MessageService service) {
        this.messageService = service;
    }


    // GET

    @GetMapping(path = "/messages/inbox/{userid}")
    public ResponseEntity<List<Message>> GetInbox(@PathVariable("userid") Long receiverId){
        return ResponseEntity.ok().body(messageService.GetInbox(receiverId));
    }

    @GetMapping(path = "/messages/sent/{userid}")
    public ResponseEntity<List<Message>> GetOutbox(@PathVariable("userid") Long senderId){
        return ResponseEntity.ok().body(messageService.GetOutbox(senderId));
    }

    @GetMapping(path = "/messages/message/{messageId}")
    public ResponseEntity<Message> GetMessage(@PathVariable("messageId") Long id){
        return ResponseEntity.ok().body(messageService.GetMessage(id));
    }

    @GetMapping(path = "/messages/seen/{messageId}")
    public ResponseEntity<Message> CheckMessage(@PathVariable("messageId") Long id){
        return ResponseEntity.ok().body(messageService.SeenMessage(id));
    }


    @GetMapping(path = "/messages/unread/{userid}")
    public ResponseEntity<Boolean> CheckUnreadMessages(@PathVariable("userid") Long id){
        return ResponseEntity.ok().body(messageService.CheckUnreadMessages(id));
    }

    // POST

    @PostMapping(path = "/messages/save")
    public ResponseEntity<Message> SaveMessage(@RequestBody Message newMessage){
        return ResponseEntity.ok().body(messageService.SaveMessage(newMessage));
    }


    // DELETE

    @DeleteMapping("/messages/delete/{messageId}")
    public ResponseEntity<Long> DeleteMessage(@PathVariable("messageId") Long id) {
        messageService.DeleteMessage(id);
        return ResponseEntity.ok().build();
    }


}
