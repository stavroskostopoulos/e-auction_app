package com.di.app.bid;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface BidRepository extends JpaRepository<Bid, Long> {

    @Query(value = "SELECT 1 FROM bidder b WHERE b.user_id = :cid",
            nativeQuery = true)
    Integer checkBidder(@Param("cid")Long cid);

    @Query(value = "SELECT * FROM bidder b WHERE b.user_id = :cid",
            nativeQuery = true)
    Bidder getBidder(@Param("cid")Long cid);


    @Query(value = "SELECT * FROM bid b WHERE b.item_id = :itemid LIMIT :limit OFFSET :offset", nativeQuery = true)
    List<Bid> getBidsAuction(@Param("itemid")Long itemid, @Param("limit")Integer limit, @Param("offset")Integer offset);
}
