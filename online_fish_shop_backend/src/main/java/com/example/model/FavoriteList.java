package com.example.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class FavoriteList {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Product> products = new ArrayList<>();

    @OneToOne
    @JoinColumn(name = "customer_id")
    private Customer customer;

    // Method to add a product to the favorite list
    public void addProduct(Product product) {
        this.products.add(product);
    }

    // Method to remove a product from the favorite list
    public void removeProduct(Product product) {
        this.products.remove(product);
    }
}