package com.example.service;

import com.example.Enum.Status;
import com.example.dto.OrderDTO;
import com.example.model.Customer;
import com.example.model.Order;
import com.example.model.Product;
import com.example.repository.CustomerRepository;
import com.example.repository.OrderRepository;
import com.example.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class OrderService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private CustomerRepository customerRepository;

    public Order makeOrder(OrderDTO orderDTO, Long customerId) {
        Optional<Customer> customerOptional = customerRepository.findById(customerId);
        Optional<Product> productOptional = productRepository.findById(orderDTO.getProductId());

        if (customerOptional.isEmpty() || productOptional.isEmpty()) {
            throw new RuntimeException("Customer or Product not found");
        }

        Customer customer = customerOptional.get();
        Product product = productOptional.get();

        Order order = new Order();
        order.setCustomer(customer);
        order.setOrderDate(LocalDateTime.now());
        order.setStatus(Status.PENDING);
        order.setTotalAmount(product.getPrice() * orderDTO.getQuantity()); // Calculate total amount

        return orderRepository.save(order);
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }
}
