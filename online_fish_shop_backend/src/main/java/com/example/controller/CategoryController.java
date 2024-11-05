package com.example.controller;

import com.example.model.Category;
import com.example.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/category")
public class CategoryController {

    @Autowired
    private CategoryRepository categoryRepository;

//    @Autowired
//    private DepartmentRepository departmentRepository;

//    @PostMapping
//    public ResponseEntity<Category> createCategory(@RequestBody CategoryDTO categoryDTO) {
//        Category category = new Category();
//        category.setName(categoryDTO.getName());
//        category.setDescription(categoryDTO.getDescription());
//
//        Department department = departmentRepository.findById(categoryDTO.getDepartmentId())
//                .orElseThrow(() -> new RuntimeException("Department not found"));
//        category.setDepartment(department);
//
//        return ResponseEntity.ok(categoryRepository.save(category));
//    }

    @GetMapping("/list")
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

//    @GetMapping("/departments/{id}/categories")
//    public List<Category> getCategoriesByDepartmentId(@PathVariable Long id) {
//        return categoryRepository.findByDepartmentId(id);
//    }
}