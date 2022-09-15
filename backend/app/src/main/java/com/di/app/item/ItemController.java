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

    @GetMapping(path = "/itemswithcats")
    public ResponseEntity<Page<Item>> GetItemsByPrice(Pageable pageable){
        return ResponseEntity.ok().body(itemService.GetItemsWithCats(pageable));
    }

    // POST

    @PostMapping(path = "/items/filter/price/{offset}")
    public ResponseEntity<Page<Item>> GetItemsByPrice(@RequestBody Map<String, String> json, @PathVariable("offset") Integer offset){
        return ResponseEntity.ok().body(itemService.GetItemsByPrice(json.get("low"), json.get("high"), json.get("cats"), offset));
    }

    //kostopez
    @PostMapping(path = "/items/filter/kostopez/{offset}")
    public ResponseEntity<Page<Item>> KostopezFilters(@RequestBody Map<String, String> json, @PathVariable("offset") Integer offset){
        return ResponseEntity.ok().body(itemService.KostopezFilters(json.get("low"), json.get("high"), json.get("cats"), json.get("word"), json.get("longitude"), json.get("lat"), offset));
    }

    @PostMapping(path = "/items/filter/loc/{offset}")
    public ResponseEntity<Page<Item>> GetItemsByLocation(@RequestBody Map<String, String> json, @PathVariable("offset") Integer offset){
        return ResponseEntity.ok().body(itemService.GetItemsByLocation(json.get("lat"), json.get("lng"), json.get("cats"), offset));
    }

    @PostMapping(path = "/items/filter/cat/{offset}")
    public ResponseEntity<Page<Item>> GetItemsByCat(@RequestBody Category cat, @PathVariable("offset") Integer offset){
        return ResponseEntity.ok().body(itemService.GetItemsByCategory(cat,offset));
    }

    @PostMapping(path = "/items/filter/desc/{offset}")
    public ResponseEntity<Page<Item>> GetItemsByCat(@RequestBody String word, @PathVariable("offset") Integer offset){
        return ResponseEntity.ok().body(itemService.GetItemsBySearch(word,offset));
    }

    @PostMapping(path = "items/save")
    public ResponseEntity<Item> SaveItem(@RequestBody Item newItem){
        return ResponseEntity.ok().body(itemService.SaveItem(newItem));
    }

    @PostMapping(path = "items/save/cat")
    public ResponseEntity<Item> GiveCategories(@RequestBody Category cats){
        return ResponseEntity.ok().body(itemService.GiveCategories(cats));
    }


    // DELETE

    @DeleteMapping("/items/delete/{itemid}")
    public ResponseEntity<?> DeleteItem(@PathVariable("itemid") Long id) {
        itemService.DeleteItem(id);
        return ResponseEntity.ok().build();
    }


}
