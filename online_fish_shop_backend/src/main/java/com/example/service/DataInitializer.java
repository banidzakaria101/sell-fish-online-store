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
        // Create departments
        Department caviarRoe = new Department();
        caviarRoe.setName("Caviar & Roe");

        Department clamsOysters = new Department();
        clamsOysters.setName("Clams / Oysters");

        Department crabLobsterShrimp = new Department();
        crabLobsterShrimp.setName("Crab / Lobster / Shrimp");

        Department curatedByFulton = new Department();
        curatedByFulton.setName("Curated By Fulton");

        Department fish = new Department();
        fish.setName("Fish");

        Department musselsScallops = new Department();
        musselsScallops.setName("Mussels / Scallops");

        Department octopusSquid = new Department();
        octopusSquid.setName("Octopus / Squid");

        Department pantryMerchandise = new Department();
        pantryMerchandise.setName("Pantry / Merchandise");

        Department preparedReadyToEat = new Department();
        preparedReadyToEat.setName("Prepared / Ready To Eat");

        // Save departments
        departmentRepository.save(caviarRoe);
        departmentRepository.save(clamsOysters);
        departmentRepository.save(crabLobsterShrimp);
        departmentRepository.save(curatedByFulton);
        departmentRepository.save(fish);
        departmentRepository.save(musselsScallops);
        departmentRepository.save(octopusSquid);
        departmentRepository.save(pantryMerchandise);
        departmentRepository.save(preparedReadyToEat);

        // Create and save categories for each department
        saveCategoriesForDepartment(caviarRoe, new String[]{"Caviar", "Anchovies", "Smoked Seafood"});
        saveCategoriesForDepartment(clamsOysters, new String[]{"Clams", "Oysters"});
        saveCategoriesForDepartment(crabLobsterShrimp, new String[]{"Crab", "Lobster", "Shrimp", "Mussels", "Squid"});
        saveCategoriesForDepartment(curatedByFulton, new String[]{"Curated By Fulton", "Bundles"});
        saveCategoriesForDepartment(fish, new String[]{"Cod", "Halibut", "Trout", "Salmon", "Tuna", "Swordfish", "Snapper"});
        saveCategoriesForDepartment(musselsScallops, new String[]{"Mussels", "Scallops"});
        saveCategoriesForDepartment(octopusSquid, new String[]{"Octopus", "Squid"});
        saveCategoriesForDepartment(pantryMerchandise, new String[]{"Books", "Kitchen Tools", "Sauces/Spices"});
        saveCategoriesForDepartment(preparedReadyToEat, new String[]{"Burgers", "Cakes", "Bundles"});
    }

    private void saveCategoriesForDepartment(Department department, String[] categoryNames) {
        for (String categoryName : categoryNames) {
            if (categoryRepository.findByName(categoryName).isPresent()) {
                continue;
            }

            Category category = new Category();
            category.setName(categoryName);
            category.setDepartment(department); // Set the department for the category
            categoryRepository.save(category);
        }
    }
}