package com.di.app.user;

import javax.persistence.*;

@Entity
@Table
public class User {
    @Id
    @GeneratedValue
//    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;
    private String pass;
    private String email;
    private String realname;
    private String surname;
    private String tele;
    private String afm;
    private Integer type;

    public User(String username, String pass, String email, String realname, String surname, String tele, String afm, Integer type) {
        this.username = username;
        this.pass = pass;
        this.email = email;
        this.realname = realname;
        this.surname = surname;
        this.tele = tele;
        this.afm = afm;
        this.type = type;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPass() {
        return pass;
    }

    public void setPass(String pass) {
        this.pass = pass;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRealname() {
        return realname;
    }

    public void setRealname(String realname) {
        this.realname = realname;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getTele() {
        return tele;
    }

    public void setTele(String tele) {
        this.tele = tele;
    }

    public String getAfm() {
        return afm;
    }

    public void setAfm(String afm) {
        this.afm = afm;
    }

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", pass='" + pass + '\'' +
                ", email='" + email + '\'' +
                ", realname='" + realname + '\'' +
                ", surname='" + surname + '\'' +
                ", tele='" + tele + '\'' +
                ", afm='" + afm + '\'' +
                ", type=" + type +
                '}';
    }
}

