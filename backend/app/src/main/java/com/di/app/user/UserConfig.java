package com.di.app.user;

import com.di.app.item.Item;
import com.di.app.item.ItemService;
import com.di.app.role.Role;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.ArrayList;

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
                    new ArrayList<>()
            ));

            userService.GiveRole("kapphs", "SELLER");
            userService.GiveRole("kapphs", "BIDDER");
            userService.GiveRole("nota", "ADMIN");
            userService.GiveRole("guest", "GUEST");
            userService.GiveRole("guest", "NOT_ACCEPTED");



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
                    new ArrayList<>(),
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
                    new ArrayList<>(),
                    new ArrayList<>()
            ));

        };
    }

}
