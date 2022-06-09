package com.di.app.item;

import lombok.RequiredArgsConstructor;
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

    public List<Item> GetItemsByPrice(String slow, String shigh){
        Integer low = Integer.parseInt(slow);
        Integer high = Integer.parseInt(shigh);

        return itemRepository.getItemsByPrice(low,high);
    }

    public List<Item> GetItemsByLocation(String slat, String slong){
        Integer lat = Integer.parseInt(slat);
        Integer lng = Integer.parseInt(slong);

        return itemRepository.getItemsByLocation(lat, lng);
    }

    public List<Item> GetItemsByCategory(Category categories){

        List<Item> tempList;
        List<Item> items = new ArrayList<>();
        List<String> list = categories.getCats();

        for (String value : list) {
            tempList = itemRepository.getItemsInCategory(value);
            items.addAll(tempList);
        }

        // Clear duplicates
        Set<Item> set = new HashSet<>(items);
        items.clear();
        items.addAll(set);

        return items;
    }

    public Item SaveItem(Item newItem) {

        return itemRepository.save(newItem);
    }

    public Item GiveCategories(Category cats) {
        Item item = itemRepository.findByName(cats.getName());

        item.setCategory(cats.getCats());

        return itemRepository.save(item);
    }
}
