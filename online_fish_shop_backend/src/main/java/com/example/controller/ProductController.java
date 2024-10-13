package com.example.controller;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.example.model.Admin;
import com.example.model.Category;
import com.example.model.Product;
import com.example.repository.AdminRepository;
import com.example.repository.CategoryRepository;
import com.example.service.CategoryService;
import com.example.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/product")
public class ProductController {

    @Autowired
    private ProductService productService;

    @Autowired
    private Cloudinary cloudinary;

    @Autowired
    private CategoryRepository categoryRepository;



    @Autowired
    private AdminRepository adminRepository;

//  Method to get the currently logged-in admin
    private Admin getLoggedInAdmin() {
        String username;
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof UserDetails) {
            username = ((UserDetails) principal).getUsername();
        } else {
            username = principal.toString();
        }

        return adminRepository.findByUsername(username) // Assuming you have a method to find by username
                .orElseThrow(() -> new RuntimeException("Admin not found"));
    }


    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/add")
    public ResponseEntity<Product> createProduct(@RequestParam("file") MultipartFile file,
                                                 @RequestParam("name") String name,
                                                 @RequestParam("description") String description,
                                                 @RequestParam("price") Double price,
                                                 @RequestParam("weight") Integer weight,
                                                 @RequestParam("stock") Integer stock,
                                                 @RequestParam("category_id") Long categoryId) throws IOException {
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Category not found"));

        Admin loggedInAdmin = getLoggedInAdmin();

        Product product = new Product();
        product.setName(name);
        product.setDescription(description);
        product.setPrice(price);
        product.setWeight(weight);
        product.setStock(stock);
        product.setCategory(category);
        product.setAvailable(true);
        product.setAdmin(loggedInAdmin);

        return productService.saveProduct(product, file);
    }



    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable long id){
        productService.deleteProduct(id);
    }

    @GetMapping("/list")
    public List<Product> list(){
        return productService.lisAllProducts();
    }

    @GetMapping("/name")
    public List<Product> getByName(@RequestParam String name){
        return productService.searchProductByName(name);
    }

    @GetMapping("/by-category/{id}")
    public List<Product> getByCategory(@PathVariable Long id){
        return productService.getProductsByCategory(id);
    }

    @GetMapping("/details")
    public  Product details(@RequestParam long id){
        return productService.getProductById(id);
    }


}
