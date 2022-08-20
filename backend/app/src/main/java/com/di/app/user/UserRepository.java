package com.di.app.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);

    @Query(value = "SELECT * FROM user u WHERE u.email = ?1",
            nativeQuery = true)
    Collection<User> checkEmail(String email);

    @Query(value = "SELECT * FROM user u WHERE u.username = ?1",
            nativeQuery = true)
    Collection<User> checkUsername(String username);

    @Query(value = "SELECT * FROM user LIMIT :limit OFFSET :offset", nativeQuery = true)
    List<User> getUsersLimit(@Param("limit")Integer limit, @Param("offset")Integer offset);

    @Query(value = "SELECT * FROM user WHERE id IN( " +
            "SELECT user_id FROM user_roles WHERE roles_roleid=5 ) LIMIT :limit OFFSET :offset", nativeQuery = true)
    List<User> getPendingUsers(@Param("limit")Integer limit, @Param("offset")Integer offset);

}
