package com.di.app.user;

import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class UserService {

    public List<User> GetUsers(){
        return List.of(
                new User(1L,
                        "kwstop",
                        "nouabfa",
                        "kost@gmail.com",
                        1)
        );
    }
}
