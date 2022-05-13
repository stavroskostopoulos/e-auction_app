package com.di.app.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//@RequestMapping(path = "api/users");
@RestController
public class UserController {

    private final UserService service;

    @Autowired
    public UserController(UserService service) {
        this.service = service;
    }

    @GetMapping
    public List<User> GetUsers(){
        return service.GetUsers();
    }

    @PostMapping
    public void RegisterUser(@RequestBody User newUser){
        service.SaveUser(newUser);
    }

}
