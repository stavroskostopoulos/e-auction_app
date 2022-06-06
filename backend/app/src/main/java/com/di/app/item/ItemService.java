package com.di.app.item;

import com.di.app.user.User;
import com.di.app.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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

    public Item SaveItem(Item newItem) {

        return itemRepository.save(newItem);
    }

    public Item GiveCategories(Category cats) {
        Item item = itemRepository.findByName(cats.getName());

        item.setCategory(cats.getCats());

        return itemRepository.save(item);
    }
}
