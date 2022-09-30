package com.di.app.xml;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.di.app.bid.Bid;
import com.di.app.bid.BidService;
import com.di.app.bid.Bidder;
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
    private List<Bid> bidList = new ArrayList<>();
    private Item item = null;
    private Bidder bidder = null;
    private Bid bid = null;
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
    boolean isBidder = false;
    boolean intoBid = false;
    boolean isTime = false;
    boolean isAmount = false;


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
//            System.out.println(username);

            // Create fake user
            boolean flag = userService.UsernameExists(username);

            if (flag == Boolean.FALSE) {
                User newUser = new User();
                newUser.setUsername(username);
                newUser.setPass("pass");
                newUser.setEmail(username + "@gmail.com");
                newUser.setRealname("XmlUser");
                newUser.setSurname("Seller");

                userService.SaveUser(newUser);
                userService.GiveRole(username, "SELLER");

                item.setSellerId(newUser.getId());
            }
            else {
                item.setSellerId(userService.GetUserByUsername(username).getId());
            }
        }
        else if (qName.equalsIgnoreCase("Location")) {
            String latitude = attributes.getValue("Latitude");
            String longitude = attributes.getValue("Longitude");

            item.setLatitude(latitude);
            item.setLongitude(longitude);
            isLocation=true;
        }

        else if (qName.equalsIgnoreCase("Bidder")){
            String rating = attributes.getValue("Rating");
            String bidderUsername = attributes.getValue("UserID");

            // Create fake bidder
            boolean flag = userService.UsernameExists(bidderUsername);
            Long id;

            if (flag == Boolean.FALSE) {
                User newUser = new User();
                newUser.setUsername(bidderUsername);
                newUser.setPass("pass");
                newUser.setEmail(bidderUsername + "@gmail.com");
                newUser.setRealname("XmlUser");
                newUser.setSurname("Bidder");

                userService.SaveUser(newUser);
                userService.GiveRole(bidderUsername, "BIDDER");

                id = newUser.getId();
            }
            else{
                id = userService.GetUserByUsername(bidderUsername).getId();
            }

            bidder = new Bidder();
            bidder.setRating(rating);
            bidder.setUserId(id);
            bidder.setUsername(bidderUsername);
            bidder.setRealname("Bidder");
            bidder.setSurname("Xml");


            // Create bid
            bid = new Bid();

            intoBid = true;
            isBidder = true;

        } else if (qName.equalsIgnoreCase("Time")){
            isTime = true;
        } else if (qName.equalsIgnoreCase("Amount")){
            isAmount = true;
        } else if (qName.equalsIgnoreCase("Category")){
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
            currentBid = currentBid.replace(",", "");

            Integer res = (int)Double.parseDouble(currentBid.substring(1));
//            System.out.println(res);
            item.setCurrentBid(res);
            isCurrently = false;
        }
        else if(isFirst_Bid){
            // Get rid of $
            String firstBid = data.toString();
            firstBid = firstBid.replace(",", "");

            Integer res = (int)Double.parseDouble(firstBid.substring(1));
            item.setFirstBid(String.valueOf(res));
            isFirst_Bid = false;
        }
        else if(isNumber_of_Bids) {
            item.setBidCount(Integer.parseInt(data.toString()));
            isNumber_of_Bids = false;
        }
        else if(isCountry){
            if(intoBid){
//                System.out.println("Country "+data.toString());
                bidder.setCountry(data.toString());
            }
            else{
                item.setCountry(data.toString());
            }
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

        }
        else if (isBidder){
            bidder.setLocation(data.toString());

            isBidder = false;
        }else if(isTime){
            SimpleDateFormat formatter = new SimpleDateFormat("MMM-dd-yy hh:mm:ss");
            Date date = null;
            try {
                date = formatter.parse(data.toString());
            } catch (ParseException e) {
                e.printStackTrace();
            }

            bid.setTime(date);
            isTime = false;
        }
        else if(isAmount){
            String amount = data.toString();
            amount = amount.replace(",", "");

            Integer res = (int)Double.parseDouble(amount.substring(1));
            bid.setAmount(res);

            intoBid = false;
            isAmount = false;

            bid.setBidder(bidder);
            // update bids
            bidList.add(bid);
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

            if(bid != null) {
                for (Bid i : bidList) {
                    i.setItemId(id);
                    bidService.SaveXmlBid(i);
//                    System.out.println("Bid: " + i);
                }
                bidList.clear();
            }

//            bid = null;
        }
    }

    @Override
    public void characters(char ch[], int start, int length) throws SAXException {
        data.append(new String(ch, start, length));
    }

}
