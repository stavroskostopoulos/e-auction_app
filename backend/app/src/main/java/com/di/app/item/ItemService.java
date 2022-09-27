package com.di.app.item;

import com.di.app.contact.Contact;
import com.di.app.contact.ContactRepository;
import com.di.app.user.User;
import lombok.RequiredArgsConstructor;
import org.json.JSONException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.json.JSONObject;
import org.springframework.data.domain.PageRequest;

import javax.transaction.Transactional;
import java.util.*;


@Service @Transactional
@RequiredArgsConstructor
public class ItemService {

    private final ItemRepository itemRepository;
    private final ContactRepository contactRepository;


    public List<Item> GetItems(){
        return itemRepository.findAll();
    }

    public Optional<Item> GetItemById(Long id){
        return itemRepository.findById(id);
    }

    public Page<Item> GetItemsLimit(Pageable pageable) {
        return itemRepository.findAll(pageable);
    }

    public Page<Item> GetItemsWithCats(Pageable pageable){
        return itemRepository.getItemsWithCats(pageable);
    }

    public Page<Item> GetItemsByPrice(String slow, String shigh, String cats, Integer offset){

        // To store data from different queries
        List<Item> tempList;
        List<Item> items = new ArrayList<>();

        // Create an array fo the categories
        String categories = cats.replace("[", "").replace("]", "");
        String[] categoriesArray = categories.split(",");
        String[] emptyarr = {""};

        // Set price parameters
        Integer low = Integer.parseInt(slow);
        Integer high = Integer.parseInt(shigh);

        // Set the number of the items returned
        Integer limit = 8;

        // If no categories list was given, then search for all categories
        if(Arrays.equals(categoriesArray, emptyarr)) {

            tempList = itemRepository.getItemsByPrice(low, high, limit, offset);

            items.addAll(tempList);

        }
        else{
            for (String a:categoriesArray){
                //System.out.println(a);

                tempList = itemRepository.getItemsByPriceWithCats(low, high, a.replaceAll("\\s",""), limit, offset);
                items.addAll(tempList);
            }
        }


        // Clear duplicates
        Set<Item> set = new HashSet<>(items);
        items.clear();
        items.addAll(set);

//        System.out.println("return "+items);

        Page<Item> page = new PageImpl<>(items);

        return page;
    }


    public Page<Item> GetItemsByLocation(String slat, String slong, String cats, Integer offset){
        Integer lat = Integer.parseInt(slat);
        Integer lng = Integer.parseInt(slong);


        List<Item> tempList;
        List<Item> items = new ArrayList<>();
        String[] emptyarr = {""};

        // Create an array fo the categories
        String categories = cats.replace("[", "").replace("]", "");
        String[] categoriesArray = categories.split(",");

        Integer limit = 8;

        // If no categories list was given, then search for all categories
        if(Arrays.equals(categoriesArray, emptyarr)) {

            tempList = itemRepository.getItemsByLocation(lat, lng, limit, limit*offset);

            items.addAll(tempList);
        }
        else{
            for (String a:categoriesArray){
                //System.out.println(a);

                tempList = itemRepository.getItemsByLocationWithCats(lat, lng, a.replaceAll("\\s",""), limit, limit*offset);
                items.addAll(tempList);
            }
        }


        // Clear duplicates
        //Set<Item> set = new HashSet<>(items);
        //items.clear();
        //items.addAll(set);

        System.out.println("return "+items);

        Page<Item> page = new PageImpl<>(items);

        return page;
    }

    public Page<Item> GetItemsByCategory(Category categories, Integer offset){

        List<Item> tempList;
        List<Item> items = new ArrayList<>();
        List<String> list = categories.getCats();

        // Set the number of the items returned
        Integer limit = 8;

        for (String value : list) {
            tempList = itemRepository.getItemsInCategory(value, limit, offset*limit);
            items.addAll(tempList);
        }


        System.out.println(items);

        Page<Item> page = new PageImpl<>(items);

        return page;
    }


    public Page<Item> GetItemsBySearch(String word, Integer offset){

        try {

            JSONObject obj = new JSONObject(word);
            word = obj.getString("word");

            char add = '%';
            word = add + word + add;

            //System.out.println(word);
        }
        catch (JSONException e){
            System.out.println("Json Parse error(Word search)");
        }

        Integer limit = 8;

        List<Item>items = itemRepository.getItemsBySearch(word, limit, offset*limit);

        Page<Item> page = new PageImpl<>(items);
        return page;

    }



    public Item SaveItem(Item newItem) {
//        contactRepository.save(new Contact(newItem.getSellerId(),new ArrayList<>()));

        return itemRepository.save(newItem);
    }

    public Item GiveCategories(Category cats) {
        Item item = itemRepository.getById(cats.getItemId());

        item.setCategory(cats.getCats());

        return itemRepository.save(item);
    }

    public void DeleteItem(Long id) {
        Item item = itemRepository.getById(id);
        itemRepository.delete(item);
    }

    //kostopez
    public Page<Item> KostopezFilters(String slow, String shigh, String cats, String word, String longitude, String lat, Integer offset){

        // To store data from different queries
        List<Item> tempList;
        List<Item> items = new ArrayList<>();

        // Create an array fo the categories
        String categories = cats.replace("[", "").replace("]", "");
        String[] categoriesArray = categories.split(",");
        String[] emptyarr = {""};

        // Set price parameters
        Integer low = Integer.parseInt(slow);
        Integer high = Integer.parseInt(shigh);

        // Set the number of the items returned
        Integer limit = 8;
        Integer categ_limit = limit;

        if(word.isEmpty()){ //if there is NOT a word search | NO WORD

            // If no categories list was given, then search for all categories | NO WORD, NO CATEG
            if(Arrays.equals(categoriesArray, emptyarr)) {

                //if no location parameter was passed
                if(longitude==null && lat==null){
                    //PRICE, NO WORD, NO CATEG, NO LOCATION
                    tempList = itemRepository.getItemsByPrice(low, high, limit, offset*limit);

                    items.addAll(tempList);
                }else{
                    //PRICE, NO WORD, NO CATEG, LOCATION
                    tempList = itemRepository.getItemsByPriceWithLocation(low, high, limit, Integer.parseInt(longitude), Integer.parseInt(lat), offset*limit);

                    items.addAll(tempList);
                }


            }
            else{ //NO WORD, CATEG
                for (String a:categoriesArray){
                    //System.out.println(a);

                    if(limit - items.size() > 0){
                        categ_limit = limit - items.size();
                    }else{
                        break;
                    }

                    //if no location parameter was passed
                    if(longitude==null && lat==null) {
                        //PRICE, CATEG, NO WORD, NO LOCATION
                        tempList = itemRepository.getItemsByPriceWithCats(low, high, a.replaceAll("\\s",""), categ_limit, offset*limit);
                    }else{
                        //PRICE, CATEG, NO WORD, LOCATION
                        tempList = itemRepository.getItemsByPriceWithCatsWithLocation(low, high, a.replaceAll("\\s",""), Integer.parseInt(longitude), Integer.parseInt(lat), categ_limit, offset*limit);
                    }

                    items.addAll(tempList);
                }
            }

        }else{ //if there is a word search | WORD


                char add = '%';
                word = add + word + add;

                //System.out.println(word);


            // If no categories list was given, then search for all categories | WORD, NO CATEG
            if(Arrays.equals(categoriesArray, emptyarr)) {

                //if no location parameter was passed
                if(longitude==null && lat==null){
                    //PRICE, WORD, NO CATEG, NO LOCATION
                    tempList = itemRepository.getItemsByPriceWithWordSearch(low, high, word, limit, offset*limit);

                    items.addAll(tempList);
                }else{
                    //PRICE, WORD, NO CATEG, LOCATION
                    tempList = itemRepository.getItemsByPriceWithWordSearchWithLocation(low, high, word, Integer.parseInt(longitude), Integer.parseInt(lat), limit, offset*limit);

                    items.addAll(tempList);
                }


            }
            else{ //CATEG
                for (String a:categoriesArray){
                    //System.out.println(a);

                    if(limit - items.size() > 0){
                        categ_limit = limit - items.size();
                    }else{
                        break;
                    }

                    //if no location parameter was passed
                    if(longitude==null && lat==null){
                        //PRICE, WORD, CATEG, NO LOCATION
                        tempList = itemRepository.getItemsByPriceWithCatsWithWordSearch(low, high, a.replaceAll("\\s",""), word, limit, offset*limit);
                    }else{
                        //PRICE, WORD, CATEG, LOCATION
                        tempList = itemRepository.getItemsByPriceWithCatsWithWordSearchWithLocation(low, high, a.replaceAll("\\s",""), word, Integer.parseInt(longitude), Integer.parseInt(lat), limit, offset*limit);
                    }

                    items.addAll(tempList);
                }
            }
        }


        // Clear duplicates
        Set<Item> set = new HashSet<>(items);
        items.clear();
        items.addAll(set);

        Page<Item> page = new PageImpl<>(items);

        return page;

    }

}
