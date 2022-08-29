package com.di.app.bid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RequestMapping(path = "/api")
@RestController
@CrossOrigin(origins = "*")
public class BidController {

    private final BidService bidService;

    @Autowired
    public BidController(BidService bidService) {
        this.bidService = bidService;
    }

    // GET

    @GetMapping(path = "/bids/{bidId}")
    public ResponseEntity<Optional<Bid>> GetBidsById(@PathVariable("bidId") Long id){
        return ResponseEntity.ok().body(bidService.GetBidsById(id));
    }

    @GetMapping(path = "/bids/item/{id}")
    public ResponseEntity<List<Bid>> GetBidsOfAuction(@PathVariable("id") Long id){
        return ResponseEntity.ok().body(bidService.GetBidsOfAuction(id));
    }


    // POST

    @PostMapping(path = "/bids/save")
    public ResponseEntity<Bid> SaveBid(@RequestBody Bid newBid){
        return ResponseEntity.ok().body(bidService.SaveBid(newBid));
    }


    // DELETE

    @DeleteMapping("/bids/delete/{bidId}")
    public ResponseEntity<?> DeleteBid(@PathVariable("bidId") Long id) {
        bidService.DeleteBid(id);
        return ResponseEntity.ok().build();
    }
}