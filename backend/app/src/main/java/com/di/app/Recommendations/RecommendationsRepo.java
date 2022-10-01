package com.di.app.Recommendations;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecommendationsRepo extends JpaRepository<Recommended, Long> {

}
