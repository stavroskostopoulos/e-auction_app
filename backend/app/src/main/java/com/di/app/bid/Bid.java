package com.di.app.bid;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Cascade;

import javax.persistence.*;
import java.util.Date;

@Entity @Table @Data
@AllArgsConstructor @NoArgsConstructor
public class Bid {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bidId;


    private Long itemId;
    private String time;
    private String amount;

    @OneToOne(cascade = CascadeType.REFRESH)
    @Cascade(org.hibernate.annotations.CascadeType.ALL)
    private Bidder bidder;


}