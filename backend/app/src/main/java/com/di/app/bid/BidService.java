package com.di.app.bid;

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



    public Optional<Bid> GetBidsById(Long id) {
        return bidRepository.findById(id);
    }

    public List<Bid> GetBidsOfAuction(Long id, Integer offset) {
       return bidRepository.getBidsAuction(id,8,offset);
    }

    public Bid SaveBid(Bid newBid) {

        Item item = itemRepository.getById(newBid.getItemId());

        item.setCurrentBid(newBid.getAmount());

        Integer bidCount = item.getBidCount() + 1;
        item.setBidCount(bidCount);

        return bidRepository.save(newBid);
    }

    public void DeleteBid(Long id) {
        Bid bid = bidRepository.getById(id);
        bidRepository.delete(bid);
    }



}
