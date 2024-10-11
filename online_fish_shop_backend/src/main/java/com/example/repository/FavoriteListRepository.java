package com.example.repository;

import com.example.model.FavoriteList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FavoriteListRepository extends JpaRepository<FavoriteList, Long> {

}
