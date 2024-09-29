package com.example.controller;

import com.example.model.Category;
import com.example.model.Product;
import com.example.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/product")
public class ProductController {

    @Autowired
    private ProductService productService;


//    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/add")
    public Product add(@RequestBody Product product){
        return productService.addProduct(product);
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


}
