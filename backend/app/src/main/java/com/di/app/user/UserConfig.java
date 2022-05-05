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
                    1
            );

            User nota = new User(
                    "nota",
                    "nouabfa",
                    "nota@gmail.com",
                    1
            );

            repository.saveAll(
                    List.of(kwstop,nota)
            );

        };
    }
}
