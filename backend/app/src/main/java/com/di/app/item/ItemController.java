package com.di.app.item;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
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


    // GET

    @GetMapping(path = "/items/all")
    public ResponseEntity<List<Item>> GetItems(){
        return ResponseEntity.ok().body(itemService.GetItems());
    }

    @GetMapping(path = "/items/{itemid}")
    public ResponseEntity<Optional<Item>> GetItemById(@PathVariable("itemid") Long id){
        return ResponseEntity.ok().body(itemService.GetItemById(id));
    }

    @GetMapping(path = "/items")
    public ResponseEntity<Page<Item>> GetItemsLimit(Pageable pageable){
        return ResponseEntity.ok().body(itemService.GetItemsLimit(pageable));
    }


    // POST

    @PostMapping(path = "/items/filter/price")
    public ResponseEntity<Page<Item>> GetItemsByPrice(@RequestBody Map<String, String> json, Pageable pageable){
        return ResponseEntity.ok().body(itemService.GetItemsByPrice(json.get("low"), json.get("high"),pageable));
    }

    @PostMapping(path = "/items/filter/loc")
    public ResponseEntity<Page<Item>> GetItemsByLocation(@RequestBody Map<String, String> json, Pageable pageable){
        return ResponseEntity.ok().body(itemService.GetItemsByLocation(json.get("lat"), json.get("lng"),pageable));
    }

    @PostMapping(path = "/items/filter/cat/{offset}")
    public ResponseEntity<Page<Item>> GetItemsByCat(@RequestBody Category cat, @PathVariable("offset") Integer offset){
        return ResponseEntity.ok().body(itemService.GetItemsByCategory(cat,offset));
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
