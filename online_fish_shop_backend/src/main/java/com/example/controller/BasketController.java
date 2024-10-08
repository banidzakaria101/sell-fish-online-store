package com.example.controller;

import com.example.model.Basket;
import com.example.service.BasketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/basket")
public class BasketController {

    @Autowired
    private BasketService basketService;

    @PostMapping("/add/{customerId}/{productId}")
    public Basket addProductToBasket(@PathVariable Long customerId, @PathVariable Long productId) {
        return basketService.addProductToBasket(customerId, productId);
    }

    @DeleteMapping("/remove/{customerId}/{productId}")
    public Basket removeProductFromBasket(@PathVariable Long customerId, @PathVariable Long productId) {
        return basketService.removeProductFromBasket(customerId, productId);
    }
}
