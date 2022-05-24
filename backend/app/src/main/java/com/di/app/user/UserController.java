package com.di.app.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//@RequestMapping(path = "api/users")
@RestController
public class UserController {

    private final UserService service;

    @Autowired
    public UserController(UserService service) {
        this.service = service;
    }

    @GetMapping(path = "api/users")
    public List<User> GetUsers(){
        return service.GetUsers();
    }

    @PostMapping(path = "api/users")
    public void RegisterUser(@RequestBody User newUser){
        service.SaveUser(newUser);
    }

}


