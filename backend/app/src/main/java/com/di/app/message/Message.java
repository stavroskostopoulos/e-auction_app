package com.di.app.message;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity @Table @Data
@AllArgsConstructor
@NoArgsConstructor
public class Message {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long messageId;

    private Long receiverId;
    private Long senderId;
    private String content;
    private Boolean seen=Boolean.FALSE;



}
