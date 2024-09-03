package com.example.repository;

import com.example.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {

    Product findByTitle(String name);

    List<Product> findByNameContainingIgnoreCase(String name);
}
