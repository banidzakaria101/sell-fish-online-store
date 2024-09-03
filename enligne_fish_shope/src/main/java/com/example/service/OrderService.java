package com.example.service;

import com.example.Enum.Status;
import com.example.model.Customer;
import com.example.model.Order;
import com.example.repository.CustomerRepository;
import com.example.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private CustomerRepository customerRepository;

    public Order makeOrder(Order order, Long customer_Id) {
        Optional<Customer> customer = customerRepository.findById(customer_Id);

        order.setCustomer(customer.get());
        order.setOrderDate(LocalDateTime.now());
        order.setStatus(Status.PENDING);

        return orderRepository.save(order);
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }
}
