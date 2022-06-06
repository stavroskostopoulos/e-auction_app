package com.di.app.user;

import com.di.app.role.Role;
import com.di.app.role.RoleForm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RequestMapping(path = "/api")
@RestController
@CrossOrigin(origins = "*")
public class UserController {

    private final UserService service;

    @Autowired
    public UserController(UserService service) {
        this.service = service;
    }

    @GetMapping(path = "/users")
    public ResponseEntity<List<User>> GetUsers(){
//        return ResponseEntity.ok().body(service.GetUsers());
        return ResponseEntity.ok().body(service.GetUsersLimit());
    }

    @GetMapping(path = "/users/{userid}")
    public ResponseEntity<Optional<User>> GetUserById(@PathVariable("userid") Long id){
        return ResponseEntity.ok().body(service.GetUserById(id));
    }

    @PostMapping(path = "users/save")
    public ResponseEntity<User> RegisterUser(@RequestBody User newUser){
        return ResponseEntity.ok().body(service.SaveUser(newUser));
    }

    @PostMapping(path = "role/give")
    public ResponseEntity<?> GiveRole(@RequestBody RoleForm role){
        service.GiveRole(role.getUsername(), role.getRolename());
        return ResponseEntity.ok().build();
    }

    @PostMapping(path = "role/save")
    public ResponseEntity<Role> RegisterRole(@RequestBody Role newRole){
        return ResponseEntity.ok().body(service.SaveRole(newRole));
    }



}

