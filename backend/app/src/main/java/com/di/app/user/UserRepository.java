package com.di.app.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Collection;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    @Query(value = "SELECT * FROM user u WHERE u.email = ?1",
            nativeQuery = true)
    Collection<User> checkEmail(String email);

    @Query(value = "SELECT * FROM user u WHERE u.username = ?1",
            nativeQuery = true)
    Collection<User> checkUsername(String username);

}
