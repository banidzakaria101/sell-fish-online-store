package com.example.service;

import com.example.model.Category;
import com.example.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepo;

    public List<Category> getAllCategories() {
        return categoryRepo.findAll();
    }

    public Category findCategoryByName(String categoryName) {
        return categoryRepo.findCategoryByName(categoryName);
    }

    public Category addCategory(Category category) {
        return categoryRepo.save(category);
    }

    public Category updateCategory(Category category, Long id) {
        Category updatedCategory = categoryRepo.findById(id).get();

        return categoryRepo.save(category);
    }




}
