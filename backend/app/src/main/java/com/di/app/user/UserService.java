package com.di.app.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

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

        //search if email already exists
        Collection<User> userByEmail = userRepository.checkEmail(newUser.getEmail());

        if(!userByEmail.isEmpty()){
            throw new IllegalStateException("Email already in use");
        }

        userRepository.save(newUser);
        //System.out.println(newUser);
    }
}
