package com.example.service;

import com.example.model.Category;
import com.example.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

//    @Autowired
//    private DepartmentRepository departmentRepository;
//
//    public Category createCategory(Category category, Long departmentId) {
//        Department department = departmentRepository.findById(departmentId)
//                .orElseThrow(() -> new RuntimeException("Department not found"));
//        category.setDepartment(department);
//        return categoryRepository.save(category);
//    }
}