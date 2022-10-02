package com.di.app.contact;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ContactRepository extends JpaRepository<Contact, Long> {

    @Query(value = "SELECT peers FROM contact_peers WHERE contact_user_id = :userId", nativeQuery = true)
    List<String> getContacts(@Param("userId") Long userId);

    @Query(value = "SELECT * FROM contact WHERE user_id = :userId", nativeQuery = true)
    Contact contactExists(@Param("userId") Long userId);

}
