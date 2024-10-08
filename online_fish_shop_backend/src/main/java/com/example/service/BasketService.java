package com.example.service;

import com.example.model.Basket;
import com.example.model.Customer;
import com.example.model.Product;
import com.example.repository.BasketRepository;
import com.example.repository.ProductRepository;
import com.example.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class BasketService {

    @Autowired
    private BasketRepository basketRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    // Add a product to the basket of the customer
    public Basket addProductToBasket(Long customerId, Long productId) {
        Optional<Customer> customerOpt = userRepository.findById(customerId).filter(user -> user instanceof Customer).map(user -> (Customer) user);
        Optional<Product> productOpt = productRepository.findById(productId);

        if (customerOpt.isPresent() && productOpt.isPresent()) {
            Customer customer = customerOpt.get();
            Product product = productOpt.get();

            Basket basket = customer.getBasket();  // Assuming Basket is initialized in the Customer entity
            if (basket == null) {
                basket = new Basket();
                basket.setCustomer(customer);
            }

            basket.addProduct(product);
            return basketRepository.save(basket);
        }

        throw new RuntimeException("Customer or Product not found");
    }

    // Remove a product from the basket
    public Basket removeProductFromBasket(Long customerId, Long productId) {
        Optional<Customer> customerOpt = userRepository.findById(customerId).filter(user -> user instanceof Customer).map(user -> (Customer) user);
        Optional<Product> productOpt = productRepository.findById(productId);

        if (customerOpt.isPresent() && productOpt.isPresent()) {
            Customer customer = customerOpt.get();
            Product product = productOpt.get();

            Basket basket = customer.getBasket();
            if (basket != null) {
                basket.removeProduct(product);
                return basketRepository.save(basket);
            }
        }

        throw new RuntimeException("Customer or Product not found");
    }
}
