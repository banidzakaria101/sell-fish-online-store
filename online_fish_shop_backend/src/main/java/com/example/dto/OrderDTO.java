package com.example.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrderDTO {
    private Long productId;
    private Integer quantity;
}