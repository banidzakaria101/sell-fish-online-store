package com.example.controller;

import com.example.dto.CategoryDTO;
import com.example.model.Category;
import com.example.model.Department;
import com.example.repository.CategoryRepository;
import com.example.repository.DepartmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private DepartmentRepository departmentRepository;

    @PostMapping
    public ResponseEntity<Category> createCategory(@RequestBody CategoryDTO categoryDTO) {
        Category category = new Category();
        category.setName(categoryDTO.getName());
        category.setDescription(categoryDTO.getDescription());

        Department department = departmentRepository.findById(categoryDTO.getDepartmentId())
                .orElseThrow(() -> new RuntimeException("Department not found"));
        category.setDepartment(department);

        return ResponseEntity.ok(categoryRepository.save(category));
    }
}