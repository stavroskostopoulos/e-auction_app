package com.di.app.xml;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Locale;

import com.di.app.bid.BidService;
import com.di.app.item.Item;
import com.di.app.item.ItemService;
import com.di.app.user.User;
import com.di.app.user.UserService;
import org.xml.sax.Attributes;
import org.xml.sax.SAXException;
import org.xml.sax.helpers.DefaultHandler;

public class SaxHandler extends DefaultHandler {
    private final UserService userService;
    private final ItemService itemService;
    private final BidService bidService;

    // List to hold Items
    private List<Item> itemList = null;
    private List<String> catList = new ArrayList<>();
    private Item item = null;
    private StringBuilder data = null;


    boolean isCurrently = false;
    boolean isName = false;
    boolean isFirst_Bid = false;
    boolean isNumber_of_Bids = false;
    boolean isLocation = false;
    boolean isStarted = false;
    boolean isEnds = false;
    boolean isDescription = false;
    boolean isCountry = false;
    boolean isCategory = false;
    boolean isBids = false;
    boolean isBid = false;
    boolean isBidder = false;
    boolean isBidLoc = false;


    public SaxHandler(UserService userService, ItemService itemService, BidService bidService) {
        this.itemService = itemService;
        this.userService = userService;
        this.bidService = bidService;
    }

    public List<Item> getEmpList() {
        return itemList;
    }

    @Override
    public void startElement(String uri, String localName, String qName, Attributes attributes) throws SAXException {

        if (qName.equalsIgnoreCase("Item")) {
            String itemId = attributes.getValue("ItemID");

            item = new Item();
//            item.setItemId(Long.parseLong(itemId));

            if (itemList == null) {
                itemList = new ArrayList<>();
            }

        } else if(qName.equalsIgnoreCase("Seller")) {
            String rating = attributes.getValue("Rating");
            String username = attributes.getValue("UserID");

            item.setSellerRating(Integer.parseInt(rating));

            // Create fake user
            boolean flag = userService.UsernameExists(username);

            if (flag == Boolean.FALSE) {
                User newUser = new User();
                newUser.setUsername(username);
                newUser.setPass("pass");
                newUser.setEmail(username + "@gmail.com");

                userService.SaveUser(newUser);
                userService.GiveRole(username, "SELLER");

            }
        }
        else if (qName.equalsIgnoreCase("Location")) {
            String latitude = attributes.getValue("Latitude");
            String longitude = attributes.getValue("Longitude");

            item.setLatitude(latitude);
            item.setLongitude(longitude);
            isLocation=true;
        }
        else if (qName.equalsIgnoreCase("Bids")){
//            String latitude = attributes.getLength("Bid");
//            System.out.println(latitude);
//            System.out.println("bids");
//            for(int i = 0; i < attributes.getLength(); i++) {
//                System.out.println(attributes.getQName(i)+" "+attributes.getValue(i)+" "+i);
//            }
            isBids = true;

        }
        else if (qName.equalsIgnoreCase("Bid")){
//            String latitude = attributes.getLength("Bid");
//            System.out.println(latitude);
//            System.out.println("mphka");
//            for(int i = 0; i < attributes.getLength(); i++) {
//                System.out.println(attributes.getQName(i)+" "+attributes.getValue(i)+" "+i);
//            }
            isBid = true;

        }
        else if (qName.equalsIgnoreCase("Bidder")){
            String rating = attributes.getValue("Rating");
            String bidderId = attributes.getValue("UserID");
            attributes.getQName(1);
            System.out.println(rating+" "+bidderId+ " "+attributes.getQName(2));
            if (qName.equalsIgnoreCase("Location")){
//                String loc = attributes.getValue("Location");
//                System.out.println(loc);
                isBidLoc = true;
            }
//            for(int i = 0; i < attributes.getLength(); i++) {
//                System.out.println(attributes.getQName(i)+" "+attributes.getValue(i)+" "+i);
//            }
            isBidder = true;

        } else if (qName.equalsIgnoreCase("Location")){
//                String loc = attributes.getValue("Location");
//                System.out.println(loc);
            isBidLoc = true;
        }
        else if (qName.equalsIgnoreCase("Category")){
            isCategory = true;
        } else if (qName.equalsIgnoreCase("Name")) {
            isName = true;
        } else if (qName.equalsIgnoreCase("Currently")) {
            isCurrently = true;
        } else if (qName.equalsIgnoreCase("First_Bid")) {
            isFirst_Bid = true;
        } else if (qName.equalsIgnoreCase("Number_of_Bids")) {
            isNumber_of_Bids = true;
        } else if (qName.equalsIgnoreCase("Country")) {
            isCountry = true;
        } else if (qName.equalsIgnoreCase("Started")) {
            isStarted = true;
        } else if (qName.equalsIgnoreCase("Ends")) {
            isEnds = true;
        } else if (qName.equalsIgnoreCase("Description")) {
            isDescription = true;
        }

        // create the data container
        data = new StringBuilder();
    }

    @Override
    public void endElement(String uri, String localName, String qName) throws SAXException {

        if(isName) {
            item.setName(data.toString());
            isName = false;
        }
        else if(isCurrently){
            String currentBid = data.toString();
            Integer res = (int)Double.parseDouble(currentBid.substring(1));
            item.setCurrentBid(res);
            isCurrently = false;
        }
        else if(isFirst_Bid){
            // Get rid of $
            String firstBid = data.toString();
            Integer res = (int)Double.parseDouble(firstBid.substring(1));
            item.setFirstBid(String.valueOf(res));
            isFirst_Bid = false;
        }
        else if(isNumber_of_Bids) {
            item.setBidCount(Integer.parseInt(data.toString()));
            isNumber_of_Bids = false;
        }
        else if(isCountry){
            item.setCountry(data.toString());
            isCountry = false;
        }
        else if(isStarted){
            // Fix the format
            SimpleDateFormat formatter = new SimpleDateFormat("MMM-dd-yy hh:mm:ss");
            Date date = null;
            try {
                date = formatter.parse(data.toString());
            } catch (ParseException e) {
                e.printStackTrace();
            }
            item.setStart(date);
            isStarted = false;
        }
        else if(isEnds){
            SimpleDateFormat formatter = new SimpleDateFormat("MMM-dd-yy hh:mm:ss");
            Date date = null;
            try {
                date = formatter.parse(data.toString());
            } catch (ParseException e) {
                e.printStackTrace();
            }
            item.setEnd(date);
            isEnds = false;
        }
        else if(isDescription){
            item.setDescription(data.toString());
            isDescription = false;
        }
        else if(isCategory){
            catList.add(data.toString());
            isCategory = false;

        } else if (isBids){
//            System.out.println(data.toString());

            isBids = false;
        }
        else if (isBid){
//            System.out.println(data.toString());

            isBid = false;
        }
        else if (isBidder){
//            System.out.println(data.toString());
            if(isBidLoc){

                System.out.println("bidloc "+data.toString());
            }

            isBidder = false;
        }else if(isLocation){
            System.out.println("Location:"+data.toString());
            isLocation = false;
        }


        if (qName.equalsIgnoreCase("Item")) {
            // Add Item object to list
            itemService.SaveItem(item);
            itemList.add(item);


            // Add the categories
            Long id = item.getItemId();
            if(catList != null){
                for (String category : catList) {
                    itemService.AddCategory(id, category);
                }
                catList.clear();
            }

        }
    }

    @Override
    public void characters(char ch[], int start, int length) throws SAXException {
        data.append(new String(ch, start, length));
    }

}
