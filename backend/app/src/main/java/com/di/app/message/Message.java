package com.di.app.message;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Entity @Table @Data
@AllArgsConstructor
@NoArgsConstructor
public class Message {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long messageId;

    private Long receiverId;
    private Long senderId;
    private String content;
    private String title;
    private String username;
    private Date msgDate;
    private Boolean seen=Boolean.FALSE;

}
