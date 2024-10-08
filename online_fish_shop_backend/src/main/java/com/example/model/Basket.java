package com.example.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Basket {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Double totalPrice = 0.0;
    private Integer totalQuantity = 0;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Product> products = new ArrayList<>();

    @OneToOne
    @JoinColumn(name = "customer_id")
    private Customer customer;

    // Method to add a product to the basket
    public void addProduct(Product product) {
        this.products.add(product);
        this.totalQuantity++;
        this.totalPrice += product.getPrice();
    }

    // Method to remove a product from the basket
    public void removeProduct(Product product) {
        if (this.products.remove(product)) {
            this.totalQuantity--;
            this.totalPrice -= product.getPrice();
        }
    }
}
