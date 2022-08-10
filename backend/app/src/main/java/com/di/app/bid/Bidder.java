package com.di.app.bid;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Date;

@Entity @Table @Data
@AllArgsConstructor @NoArgsConstructor
public class Bidder {

    @Id
    private Long userId;

    private String rating;
    private String location;
    private String country;


}