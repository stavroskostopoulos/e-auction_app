package com.di.app.contact;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping(path = "/api")
@RestController
@CrossOrigin(origins = "*")
public class ContactController {

    private final ContactService contactService;

    @Autowired
    public ContactController(ContactService contactService) {
        this.contactService = contactService;
    }

    // GET

    @GetMapping(path = "/contacts/{userid}")
    public ResponseEntity<List<String>> GetContacts(@PathVariable("userid") Long userId){
        return ResponseEntity.ok().body(contactService.GetContacts(userId));
    }

}
