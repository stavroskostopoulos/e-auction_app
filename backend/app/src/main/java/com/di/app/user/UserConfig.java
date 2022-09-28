package com.di.app.user;

import com.di.app.bid.BidService;
import com.di.app.item.Item;
import com.di.app.item.ItemService;
import com.di.app.role.Role;
import com.di.app.xml.SaxHandler;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.xml.sax.SAXException;

import javax.xml.parsers.*;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Configuration
public class UserConfig {
    private final ItemService itemService;
    private final UserService userService;
    private final BidService bidService;


    public UserConfig(ItemService itemService, UserService userService, BidService bidService) {
        this.itemService = itemService;
        this.userService = userService;
        this.bidService = bidService;
    }

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

    @Bean
    public void ParseXMLFiles() throws ParserConfigurationException, SAXException, IOException {
        SAXParserFactory saxParserFactory = SAXParserFactory.newInstance();
        try {
            SAXParser saxParser = saxParserFactory.newSAXParser();
            SaxHandler handler = new SaxHandler(userService,itemService,bidService);
            saxParser.parse(new File("backend/app/src/main/resources/static/items-0.xml"), handler);

            List<Item> empList = handler.getEmpList();
            // print items
            for (Item emp : empList){
                System.out.println(emp);
//                itemService.SaveItem(emp);
            }
        } catch (ParserConfigurationException | SAXException | IOException e) {
            e.printStackTrace();
        }
    }

}
