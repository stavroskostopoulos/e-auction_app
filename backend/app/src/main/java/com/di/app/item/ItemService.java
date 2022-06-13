package com.di.app.item;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;


@Service @Transactional
@RequiredArgsConstructor
public class ItemService {

    private final ItemRepository itemRepository;


    public List<Item> GetItems(){
        return itemRepository.findAll();
    }

    public Optional<Item> GetItemById(Long id){
        return itemRepository.findById(id);
    }

    public Page<Item> GetItemsLimit(Pageable pageable) {
        return itemRepository.findAll(pageable);
    }

    public Page<Item> GetItemsByPrice(String slow, String shigh, Pageable pageable){
        Integer low = Integer.parseInt(slow);
        Integer high = Integer.parseInt(shigh);

        return itemRepository.getItemsByPrice(low,high,pageable);
    }

    public Page<Item> GetItemsByLocation(String slat, String slong, Pageable pageable){
        Integer lat = Integer.parseInt(slat);
        Integer lng = Integer.parseInt(slong);

        return itemRepository.getItemsByLocation(lat, lng, pageable);
    }

    public Page<Item> GetItemsByCategory(Category categories, Integer offset){

        List<Item> tempList;
        List<Item> items = new ArrayList<>();
        List<String> list = categories.getCats();


        for (String value : list) {
            tempList = itemRepository.getItemsInCategory(value,offset);
            items.addAll(tempList);
        }

        // Clear duplicates
        Set<Item> set = new HashSet<>(items);
        items.clear();
        items.addAll(set);

        System.out.println(items);

        Page<Item> page = new PageImpl<>(items);

        return page;
    }

    public Item SaveItem(Item newItem) {

        return itemRepository.save(newItem);
    }

    public Item GiveCategories(Category cats) {
        Item item = itemRepository.getById(cats.getItemId());

        item.setCategory(cats.getCats());

        return itemRepository.save(item);
    }


}
