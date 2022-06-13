package com.di.app.item;

import lombok.Data;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.List;

@Data
public class Category {

    @Id @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long itemId;
    private List<String> cats;

    public Long getItemId() {
        return itemId;
    }

    public List<String> getCats() {
        return cats;
    }
}

