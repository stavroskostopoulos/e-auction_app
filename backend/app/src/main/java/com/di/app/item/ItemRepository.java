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

    //kostopez----------------START-----------------------

    //Pair1
    //PRICE, NO WORD, NO CATEG, NO LOCATION
    @Query( value = "SELECT * FROM item WHERE current_bid BETWEEN :low AND :high LIMIT :limit OFFSET :offset", nativeQuery = true)
    List<Item> getItemsByPrice(@Param("low")Integer low, @Param("high")Integer high, @Param("limit")Integer limit, @Param("offset")Integer offset);
    //PRICE, NO WORD, NO CATEG, LOCATION
    @Query( value = "SELECT * FROM item i WHERE (current_bid BETWEEN :low AND :high) AND (i.latitude BETWEEN :lat-2 AND :lat+2) AND (i.longitude BETWEEN :lng-2 AND :lng+2) LIMIT :limit OFFSET :offset", nativeQuery = true)
    List<Item> getItemsByPriceWithLocation(@Param("low")Integer low, @Param("high")Integer high, @Param("limit")Integer limit, @Param("lng")Integer lng, @Param("lat")Integer lat, @Param("offset")Integer offset);

    //Pair 2
    //PRICE, WORD, NO CATEG, NO LOCATION
    @Query( value = "SELECT * FROM item WHERE (item.description LIKE :word) AND (current_bid BETWEEN :low AND :high) LIMIT :limit OFFSET :offset", nativeQuery = true)
    List<Item> getItemsByPriceWithWordSearch(@Param("low")Integer low, @Param("high")Integer high, @Param("word")String word, @Param("limit")Integer limit, @Param("offset")Integer offset);
    //PRICE, WORD, NO CATEG, LOCATION
    @Query( value = "SELECT * FROM item i WHERE (item.description LIKE :word) AND (current_bid BETWEEN :low AND :high) AND (i.latitude BETWEEN :lat-2 AND :lat+2) AND (i.longitude BETWEEN :lng-2 AND :lng+2) LIMIT :limit OFFSET :offset", nativeQuery = true)
    List<Item> getItemsByPriceWithWordSearchWithLocation(@Param("low")Integer low, @Param("high")Integer high, @Param("word")String word,  @Param("lng")Integer lng, @Param("lat")Integer lat, @Param("limit")Integer limit, @Param("offset")Integer offset);

    //Pair 3
    //PRICE, WORD, CATEG, NO LOCATION
    @Query( value = "SELECT * FROM item JOIN item_category ON item.item_id = item_category.item_item_id WHERE (item.description LIKE :word) AND (current_bid BETWEEN :low AND :high) AND (category=:cat ) LIMIT :limit OFFSET :offset", nativeQuery = true)
    List<Item> getItemsByPriceWithCatsWithWordSearch(@Param("low")Integer low, @Param("high")Integer high, @Param("cat")String cat, @Param("word")String word, @Param("limit")Integer limit, @Param("offset")Integer offset);
    //PRICE, WORD, CATEG, LOCATION
    @Query( value = "SELECT * FROM item i JOIN item_category ON i.item_id = item_category.item_item_id WHERE (item.description LIKE :word) AND (current_bid BETWEEN :low AND :high) AND (category=:cat ) AND (i.latitude BETWEEN :lat-2 AND :lat+2) AND (i.longitude BETWEEN :lng-2 AND :lng+2) LIMIT :limit OFFSET :offset", nativeQuery = true)
    List<Item> getItemsByPriceWithCatsWithWordSearchWithLocation(@Param("low")Integer low, @Param("high")Integer high, @Param("cat")String cat, @Param("word")String word, @Param("lng")Integer lng, @Param("lat")Integer lat, @Param("limit")Integer limit, @Param("offset")Integer offset);

    //Pair 4
    //PRICE, CATEG, NO WORD, NO LOCATION
    @Query( value = "SELECT * FROM item JOIN item_category ON item.item_id = item_category.item_item_id WHERE (current_bid BETWEEN :low AND :high) AND (category=:cat )  LIMIT :limit OFFSET :offset",
            nativeQuery = true)
    List<Item> getItemsByPriceWithCats(@Param("low")Integer low, @Param("high")Integer high, @Param("cat")String cat, @Param("limit")Integer limit, @Param("offset")Integer offset);
    //PRICE, CATEG, NO WORD, LOCATION
    @Query( value = "SELECT * FROM item i JOIN item_category ON i.item_id = item_category.item_item_id WHERE (current_bid BETWEEN :low AND :high) AND (category=:cat ) AND (i.latitude BETWEEN :lat-2 AND :lat+2) AND (i.longitude BETWEEN :lng-2 AND :lng+2)  LIMIT :limit OFFSET :offset",
            nativeQuery = true)
    List<Item> getItemsByPriceWithCatsWithLocation(@Param("low")Integer low, @Param("high")Integer high, @Param("cat")String cat, @Param("lng")Integer lng, @Param("lat")Integer lat, @Param("limit")Integer limit, @Param("offset")Integer offset);


    //kostopez----------------END-------------------------


    @Query( value = "Select * from item i where i.item_id IN( " +
            "SELECT item_item_id FROM item_category ic WHERE ic.category=:cat ) LIMIT :limit OFFSET :offset",
            nativeQuery = true)
    List<Item> getItemsInCategory(@Param("cat")String category, @Param("limit")Integer limit, @Param("offset")Integer offset);

    //latitude 10km
    @Query( value = "SELECT * FROM item i WHERE (i.latitude BETWEEN :lat-0.0001 AND :lat+0.0001) AND (i.longitude BETWEEN :lng-0.0001 AND :lng+0.0001) LIMIT :limit OFFSET :offset",
            nativeQuery = true)
    List<Item> getItemsByLocation(@Param("lat")Integer lat, @Param("lng")Integer lng, @Param("limit")Integer limit, @Param("offset")Integer offset);

    @Query( value = "SELECT * FROM item JOIN item_category ON item.item_id = item_category.item_item_id WHERE (latitude BETWEEN :lat-100 AND :lat+100) AND (longitude BETWEEN :lng-100 AND :lng+100) AND (category=:cat ) LIMIT :limit OFFSET :offset",
            nativeQuery = true)
    List<Item> getItemsByLocationWithCats(@Param("lat")Integer lat, @Param("lng")Integer lng, @Param("cat")String cat, @Param("limit")Integer limit, @Param("offset")Integer offset);

    @Query( value = " SELECT * FROM item i WHERE i.description LIKE :word LIMIT :limit OFFSET :offset", nativeQuery = true)
    List<Item> getItemsBySearch(@Param("word")String word,@Param("limit")Integer limit, @Param("offset")Integer offset);


}