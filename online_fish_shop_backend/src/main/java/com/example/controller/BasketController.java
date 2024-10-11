package com.example.controller;

import com.example.model.Basket;
import com.example.service.BasketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/basket")
public class BasketController {

    @Autowired
    private BasketService basketService;

    @PostMapping("/add/{customerId}/{productId}")
    public ResponseEntity<Basket> addProductToBasket(@PathVariable Long customerId, @PathVariable Long productId) {
        Basket updatedBasket = basketService.addProductToBasket(customerId, productId);
        return new ResponseEntity<>(updatedBasket, HttpStatus.OK);
    }

    @DeleteMapping("/remove/{customerId}/{productId}")
    public ResponseEntity<Basket> removeProductFromBasket(@PathVariable Long customerId, @PathVariable Long productId) {
        Basket updatedBasket = basketService.removeProductFromBasket(customerId, productId);
        return new ResponseEntity<>(updatedBasket, HttpStatus.OK);
    }

    @GetMapping("/{customerId}")
    public ResponseEntity<Basket> getBasket(@PathVariable Long customerId) {
        Basket basket = basketService.getBasketByCustomerId(customerId);
        return new ResponseEntity<>(basket, HttpStatus.OK);
    }
}