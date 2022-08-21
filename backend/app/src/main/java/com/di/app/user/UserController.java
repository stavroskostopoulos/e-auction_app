package com.di.app.user;

import com.di.app.role.Role;
import com.di.app.role.RoleForm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    // GET

    @GetMapping(path = "/users/{offset}")
    public ResponseEntity<Page<User>> GetUsers(@PathVariable("offset") Integer offset){
        return ResponseEntity.ok().body(service.GetUsersLimit(offset));
    }

    @GetMapping(path = "/users/id/{userid}")
    public ResponseEntity<Optional<User>> GetUserById(@PathVariable("userid") Long id){
        return ResponseEntity.ok().body(service.GetUserById(id));
    }

    @GetMapping(path = "/users/pending/{offset}")
    public ResponseEntity<Page<User>> GetPending(@PathVariable("offset") Integer offset){
        return ResponseEntity.ok().body(service.GetPendingUsers(offset));
    }

    @GetMapping(path = "/users/accepted/{userid}")
    public ResponseEntity<Integer> GetUserPending(@PathVariable("userid") Long id){
        return ResponseEntity.ok().body(service.GetIfPending(id));
    }


    // POST

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



    // PUT

    @PutMapping(path = "users/update")
    public ResponseEntity<User> UpdateUser(@RequestBody User user){
        return ResponseEntity.ok().body(service.UpdateUser(user));
    }


    // DELETE

    @DeleteMapping("/users/delete/{userid}")
    public ResponseEntity<?> DeleteUser(@PathVariable("userid") Long id) {
        service.DeleteUser(id);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/role/accepted/{userid}")
    public @ResponseBody ResponseEntity<String> AcceptedRole(@PathVariable("userid") Long id) {
        service.AcceptedRole(id);
        return ResponseEntity.ok().build();
    }





}

