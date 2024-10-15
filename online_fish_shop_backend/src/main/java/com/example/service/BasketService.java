package com.example.service;

import com.example.exception.CustomerNotFoundException;
import com.example.exception.ProductNotFoundException;
import com.example.model.Basket;
import com.example.model.BasketProduct; // Ensure this model exists to handle product quantities
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

    public Basket addProductToBasket(Long customerId, Long productId) {
        Optional<Customer> customerOpt = userRepository.findById(customerId)
                .filter(user -> user instanceof Customer)
                .map(user -> (Customer) user);
        Optional<Product> productOpt = productRepository.findById(productId);

        if (customerOpt.isPresent() && productOpt.isPresent()) {
            Customer customer = customerOpt.get();
            Product product = productOpt.get();

            Basket basket = customer.getBasket();
            if (basket == null) {
                basket = new Basket();
                basket.setCustomer(customer);
            }

            // Check if the product is already in the basket
            Optional<BasketProduct> existingProductOpt = basket.getProducts().stream()
                    .filter(bp -> bp.getProduct().getId().equals(productId))
                    .findFirst();

            if (existingProductOpt.isPresent()) {
                // Increase quantity if the product exists
                BasketProduct existingProduct = existingProductOpt.get();
                existingProduct.setQuantity(existingProduct.getQuantity() + 1);
            } else {
                // Add new product to basket
                BasketProduct newBasketProduct = new BasketProduct();
                newBasketProduct.setProduct(product);
                newBasketProduct.setQuantity(1); // Initialize with quantity 1
                basket.addProduct(newBasketProduct);
            }

            return basketRepository.save(basket);
        }

        throw new RuntimeException("Customer or Product not found");
    }

    public Basket removeProductFromBasket(Long customerId, Long productId) {
        Optional<Customer> customerOpt = userRepository.findById(customerId)
                .filter(user -> user instanceof Customer)
                .map(user -> (Customer) user);
        Optional<Product> productOpt = productRepository.findById(productId);

        if (customerOpt.isPresent() && productOpt.isPresent()) {
            Customer customer = customerOpt.get();
            Product product = productOpt.get();

            Basket basket = customer.getBasket();
            if (basket != null) {
                Optional<BasketProduct> existingProductOpt = basket.getProducts().stream()
                        .filter(bp -> bp.getProduct().getId().equals(productId))
                        .findFirst();

                if (existingProductOpt.isPresent()) {
                    BasketProduct existingProduct = existingProductOpt.get();
                    if (existingProduct.getQuantity() > 1) {
                        // Decrease quantity if more than 1
                        existingProduct.setQuantity(existingProduct.getQuantity() - 1);
                    } else {
                        basket.removeProduct(existingProduct);
                    }
                    return basketRepository.save(basket);
                }
            }
        }

        throw new RuntimeException("Customer or Product not found");
    }

    public Basket getBasketByCustomerId(Long customerId) {
        Optional<Customer> customerOpt = userRepository.findById(customerId)
                .filter(user -> user instanceof Customer)
                .map(user -> (Customer) user);

        if (customerOpt.isPresent()) {
            return customerOpt.get().getBasket();
        }

        throw new CustomerNotFoundException("Customer not found");
    }
}