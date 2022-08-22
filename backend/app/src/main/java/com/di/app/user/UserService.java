package com.di.app.user;

import com.di.app.role.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
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

    public Page<User> GetUsersLimit(Integer offset){
        Integer limit = 8;
        List<User> userList = userRepository.getUsersLimit(limit,offset*limit);

        Page<User> page = new PageImpl<>(userList);

        return page;
    }

    public Optional<User> GetUserById(Long id){
        return userRepository.findById(id);
    }

    public Page<User> GetPendingUsers(Integer offset){
        Integer limit = 8;
        List<User> userList = userRepository.getPendingUsers(limit,offset);

        Page<User> page = new PageImpl<>(userList);

        return page;
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

    public User UpdateUser(User user) {
        Collection<User> userByUsername = userRepository.checkUsername(user.getUsername());
        if(userByUsername.isEmpty()){
            throw new IllegalStateException("You can't change Username!");
        }

        String email=user.getEmail();
        String realname=user.getRealname();
        String surname=user.getSurname();
        String tele=user.getTele();
        String afm=user.getAfm();



        User userToUpdate = userRepository.findByUsername(user.getUsername());

        if(email!=null) userToUpdate.setEmail(email);
        if(realname!=null) userToUpdate.setRealname(realname);
        if(surname!=null) userToUpdate.setSurname(surname);
        if(tele!=null) userToUpdate.setTele(tele);
        if(afm!=null) userToUpdate.setAfm(afm);


        if(user.getPass()!=null) {
            userToUpdate.setPass(passwordEncoder.encode(user.getPass()));
        }



        return userRepository.save(userToUpdate);

    }

    public User UpdateRole(RoleForm role){
        User user = userRepository.findByUsername(role.getUsername());

        user.getRoles().remove(roleRepository.getById(1L));
        user.getRoles().remove(roleRepository.getById(2L));
        user.getRoles().remove(roleRepository.getById(3L));
        user.getRoles().remove(roleRepository.getById(4L));
        user.getRoles().remove(roleRepository.getById(5L));

        GiveRole(role.getUsername(), role.getRolename());

        return user;
    }


    public void DeleteUser(Long id) {
        User user = userRepository.getById(id);

        user.getRoles().remove(roleRepository.getById(1L));
        user.getRoles().remove(roleRepository.getById(2L));
        user.getRoles().remove(roleRepository.getById(3L));
        user.getRoles().remove(roleRepository.getById(4L));
        user.getRoles().remove(roleRepository.getById(5L));

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

    public Integer GetIfPending(Long id) {
        User user = userRepository.getById(id);

        List<User> userList = userRepository.getPendingUsers(80,0);

        if(userList.contains(user)) return 1;
        return 0;
    }



}
