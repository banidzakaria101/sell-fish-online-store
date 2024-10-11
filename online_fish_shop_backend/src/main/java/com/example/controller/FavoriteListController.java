package com.example.controller;

import com.example.model.FavoriteList;
import com.example.service.FavoriteListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/favorites")
public class FavoriteListController {

    @Autowired
    private FavoriteListService favoriteListService;

    @PostMapping("/add/{customerId}/{productId}")
    public ResponseEntity<FavoriteList> addProductToFavorites(@PathVariable Long customerId, @PathVariable Long productId) {
        FavoriteList updatedFavorites = favoriteListService.addProductToFavorites(customerId, productId);
        return new ResponseEntity<>(updatedFavorites, HttpStatus.OK);
    }

    @DeleteMapping("/remove/{customerId}/{productId}")
    public ResponseEntity<FavoriteList> removeProductFromFavorites(@PathVariable Long customerId, @PathVariable Long productId) {
        FavoriteList updatedFavorites = favoriteListService.removeProductFromFavorites(customerId, productId);
        return new ResponseEntity<>(updatedFavorites, HttpStatus.OK);
    }

    @GetMapping("/{customerId}")
    public ResponseEntity<FavoriteList> getFavoriteList(@PathVariable Long customerId) {
        FavoriteList favoriteList = favoriteListService.getFavoriteListByCustomerId(customerId);
        return new ResponseEntity<>(favoriteList, HttpStatus.OK);
    }
}