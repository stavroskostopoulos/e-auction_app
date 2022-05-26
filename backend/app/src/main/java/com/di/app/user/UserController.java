package com.di.app.user;

import com.di.app.role.Role;
import lombok.Data;
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

    @PostMapping(path = "api/users/save")
    public void RegisterUser(@RequestBody User newUser){
        service.SaveUser(newUser);
    }

    @PostMapping(path = "api/role/save")
    public void RegisterRole(@RequestBody Role newRole){
        service.SaveRole(newRole);
    }

    @PostMapping(path = "api/role/give")
    public void GiveRole(@RequestBody RoleForm role){
        service.GiveRole(role.getUsername(), role.getRolename());
    }

}

@Data
class RoleForm{
    private String username;
    private String rolename;
}


