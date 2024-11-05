package com.example.repository;

import com.example.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CategoryRepository extends JpaRepository<Category, Long> {


    Category findCategoryByName(String categoryName);

    Optional<Object> findByName(String categoryName);

}
