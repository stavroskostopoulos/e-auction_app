package com.di.app.bid;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Entity @Table @Data
@AllArgsConstructor @NoArgsConstructor
public class Bidder {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;

    private String rating;
    private String location;
    private String country;


}