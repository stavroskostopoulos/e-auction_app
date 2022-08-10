package com.di.app.bid;

import com.di.app.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


@Repository
public interface BidRepository extends JpaRepository<Bid, Long> {

    @Query(value = "SELECT 1 FROM bidder b WHERE b.user_id = :cid",
            nativeQuery = true)
    Integer checkBidder(@Param("cid")Long cid);

    @Query(value = "SELECT * FROM bidder b WHERE b.user_id = :cid",
            nativeQuery = true)
    Bidder getBidder(@Param("cid")Long cid);
}
