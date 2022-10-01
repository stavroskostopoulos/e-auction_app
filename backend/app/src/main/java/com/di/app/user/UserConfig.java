package com.di.app.user;

import com.di.app.bid.BidService;
import com.di.app.item.Item;
import com.di.app.item.ItemService;
import com.di.app.Recommendations.RecommendationsService;
import com.di.app.role.Role;
import com.di.app.xml.SaxHandler;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.xml.sax.SAXException;

import javax.xml.parsers.*;
import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

@Configuration
public class UserConfig {
    private final ItemService itemService;
    private final UserService userService;
    private final BidService bidService;
    private final RecommendationsService recommendationsService;


    public UserConfig(ItemService itemService, UserService userService, BidService bidService, RecommendationsService recommendationsService) {
        this.itemService = itemService;
        this.userService = userService;
        this.bidService = bidService;
        this.recommendationsService = recommendationsService;
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
                    "1234",
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
                    "kostopez",
                    "1234",
                    "kostopez@gmail.com",
                    "Stavros",
                    "Kostopoulos",
                    "6988772829",
                    "23323",
                    "25",
                    "17",
                    new ArrayList<>()

            ));

            userService.SaveUser(new User(null,
                    "vaspio",
                    "1234",
                    "vaspio@gmail.com",
                    "Vasilis",
                    "Pasios",
                    "6988772829",
                    "23323",
                    "4",
                    "54",
                    new ArrayList<>()

            ));

            userService.SaveUser(new User(null,
                    "nota",
                    "1234",
                    "nota@gmail.com",
                    "Noths",
                    "Stamatopoulos",
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

            userService.GiveRole("kostopez", "BIDDER");
            userService.GiveRole("vaspio", "SELLER");

            userService.GiveRole("nota", "ADMIN");
            userService.GiveRole("guest", "GUEST");


            SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");

            itemService.SaveItem(new Item(1L,
                    1L,
                    3,
                    "Product 1",
                    "400",
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
                    "20",
                    20,
                    1,
                    3,
                    formatter.parse("2022-09-23"),
                    formatter.parse("2022-10-10"),
                    "12",
                    "3",
                    "Greece",
                    new ArrayList<>()
            ));

            itemService.AddCategory(1L, "Electronics");

            itemService.SaveItem(new Item(2L,
                    3L,
                    4,
                    "Product 2",
                    "400",
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
                    "5",
                    5,
                    1,
                    3,
                    formatter.parse("2022-10-10"),
                    formatter.parse("2022-10-20"),
                    "56",
                    "10",
                    "Greece",
                    new ArrayList<>()
            ));

            itemService.AddCategory(2L, "Fashion");

            itemService.SaveItem(new Item(3L,
                    4L,
                    4,
                    "Product 3",
                    "400",
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
                    "200",
                    200,
                    1,
                    0,
                    formatter.parse("2022-09-13"),
                    formatter.parse("2022-10-01"),
                    "20",
                    "14",
                    "Greece",
                    new ArrayList<>()
            ));

            itemService.AddCategory(3L, "Used");

            itemService.SaveItem(new Item(4L,
                    3L,
                    4,
                    "Product 4",
                    "400",
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
                    "100",
                    100,
                    1,
                    2,
                    formatter.parse("2022-09-20"),
                    formatter.parse("2022-10-05"),
                    "22",
                    "34",
                    "Greece",
                    new ArrayList<>()
            ));

            itemService.AddCategory(4L, "Used");

            itemService.SaveItem(new Item(5L,
                    3L,
                    4,
                    "Product 5",
                    "400",
                    "Barcelona Sporting Club was founded on 1 May 1925 by Eutimio Pérez, a Spanish immigrant who decided to name the club after his home city of Barcelona, Spain. The team was named after Pérez's return to Ecuador, and BSC's Barça-like crest was adopted later on.",
                    "40",
                    40,
                    1,
                    2,
                    formatter.parse("2022-04-23"),
                    formatter.parse("2022-05-15"),
                    "12",
                    "13",
                    "Greece",
                    new ArrayList<>()
            ));

            itemService.AddCategory(5L, "Fashion");

            itemService.SaveItem(new Item(6L,
                    4L,
                    4,
                    "Product 6",
                    "400",
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
                    "1",
                    1,
                    1,
                    0,
                    formatter.parse("2022-09-23"),
                    formatter.parse("2022-09-28"),
                    "39",
                    "22",
                    "Greece",
                    new ArrayList<>()
            ));

            itemService.AddCategory(6L, "Health&Beauty");

            itemService.SaveItem(new Item(7L,
                    3L,
                    4,
                    "Product 7",
                    "400",
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
                    "10",
                    10,
                    1,
                    3,
                    formatter.parse("2022-09-14"),
                    formatter.parse("2022-09-20"),
                    "56",
                    "10",
                    "Greece",
                    new ArrayList<>()
            ));

            itemService.AddCategory(7L, "Health&Beauty");



            itemService.SaveItem(new Item(8L,
                    8L,
                    4,
                    "Product 8",
                    "400",
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
                    "2",
                    2,
                    1,
                    5,
                    formatter.parse("2022-09-26"),
                    formatter.parse("2022-10-07"),
                    "40",
                    "44",
                    "Greece",
                    new ArrayList<>()
            ));

            itemService.AddCategory(8L, "Health&Beauty");

            ParseXMLFiles();

        };
    }


    public void ParseXMLFiles() throws ParserConfigurationException, SAXException, IOException {
        SAXParserFactory saxParserFactory = SAXParserFactory.newInstance();

        // Sample test
        File dir = new File("backend/app/src/main/resources/static");

        // Load all xml
//        File dir = new File("backend/app/src/main/resources/xml");

        File [] files = dir.listFiles((d, name) -> name.endsWith(".xml"));
        if (files != null) {
            for (File file: files) {
                try {
                    SAXParser saxParser = saxParserFactory.newSAXParser();
                    SaxHandler handler = new SaxHandler(userService,itemService,bidService);
                    System.out.println("handling: " +file.getName());
                    saxParser.parse(file, handler);

                    List<Item> itemList = handler.getEmpList();
                    // print items
                    for (Item i : itemList){
                        System.out.println(i);
                    }
                } catch (ParserConfigurationException | SAXException | IOException e) {
                    e.printStackTrace();
                }
            }
        }
        List<Item> i = bidService.GetBidsOfBidder(5L);
        if (i.isEmpty()){
            System.out.println("Sss");
        }
        recommendationsService.getRecommendations(9L);
//        List<String> l = contactService.GetContacts(9L);
//        System.out.println(l);


    }

}
