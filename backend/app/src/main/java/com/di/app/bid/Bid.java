package com.di.app.bid;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Entity @Table @Data
@AllArgsConstructor @NoArgsConstructor
public class Bid {

    @Id @GeneratedValue
    private Long bidId;

    private Date time;
    private String amount;

//    @Transient
    @OneToOne
    private Bidder bidder;


}