package com.di.app.message;

import com.di.app.item.Item;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping(path = "/api")
@RestController
@CrossOrigin(origins = "*")
public class MessageController {

    private final MessageService messageService;

    @Autowired
    public MessageController(MessageService service) {
        this.messageService = service;
    }


    // POST

    @PostMapping(path = "messages/save")
    public ResponseEntity<Message> SaveItem(@RequestBody Message newMessage){
        return ResponseEntity.ok().body(messageService.SaveMessage(newMessage));
    }


}
