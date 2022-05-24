package com.di.app.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

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
        //System.out.println(newUser);
    }
}
