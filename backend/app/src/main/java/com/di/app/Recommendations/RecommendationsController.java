package com.di.app.Recommendations;

import com.di.app.item.Item;
import com.di.app.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping(path = "/api")
@RestController
@CrossOrigin(origins = "*")
public class RecommendationsController {

    private final RecommendationsService recommendationsService;

    @Autowired
    public RecommendationsController(RecommendationsService recommendationsService) {
        this.recommendationsService = recommendationsService;
    }

    // GET

    @GetMapping(path = "/items/recommended/{userid}")
    public ResponseEntity<List<Item>> GetRecommended(@PathVariable("userid") Long userId){
        return ResponseEntity.ok().body(recommendationsService.getRecommendations(userId));
    }

    @GetMapping(path = "/items/loadrec/{userid}")
    public ResponseEntity<?> LoadRecommended(@PathVariable("userid") Long userId){
        return ResponseEntity.ok().body(recommendationsService.loadRecommendations(userId));
    }


}
