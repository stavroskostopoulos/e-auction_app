package com.di.app.user;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class UserConfig {

    @Bean
    CommandLineRunner commandLineRunner(UserRepository repository){
        return args-> {
            User kwstop = new User(
                    "kwstop",
                    "nouabfa",
                    "kost@gmail.com",
                    "Stavros",
                    "Kwstop",
                    "9665566",
                    "46546546",
                    1
            );

            User nota = new User(
                    "nota",
                    "nouabfa",
                    "nota@gmail.com",
                    "Noths",
                    "Stam",
                    "6952252",
                    "222222",
                    1
            );

            repository.saveAll(
                    List.of(kwstop,nota)
            );

        };
    }
}
