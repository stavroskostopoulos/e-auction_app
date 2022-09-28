package com.di.app.message;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {


    @Query( value = "SELECT * FROM message WHERE receiver_id = :receiverId", nativeQuery = true)
    List<Message> getInbox(@Param("receiverId") Long receiverId);

    @Query( value = "SELECT * FROM message WHERE sender_id = :senderId", nativeQuery = true)
    List<Message> getOutbox(@Param("senderId") Long senderId);

    @Query( value = "SELECT EXISTS(SELECT * FROM message m WHERE m.receiver_id = :userId AND seen=true)", nativeQuery = true)
    Boolean checkUnread(@Param("userId") Long userId);

}
