package com.di.app.user;

import com.di.app.role.*;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Service @Transactional
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;


    public List<User> GetUsers(){
        return userRepository.findAll();
    }

    public List<User> GetUsersLimit(){
        return userRepository.getUsersLimit();
    }

    public Optional<User> GetUserById(Long id){
        return userRepository.findById(id);
    }

    public User GetUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public User SaveUser(User newUser) {

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

        // all good, encode the password and save the user
        newUser.setPass(passwordEncoder.encode(newUser.getPass()));
        return userRepository.save(newUser);
    }


    public void DeleteUser(Long id) {
        User user = userRepository.getById(id);
        userRepository.delete(user);
    }


    public void GiveRole(String username, String rolename){
        User user = userRepository.findByUsername(username);
        Role role = roleRepository.findByName(rolename);

        user.getRoles().add(role);
    }

    public Role SaveRole(Role role){
        return roleRepository.save(role);
    }


    public void AcceptedRole(Long id) {
        User user = userRepository.getById(id);
        user.getRoles().remove(roleRepository.getById(5L));
    }


}
