package com.example.service;

import com.example.model.Category;
import com.example.model.Department;
import com.example.repository.CategoryRepository;
import com.example.repository.DepartmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.HashSet;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private DepartmentRepository departmentRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public void run(String... args) throws Exception {
        // Initialize departments and their categories
        createDepartmentsAndCategories();
    }

    private void createDepartmentsAndCategories() {
        // Define an array of department names
        String[] departmentNames = {
                "Caviar & Roe",
                "Clams / Oysters",
                "Crab / Lobster / Shrimp",
                "Curated By Fulton",
                "Fish",
                "Mussels / Scallops",
                "Octopus / Squid",
                "Pantry / Merchandise",
                "Prepared / Ready To Eat"
        };

        // Create and save departments if they don't already exist
        for (String name : departmentNames) {
            if (!departmentRepository.findByName(name).isPresent()) {
                Department department = new Department();
                department.setName(name);
                departmentRepository.save(department);
            }
        }

        // Create and save categories for each department
        saveCategoriesForDepartment(departmentRepository.findByName("Caviar & Roe").get(), new String[]{"Caviar", "Anchovies", "Smoked Seafood"});
        saveCategoriesForDepartment(departmentRepository.findByName("Clams / Oysters").get(), new String[]{"Clams", "Oysters"});
        saveCategoriesForDepartment(departmentRepository.findByName("Crab / Lobster / Shrimp").get(), new String[]{"Crab", "Lobster", "Shrimp", "Mussels", "Squid"});
        saveCategoriesForDepartment(departmentRepository.findByName("Curated By Fulton").get(), new String[]{"Curated By Fulton", "Bundles"});
        saveCategoriesForDepartment(departmentRepository.findByName("Fish").get(), new String[]{"Cod", "Halibut", "Trout", "Salmon", "Tuna", "Swordfish", "Snapper"});
        saveCategoriesForDepartment(departmentRepository.findByName("Mussels / Scallops").get(), new String[]{"Mussels", "Scallops"});
        saveCategoriesForDepartment(departmentRepository.findByName("Octopus / Squid").get(), new String[]{"Octopus", "Squid"});
        saveCategoriesForDepartment(departmentRepository.findByName("Pantry / Merchandise").get(), new String[]{"Books", "Kitchen Tools", "Sauces/Spices"});
        saveCategoriesForDepartment(departmentRepository.findByName("Prepared / Ready To Eat").get(), new String[]{"Burgers", "Cakes", "Bundles"});
    }

    private void saveCategoriesForDepartment(Department department, String[] categoryNames) {
        for (String categoryName : categoryNames) {
            if (categoryRepository.findByName(categoryName).isPresent()) {
                continue;
            }

            Category category = new Category();
            category.setName(categoryName);
            category.setDepartment(department);
            categoryRepository.save(category);
        }
    }
}