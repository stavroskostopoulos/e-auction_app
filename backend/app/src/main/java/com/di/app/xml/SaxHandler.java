package com.di.app.xml;

import java.util.ArrayList;
import java.util.List;

import com.di.app.item.Item;
import org.xml.sax.Attributes;
import org.xml.sax.SAXException;
import org.xml.sax.helpers.DefaultHandler;

public class SaxHandler extends DefaultHandler {
    // List to hold Employees object
    private List<Item> empList = null;
    private Item emp = null;
    private StringBuilder data = null;

    // getter method for employee list
    public List<Item> getEmpList() {
        return empList;
    }

    boolean bAge = false;
    boolean bName = false;
    boolean bGender = false;
    boolean bRole = false;

    @Override
    public void startElement(String uri, String localName, String qName, Attributes attributes) throws SAXException {

        if (qName.equalsIgnoreCase("Item")) {
            // create a new Item and put it in Map
            String id = attributes.getValue("id");
            // initialize Item object and set id attribute
            emp = new Item();
            emp.setItemId(Long.parseLong(id));
            // initialize list
            if (empList == null)
                empList = new ArrayList<>();
        } else if (qName.equalsIgnoreCase("name")) {
            // set boolean values for fields, will be used in setting Item variables
            bName = true;
        } else if (qName.equalsIgnoreCase("age")) {
            bAge = true;
        } else if (qName.equalsIgnoreCase("gender")) {
            bGender = true;
        } else if (qName.equalsIgnoreCase("role")) {
            bRole = true;
        }
        // create the data container
        data = new StringBuilder();
    }

//    @Override
//    public void endElement(String uri, String localName, String qName) throws SAXException {
//        if (bAge) {
//            // age element, set Item age
//            emp.setAge(Integer.parseInt(data.toString()));
//            bAge = false;
//        } else if (bName) {
//            emp.setName(data.toString());
//            bName = false;
//        } else if (bRole) {
//            emp.setRole(data.toString());
//            bRole = false;
//        } else if (bGender) {
//            emp.setGender(data.toString());
//            bGender = false;
//        }
//
//        if (qName.equalsIgnoreCase("Item")) {
//            // add Item object to list
//            empList.add(emp);
//        }
//    }

    @Override
    public void characters(char ch[], int start, int length) throws SAXException {
        data.append(new String(ch, start, length));
    }

}
