package com.di.app.bid;

import com.di.app.contact.ContactService;
import com.di.app.item.Item;
import com.di.app.item.ItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class BidService {

    private final BidRepository bidRepository;
    private final ItemRepository itemRepository;
    private final ContactService contactService;


    public Optional<Bid> GetBidsById(Long id) {
        return bidRepository.findById(id);
    }

    public List<Bid> GetBidsOfAuction(Long id) {
       return bidRepository.getBidsAuction(id);
    }

    public Bid SaveBid(Bid newBid) {

        // Increment bid count
        Item item = itemRepository.getById(newBid.getItemId());

        item.setCurrentBid(newBid.getAmount());

        Integer bidCount = item.getBidCount() + 1;
        item.setBidCount(bidCount);

        // For contacts
        Bidder bidder = newBid.getBidder();
        String peerUser = bidder.getUsername();
        Long sellerId = item.getSellerId();

        contactService.AddContact(sellerId,peerUser);


        return bidRepository.save(newBid);
    }

    public void DeleteBid(Long id) {
        Bid bid = bidRepository.getById(id);
        bidRepository.delete(bid);
    }





}
