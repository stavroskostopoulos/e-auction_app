package com.di.app.item;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Cascade;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity @Table @Data
@AllArgsConstructor @NoArgsConstructor
public class Item {

    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long itemId;

    private Long sellerId;
    private Integer sellerRating;
    private String name;
    private String buyPrice;

    @Column(columnDefinition="TEXT")
    private String description;

    private String firstBid;
    private Integer currentBid;
    private Integer bidCount;
    private Integer photoId;
    private Date start;
    private Date end;
    private String latitude;
    private String longitude;
    private String country;


    @Cascade(org.hibernate.annotations.CascadeType.SAVE_UPDATE)
    @ElementCollection
    private List<String> category;


}

