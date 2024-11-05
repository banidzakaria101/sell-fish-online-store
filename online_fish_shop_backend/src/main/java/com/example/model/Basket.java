package com.example.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
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

    @OneToMany(mappedBy = "basket", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<BasketProduct> products = new ArrayList<>();

    @OneToOne
    private Customer customer;

    public void removeProduct(BasketProduct existingProduct) {
        products.remove(existingProduct);
    }

    public void addProduct(BasketProduct newBasketProduct) {
        products.add(newBasketProduct);
        newBasketProduct.setBasket(this);
    }
}