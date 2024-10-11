package com.example.model;

import com.example.Enum.Role;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Setter
@Getter
@DiscriminatorValue("admin")
public class Admin extends User{

    public Admin() {
        this.setRole(Role.ADMIN);
    }

    @OneToMany(mappedBy = "admin", cascade = CascadeType.ALL)
    List<Product> products;
}
