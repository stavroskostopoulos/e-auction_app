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

    @PostMapping(path = "/messages/inbox/{offset}")
    public ResponseEntity<List<Message>> GetInbox(@RequestBody Long receiverId, @PathVariable("offset") Integer offset){
        return ResponseEntity.ok().body(messageService.GetInbox(receiverId, offset));
    }

    @PostMapping(path = "/messages/sent/{offset}")
    public ResponseEntity<List<Message>> GetOutbox(@RequestBody Long senderId, @PathVariable("offset") Integer offset){
        return ResponseEntity.ok().body(messageService.GetOutbox(senderId, offset));
    }

    @GetMapping(path = "/messages/message/{messageId}")
    public ResponseEntity<Message> GetMessage(@PathVariable("messageId") Long id){
        return ResponseEntity.ok().body(messageService.GetMessage(id));
    }



    // POST

    @PostMapping(path = "messages/save")
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
