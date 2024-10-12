package com.example.controller;

import com.example.dto.DepartmentDTO;
import com.example.model.Category;
import com.example.model.Department;
import com.example.repository.CategoryRepository;
import com.example.repository.DepartmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/departments")
public class DepartmentController {

    @Autowired
    private DepartmentRepository departmentRepository;

    @PostMapping
    public ResponseEntity<Department> createDepartment(@RequestBody DepartmentDTO departmentDTO) {
        Department department = new Department();
        department.setName(departmentDTO.getName());
        return ResponseEntity.ok(departmentRepository.save(department));
    }

    @Autowired
    private CategoryRepository categoryRepository;

    @GetMapping("/departments")
    public List<Department> getAllDepartments() {
        return departmentRepository.findAll();
    }

    @GetMapping("/categories")
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    @GetMapping("/departments/{id}/categories")
    public List<Category> getCategoriesByDepartmentId(@PathVariable Long id) {
        return categoryRepository.findByDepartmentId(id);
    }
}