package com.di.app.user;

import com.di.app.role.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Collection;
import java.util.List;

//@Slf4j
@Service @Transactional
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

//    @Autowired
//    public UserService(UserRepository userRepository) {
//        this.userRepository = userRepository;
//    }

    public List<User> GetUsers(){
        return userRepository.findAll();
    }

    public void SaveUser(User newUser) {

        //search if username already exists
        Collection<User> userByUsername = userRepository.checkUsername(newUser.getUsername());
        if(!userByUsername.isEmpty()){
            throw new IllegalStateException("Username already in use!");
        }

        //search if email already exists
        Collection<User> userByEmail = userRepository.checkEmail(newUser.getEmail());
        if(!userByEmail.isEmpty()){
            throw new IllegalStateException("Email already in use!");
        }

        // all good, save the user
        userRepository.save(newUser);
    }


    public Role SaveRole(Role role){
        return roleRepository.save(role);
    }

    public void GiveRole(String username, String rolename){
        User user = userRepository.findByUsername(username);
        Role role = roleRepository.findByName(rolename);

        user.getRoles().add(role);
    }


}
