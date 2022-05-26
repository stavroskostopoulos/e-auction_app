package com.di.app.role;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;


@Entity @Data
@NoArgsConstructor
@AllArgsConstructor
public class Role {

    @Id @GeneratedValue
    private Long id;

    private String name;

//    public Role(Long id, String name) {
//        this.id = id;
//        this.name = name;
//    }
}
