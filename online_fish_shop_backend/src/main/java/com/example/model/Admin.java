package com.example.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Setter
@Getter
@DiscriminatorValue("admin")
public class Admin extends User{

    @OneToMany(mappedBy = "admin", cascade = CascadeType.ALL)
    List<Product> products;
}
