package com.example.service;

import com.example.model.Category;
import com.example.model.Product;
import com.example.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public Product addProduct(Product product) {
        return productRepository.save(product);
    }

    public void deleteProduct(Long productId) {
        productRepository.deleteById(productId);
    }

    public Product updateProduct(Long productId, Product product) {
        Optional<Product> productOptional = productRepository.findById(productId);

            productOptional.get().setPrice(product.getPrice());
            productOptional.get().setImage(product.getImage());
            productOptional.get().setStock(product.getStock());
            return productRepository.save(productOptional.get());
    }

    public List<Product> lisAllProducts() {
        return productRepository.findAll();
    }

    public List<Product> searchProductByName(String name) {
        return productRepository.findByNameContainingIgnoreCase(name);
    }

    public Product getProductById(Long productId) {
        Optional<Product> productOptional = productRepository.findById(productId);
        if (productOptional.isPresent()) {
            return productOptional.get();
        }else {
            throw new RuntimeException("Product not found");
        }
    }

    public List<Product> filterProducts(Double minPrice, Double maxPrice, Category category, Boolean available) {
        Specification<Product> spec = Specification.where(null);

        if (minPrice != null) {
            spec = spec.and((root, query, criteriaBuilder ) ->
                    criteriaBuilder.greaterThanOrEqualTo(root.get("price"), minPrice));
        }

        if (maxPrice != null) {
            spec = spec.and((root, query, criteriaBuilder) ->
                    criteriaBuilder.lessThanOrEqualTo(root.get("price"),maxPrice));
        }

        if (available != null) {
            spec = spec.and((root, query, criteriaBuilder) ->
                    criteriaBuilder.equal(root.get("available"), available));
        }

        if (category != null) {
            spec = spec.and((root, query, criteriaBuilder) ->
                    criteriaBuilder.equal(root.get("category"), category));
        }

        return productRepository.findAll();
    }
}
