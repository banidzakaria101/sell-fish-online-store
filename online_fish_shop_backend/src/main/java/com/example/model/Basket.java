package com.example.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;


@Entity
@Setter
@Getter
public class Basket {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "basket_id")
    private List<BasketProduct> products = new ArrayList<>();

    @OneToOne
    private Customer customer;

    public void removeProduct(BasketProduct existingProduct) {
    }

    public void addProduct(BasketProduct newBasketProduct) {
    }
}