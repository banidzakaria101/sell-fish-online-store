package com.example.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;

import java.util.ArrayList;
import java.util.List;


@Entity
@Setter
@Getter
public class Basket {

    // Getters and Setters
    @jakarta.persistence.Id
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "basket_id")
    private List<BasketProduct> products = new ArrayList<>();

    @OneToOne
    private Customer customer;

    public void setId(Long id) {
        this.id = id;
    }

    public void setProducts(List<BasketProduct> products) {
        this.products = products;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public void addProduct(BasketProduct product) {
        products.add(product);
    }

    public void removeProduct(BasketProduct product) {
        products.remove(product);
    }


}