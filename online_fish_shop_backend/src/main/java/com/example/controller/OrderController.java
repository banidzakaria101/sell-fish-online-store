package com.example.controller;

import com.example.Enum.Status;
import com.example.dto.OrderDTO;
import com.example.model.Order;
import com.example.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @GetMapping("/orders/{customerId}")
    public ResponseEntity<List<OrderDTO>> getAllOrders(@PathVariable Long customerId) {
        List<OrderDTO> orders = orderService.getAllOrdersByCustomerId(customerId);
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<OrderDTO> createOrder(
            @RequestParam Long customerId,
            @RequestParam Long productId) {
        OrderDTO orderDTO = orderService.createOrder(customerId, productId);
        return new ResponseEntity<>(orderDTO, HttpStatus.CREATED);
    }


    @GetMapping("/all")
    public ResponseEntity<List<OrderDTO>> getAllOrders() {
        List<OrderDTO> orders = orderService.getAllOrders();
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }


    @PutMapping("/{orderId}/status")
    public ResponseEntity<String> updateOrderStatus(
            @PathVariable Long orderId,
            @RequestParam Status status) {
        boolean isUpdated = orderService.updateOrderStatus(orderId, status);
        if (isUpdated) {
            return new ResponseEntity<>("Order status updated successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Order not found", HttpStatus.NOT_FOUND);
        }
    }
}