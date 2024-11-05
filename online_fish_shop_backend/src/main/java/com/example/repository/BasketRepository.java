package com.example.repository;

import com.example.model.Basket;
import com.example.model.BasketProduct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BasketRepository extends JpaRepository<Basket, Long> {

    @Query("SELECT bp FROM BasketProduct bp JOIN bp.basket b WHERE b.id = :basketId")
    List<BasketProduct> findBasketProductsByBasketId(@Param("basketId") Long basketId);
}