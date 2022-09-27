package com.di.app.user;

import com.di.app.item.Item;
import com.di.app.item.ItemService;
import com.di.app.role.Role;
import com.fasterxml.jackson.dataformat.xml.XmlMapper;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.stream.XMLInputFactory;
import javax.xml.stream.XMLStreamException;
import javax.xml.stream.XMLStreamReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Configuration
public class UserConfig {

    @Bean
    CommandLineRunner run(UserService userService, ItemService itemService){
        return args -> {
            userService.SaveRole(new Role(null, "ADMIN"));
            userService.SaveRole(new Role(null, "SELLER"));
            userService.SaveRole(new Role(null, "BIDDER"));
            userService.SaveRole(new Role(null, "GUEST"));
            userService.SaveRole(new Role(null, "NOT_ACCEPTED"));

            userService.SaveUser(new User(null,
                    "kapphs",
                    "kwdikos",
                    "sss@gmail.com",
                    "Kwstas",
                    "Kopos",
                    "6988772829",
                    "23323",
                    "35",
                    "17",
                    new ArrayList<>()

            ));

            userService.SaveUser(new User(null,
                    "nota",
                    "kk",
                    "nota@gmail.com",
                    "Noths",
                    "Stam",
                    "6952252",
                    "222222",
                    "35",
                    "8",
                    new ArrayList<>()
            ));

            userService.SaveUser(new User(null,
                    "guest",
                    "null",
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    new ArrayList<>()
            ));

            userService.GiveRole("kapphs", "SELLER");
            userService.GiveRole("kapphs", "BIDDER");
            userService.GiveRole("nota", "ADMIN");
            userService.GiveRole("guest", "GUEST");



            itemService.SaveItem(new Item(null,
                    2L,
                    3,
                    "Geforce 1080 Ti",
                    "400",
                    "Κάρτα γραφικών",
                    null,
                    20,
                    0,
                    3,
                    null,
                    null,
                    "lat",
                    "long",
                    "Greece",
                    new ArrayList<>()
            ));

            itemService.SaveItem(new Item(null,
                    3L,
                    4,
                    "Roar R100WD",
                    "400",
                    "Ενσύρματο Gamepad για Android/PC/PS3 Μαύρο",
                    null,
                    5,
                    0,
                    2,
                    null,
                    null,
                    "lat",
                    "long",
                    "Greece",
                    new ArrayList<>()
            ));

        };
    }

//    @Bean
//    public void xmlparser() throws ParserConfigurationException, IOException, SAXException {
//        //Get Document Builder
//        DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
//        DocumentBuilder builder = factory.newDocumentBuilder();
//
//        // Load the input XML document, parse it and return an instance of the
//        // Document class.
//        File file = new File("backend/app/src/main/resources/static/items-0.xml");
//        Document document = builder.parse(file);
//
//        List<Item> employees = new ArrayList<Item>();
//        NodeList nodeList = document.getDocumentElement().getChildNodes();
//        System.out.println(file);
//        for (int i = 0; i < nodeList.getLength(); i++) {
//            Node node = nodeList.item(i);
//            System.out.println(node);
////
//            if (node.getNodeType() == Node.ELEMENT_NODE) {
//                Element elem = (Element) node;
//
//                // Get the value of the ID attribute.
//                String name = node.getAttributes().getNamedItem("Name").getNodeValue();
//
//                System.out.println(name);
//
//                // Get the value of all sub-elements.
////                String firstname = elem.getElementsByTagName("Firstname")
////                        .item(0).getChildNodes().item(0).getNodeValue();
////
////                String lastname = elem.getElementsByTagName("Lastname").item(0)
////                        .getChildNodes().item(0).getNodeValue();
////
////                Integer age = Integer.parseInt(elem.getElementsByTagName("Age")
////                        .item(0).getChildNodes().item(0).getNodeValue());
////
////                Double salary = Double.parseDouble(elem.getElementsByTagName("Salary")
////                        .item(0).getChildNodes().item(0).getNodeValue());
//
////                employees.add(new Item(ID, firstname, lastname, age, salary));
//            }
//        }
//
//        // Print all employees.
////        for (Item empl: employees)
////            System.out.println(empl.toString());
//    }
//
//
////    @Bean
//	public void ParseXMLFiles() throws IOException, XMLStreamException {
////		ObjectMapper xmlMapper = new XmlMapper();
////
////		File file =
//
////		System.out.println(item);
//		XMLInputFactory f = XMLInputFactory.newFactory();
//		File inputFile = new File("backend/app/src/main/resources/static/items-0.xml");;
//		XMLStreamReader sr = f.createXMLStreamReader(new FileInputStream(inputFile));
//
//		XmlMapper mapper = new XmlMapper();
//		sr.next(); // to point to <root>
//		sr.next(); // to point to root-element under root
//		Item value1 = mapper.readValue(sr, Item.class);
//// sr now points to matching END_ELEMENT, so move forward
////		sr.next(); // should verify it's either closing root or new start, left as exercise
////		Item value = mapper.readValue(sr, Item.class);
////// and more, as needed, then
////		sr.close();
//	}

}
