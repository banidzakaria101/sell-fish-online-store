package com.example.service;

import com.example.model.Basket;
import com.example.model.Product;
import com.example.repository.BasketRepository;
import com.example.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class BasketService {

    @Autowired
    BasketRepository basketRepository;

    @Autowired
    ProductRepository productRepository;

//    public Basket addProductTOBasket(Basket basket, Long productId) {
//        Optional<Product> optionalProduct = productRepository.findById(productId);
//        if (optionalProduct.isPresent()) {
//            Product product = optionalProduct.get();
//            Basket newBasket = new Basket();
//            newBasket.setProducts(product.get);
//            newBasket.getTotalPrice() ;
//        }
//    }
}
