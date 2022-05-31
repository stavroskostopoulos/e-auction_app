package com.di.app.item;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Cascade;

import javax.persistence.*;
import java.util.List;

@Entity @Table @Data
@AllArgsConstructor @NoArgsConstructor
public class Item {

    @Id @GeneratedValue
    private Long itemId;

    private String name;
    


    @Cascade(org.hibernate.annotations.CascadeType.SAVE_UPDATE)
    @ElementCollection
    private List<String> category;



}
