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
import java.util.stream.Collectors;

@Service
public class OrderService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private CustomerRepository customerRepository;

//    public Order makeOrder(OrderDTO orderDTO, Long customerId) {
//        Optional<Customer> customerOptional = customerRepository.findById(customerId);
//        Optional<Product> productOptional = productRepository.findById(orderDTO.getProductId());
//
//        if (customerOptional.isEmpty() || productOptional.isEmpty()) {
//            throw new RuntimeException("Customer or Product not found");
//        }
//
//        Customer customer = customerOptional.get();
//        Product product = productOptional.get();
//
//        Order order = new Order();
//        order.setCustomer(customer);
//        order.setProduct(product);
//        order.setOrderDate(LocalDateTime.now());
//        order.setStatus(Status.PENDING);
//        order.setTotalAmount(product.getPrice() * orderDTO.getQuantity());
//
//        return orderRepository.save(order);
//    }

    // Convert Order to OrderDTO for frontend consumption
    public List<OrderDTO> getAllOrdersByCustomerId(Long customerId) {
        return orderRepository.findByCustomerId(customerId).stream().map(order -> {
            OrderDTO dto = new OrderDTO();
            dto.setProductName(order.getProduct().getName());
            dto.setProductPrice(order.getProduct().getPrice());
            dto.setOrderDate(order.getOrderDate());
            dto.setStatus(order.getStatus());
            dto.setTotalAmount(order.getTotalAmount());
            return dto;
        }).collect(Collectors.toList());
    }

    public OrderDTO createOrder(Long customerId, Long productId) {
        Optional<Customer> customerOpt = customerRepository.findById(customerId);
        Optional<Product> productOpt = productRepository.findById(productId);

        if (customerOpt.isEmpty() || productOpt.isEmpty()) {
            throw new RuntimeException("Customer or Product not found");
        }

        Customer customer = customerOpt.get();
        Product product = productOpt.get();

        Order order = new Order();
        order.setCustomer(customer);
        order.setProduct(product);
        order.setOrderDate(LocalDateTime.now());
        order.setStatus(Status.PENDING);
        order.setTotalAmount(product.getPrice());

        order = orderRepository.save(order);

        // Create an OrderDTO from the saved Order
        OrderDTO orderDTO = new OrderDTO();
        orderDTO.setProductId(product.getId());
        orderDTO.setProductName(product.getName());
        orderDTO.setCustomerName(order.getCustomer().getUsername());
        orderDTO.setProductPrice(product.getPrice());
        orderDTO.setQuantity(1);
        orderDTO.setOrderDate(order.getOrderDate());
        orderDTO.setStatus(order.getStatus());
        orderDTO.setTotalAmount(order.getTotalAmount());

        return orderDTO;
    }


    public List<OrderDTO> getAllOrders() {
        return orderRepository.findAll().stream().map(order -> {
            OrderDTO dto = new OrderDTO();
            dto.setId(order.getId());
            dto.setProductName(order.getProduct().getName());
            dto.setProductPrice(order.getProduct().getPrice());
            dto.setOrderDate(order.getOrderDate());
            dto.setStatus(order.getStatus());
            dto.setTotalAmount(order.getTotalAmount());
            dto.setCustomerName(order.getCustomer().getUsername());
            dto.setDeliveryAddress(order.getCustomer().getAddress());
            dto.setProductName(order.getProduct().getName());
            return dto;
        }).collect(Collectors.toList());
    }

    public boolean updateOrderStatus(Long orderId, Status status) {
        Optional<Order> orderOptional = orderRepository.findById(orderId);
        if (orderOptional.isPresent()) {
            Order order = orderOptional.get();
            order.setStatus(status);
            orderRepository.save(order);
            return true;
        } else {
            return false;
        }
    }

}
