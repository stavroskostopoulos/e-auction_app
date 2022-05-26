package com.di.app.user;

import com.di.app.role.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;

@Entity @Table
@Data @AllArgsConstructor @NoArgsConstructor
public class User {

    //@GeneratedValue (strategy = GenerationType.IDENTITY)
    @Id @GeneratedValue
    private Long id;

    private String username;
    private String pass;
    private String email;
    private String realname;
    private String surname;
    private String tele;
    private String afm;
//    private Integer type;

    @ManyToMany(fetch = FetchType.EAGER)
    private Collection<Role> roles = new ArrayList<>();

//    public User(String username, String pass, String email, String realname, String surname, String tele, String afm, Integer type) {
//        this.username = username;
//        this.pass = pass;
//        this.email = email;
//        this.realname = realname;
//        this.surname = surname;
//        this.tele = tele;
//        this.afm = afm;
//        this.type = type;
//    }

    //    public User() {}
//
//    public User(String username, String pass, String email, String realname, String surname, String tele, String afm, Collection<Role> roles) {
//        this.username = username;
//        this.pass = pass;
//        this.email = email;
//        this.realname = realname;
//        this.surname = surname;
//        this.tele = tele;
//        this.afm = afm;
//        this.roles = roles;
//    }

}

