package com.example.controller;

import com.example.dto.BasketDTO;
import com.example.dto.BasketProductDTO;
import com.example.model.BasketProduct;
import com.example.service.BasketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/basket")
public class BasketController {

    @Autowired
    private BasketService basketService;

    @PostMapping("/add/{customerId}/{productId}")
    public ResponseEntity<BasketDTO> addProductToBasket(@PathVariable Long customerId, @PathVariable Long productId) {
        BasketDTO updatedBasket = basketService.addProductToBasket(customerId, productId);
        return new ResponseEntity<>(updatedBasket, HttpStatus.OK);
    }

    @DeleteMapping("/remove/{customerId}/{productId}")
    public ResponseEntity<BasketDTO> removeProductFromBasket(@PathVariable Long customerId, @PathVariable Long productId) {
        BasketDTO updatedBasket = basketService.removeProductFromBasket(customerId, productId);
        return new ResponseEntity<>(updatedBasket, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('CUSTOMER')")
    @GetMapping("/{customerId}")
    public ResponseEntity<BasketDTO> getBasket(@PathVariable Long customerId) {
        BasketDTO basket = basketService.getBasketByCustomerId(customerId);
        if (basket == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(basket, HttpStatus.OK);
    }

    @GetMapping("/products/{basketId}")
    public List<BasketProductDTO> getProductsByBasket(@PathVariable Long basketId) {
        return basketService.getProductByBasket(basketId);
    }
}