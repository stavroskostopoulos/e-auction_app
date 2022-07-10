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

    @Query( value = "SELECT * FROM item JOIN item_category ON item.item_id = item_category.item_item_id",
            countQuery = "SELECT count(*) FROM item", nativeQuery = true)
    Page<Item> getItemsWithCats(Pageable pageable);

    @Query( value = "SELECT * FROM item WHERE current_bid BETWEEN :low AND :high LIMIT :limit OFFSET :offset", nativeQuery = true)
    List<Item> getItemsByPrice(@Param("low")Integer low, @Param("high")Integer high, @Param("limit")Integer limit, @Param("offset")Integer offset);


    @Query( value = "SELECT * FROM item JOIN item_category ON item.item_id = item_category.item_item_id WHERE (current_bid BETWEEN :low AND :high) AND (category=:cat ) LIMIT :limit OFFSET :offset",
            nativeQuery = true)
    List<Item> getItemsByPriceWithCats(@Param("low")Integer low, @Param("high")Integer high, @Param("cat")String cat, @Param("limit")Integer limit, @Param("offset")Integer offset);

    @Query( value = "Select * from item i where i.item_id IN( " +
            "SELECT item_item_id FROM item_category ic WHERE ic.category=:cat ) LIMIT :limit OFFSET :offset",
            nativeQuery = true)
    List<Item> getItemsInCategory(@Param("cat")String category, @Param("limit")Integer limit, @Param("offset")Integer offset);

    @Query( value = "SELECT * FROM item i WHERE (i.latitude BETWEEN :lat-1000 AND :lat+1000) OR (i.longitude BETWEEN :lng-1000 AND :lng+1000)",
            countQuery = "SELECT count(*) FROM item", nativeQuery = true)
    Page<Item> getItemsByLocation(@Param("lat")Integer lat, @Param("lng")Integer lng, Pageable pageable);



    @Query( value = " SELECT * FROM item i WHERE i.description LIKE :word LIMIT :limit OFFSET :offset", nativeQuery = true)
    List<Item> getItemsBySearch(@Param("word")String word,@Param("limit")Integer limit, @Param("offset")Integer offset);




}