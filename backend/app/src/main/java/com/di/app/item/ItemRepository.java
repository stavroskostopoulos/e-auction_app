package com.di.app.item;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {
    Item findByName(String name);



    @Query( value = "SELECT * FROM item WHERE current_bid BETWEEN :low AND :high ORDER BY current_bid",
            countQuery = "SELECT count(*) FROM item", nativeQuery = true)
    Page<Item> getItemsByPrice(@Param("low")Integer low, @Param("high")Integer high, Pageable pageable);

    @Query( value = "Select * from item i where i.item_id IN( " +
            "SELECT item_item_id FROM item_category ic WHERE ic.category=:cat ) LIMIT 8 OFFSET :offset",
            nativeQuery = true)
    List<Item> getItemsInCategory(@Param("cat")String category, @Param("offset")Integer offset);

    @Query( value = "SELECT * FROM item i WHERE (i.latitude BETWEEN :lat-1000 AND :lat+1000) OR (i.longitude BETWEEN :lng-1000 AND :lng+1000)",
            countQuery = "SELECT count(*) FROM item", nativeQuery = true)
    Page<Item> getItemsByLocation(@Param("lat")Integer lat, @Param("lng")Integer lng, Pageable pageable);




}