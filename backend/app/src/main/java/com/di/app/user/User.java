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

    @ManyToMany(fetch = FetchType.EAGER)
    private Collection<Role> roles = new ArrayList<>();

}

