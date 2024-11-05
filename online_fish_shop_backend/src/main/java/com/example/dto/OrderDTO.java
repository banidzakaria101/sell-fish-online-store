package com.example.dto;

import com.example.Enum.Status;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class OrderDTO {
    private Long id;
    private Long productId;
    private Integer quantity;

    private String productName;
    private Double productPrice;
    private LocalDateTime orderDate;
    private Status status;
    private Double totalAmount;
    private String customerName;
    private String deliveryAddress;
}