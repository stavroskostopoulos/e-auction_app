package com.di.app.Recommendations;

import com.di.app.item.Item;
import com.di.app.message.Message;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping(path = "/api")
@RestController
@CrossOrigin(origins = "*")
public class RecommendationsController {

    RecommendationsService recommendationsService;

    // GET

    @GetMapping(path = "/items/recommended/{userid}")
    public ResponseEntity<List<Item>> GetInbox(@PathVariable("userid") Long userId){
        return ResponseEntity.ok().body(recommendationsService.getRecommendations(userId));
    }


}
