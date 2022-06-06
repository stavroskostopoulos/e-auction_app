package com.di.app.item;


import com.di.app.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;

import java.util.List;
import java.util.Optional;

@RequestMapping(path = "/api")
@RestController
@CrossOrigin(origins = "*")
public class ItemController {

    private final ItemService itemService;

    @Autowired
    public ItemController(ItemService service) {
        this.itemService = service;
    }

    @GetMapping(path = "/items")
    public ResponseEntity<List<Item>> GetUsers(){
        return ResponseEntity.ok().body(itemService.GetItems());
    }

    @GetMapping(path = "/items/{itemid}")
    public ResponseEntity<Optional<Item>> GetUserById(@PathVariable("itemid") Long id){
        return ResponseEntity.ok().body(itemService.GetItemById(id));
    }

    @PostMapping(path = "items/save")
    public ResponseEntity<Item> SaveItem(@RequestBody Item newItem){
        return ResponseEntity.ok().body(itemService.SaveItem(newItem));
    }

    @PostMapping(path = "items/save/cat")
    public ResponseEntity<Item> GiveCategories(@RequestBody Category cats){
        return ResponseEntity.ok().body(itemService.GiveCategories(cats));
    }


}
