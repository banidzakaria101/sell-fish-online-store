package com.example.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Shipping {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String shippingAddress;

    @Column(nullable = false)
    private LocalDate shippingDate;

    @Column(nullable = false)
    private LocalDate deliveryDate;

    @OneToOne
    @JoinColumn(name = "order_id")
    private Order order;

}
