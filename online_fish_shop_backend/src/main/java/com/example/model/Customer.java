package com.example.model;

import com.example.Enum.Role;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Setter
@Getter
@DiscriminatorValue("customer")
public class Customer extends User{

    public Customer(){
        this.setRole(Role.CUSTOMER);
    }

    @OneToMany(mappedBy = "customer",cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Order> orders;

    @OneToOne(mappedBy = "customer", cascade = CascadeType.ALL)
    private Basket basket;

    @OneToOne(mappedBy = "customer", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private FavoriteList favoriteList;


}
