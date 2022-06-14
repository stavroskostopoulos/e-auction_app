package com.di.app.bid;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class BidService {

    private final BidRepository bidRepository;


    public Optional<Bid> GetBidsById(Long id) {
        return bidRepository.findById(id);
    }
}
