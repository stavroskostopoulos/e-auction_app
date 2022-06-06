package com.di.app.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
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

//    @Query(value = "SELECT * FROM product order by id desc limit :limit", nativeQuery = true)
//    public List<Product> findTopN(@Param("limit") int limit);

    @Query(value = "SELECT * FROM user LIMIT 10", nativeQuery = true)
    List<User> getUsersLimit();

}
