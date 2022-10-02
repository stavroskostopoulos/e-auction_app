package com.di.app.Recommendations;

import com.di.app.item.Item;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Cascade;

import javax.persistence.*;
import java.util.List;

@Table @Data @Entity
@AllArgsConstructor @NoArgsConstructor
public class Recommended {

    @Id
    private Long userId;

    @ManyToMany(fetch = FetchType.EAGER)
    @Cascade(org.hibernate.annotations.CascadeType.PERSIST)
    private List<Item> itemList;

}
