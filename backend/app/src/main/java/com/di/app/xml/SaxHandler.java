package com.di.app.xml;

import java.util.ArrayList;
import java.util.List;

import com.di.app.item.Item;
import org.xml.sax.Attributes;
import org.xml.sax.SAXException;
import org.xml.sax.helpers.DefaultHandler;

public class SaxHandler extends DefaultHandler {
    // List to hold Items
    private List<Item> itemList = null;
    private Item item = null;
    private StringBuilder data = null;

    public List<Item> getEmpList() {
        return itemList;
    }

    boolean bAge = false;
    boolean bName = false;
    boolean bGender = false;
    boolean bRole = false;

    @Override
    public void startElement(String uri, String localName, String qName, Attributes attributes) throws SAXException {

        if (qName.equalsIgnoreCase("Item")) {
            String itemId = attributes.getValue("ItemID");

            item = new Item();
            item.setItemId(Long.parseLong(itemId));

            if (itemList == null) {
                itemList = new ArrayList<>();
            }

        } else if(qName.equalsIgnoreCase("Seller")){
            String rating = attributes.getValue("Rating");
            String userId = attributes.getValue("UserID");

            item.setSellerRating(Integer.parseInt(rating));




        }
        else if (qName.equalsIgnoreCase("Name")) {
            // set boolean values for fields, will be used in setting Item variables
            bName = true;
        } else if (qName.equalsIgnoreCase("Number_of_Bids")) {
            bAge = true;
        } else if (qName.equalsIgnoreCase("Description")) {
            bGender = true;
        }
        // create the data container
        data = new StringBuilder();
    }

    @Override
    public void endElement(String uri, String localName, String qName) throws SAXException {
        if (bAge) {
            // age element, set Item age
            item.setBidCount(Integer.parseInt(data.toString()));
            bAge = false;
        } else if (bName) {
            item.setName(data.toString());
            bName = false;
        }
//        else if (bRole) {
//            item.setRole(data.toString());
//            bRole = false;
//        } else if (bGender) {
//            item.setGender(data.toString());
//            bGender = false;
//        }

        if (qName.equalsIgnoreCase("Item")) {
            // add Item object to list
            itemList.add(item);
        }
    }

    @Override
    public void characters(char ch[], int start, int length) throws SAXException {
        data.append(new String(ch, start, length));
    }

}
