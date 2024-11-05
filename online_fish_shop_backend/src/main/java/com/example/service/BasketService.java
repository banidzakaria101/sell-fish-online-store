package com.example.service;

import com.example.dto.BasketDTO;
import com.example.dto.BasketProductDTO;
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
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BasketService {

    @Autowired
    private BasketRepository basketRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    @Transactional
    public BasketDTO addProductToBasket(Long customerId, Long productId) {
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
                basket = basketRepository.save(basket); // Save new basket to database
                customer.setBasket(basket); // Link basket to customer
                userRepository.save(customer); // Update customer in database
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
                basket.addProduct(newBasketProduct); // Add to basket's product list
            }

            // Save the updated basket
            basketRepository.save(basket); // Ensure the basket is saved with updated products
            return convertToDTO(basket);
        }

        throw new RuntimeException("Customer or Product not found");
    }

    public BasketDTO removeProductFromBasket(Long customerId, Long productId) {
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
                    basket = basketRepository.save(basket);
                    return convertToDTO(basket);
                }
            }
        }

        throw new RuntimeException("Customer or Product not found");
    }

    public BasketDTO getBasketByCustomerId(Long customerId) {
        Optional<Customer> customerOpt = userRepository.findById(customerId)
                .filter(user -> user instanceof Customer)
                .map(user -> (Customer) user);

        if (customerOpt.isPresent()) {
            return convertToDTO(customerOpt.get().getBasket());
        }

        throw new CustomerNotFoundException("Customer not found");
    }

    // Conversion method
    private BasketDTO convertToDTO(Basket basket) {
        if (basket == null) return null;

        List<BasketProductDTO> productDTOs = basket.getProducts().stream()
                .map(bp -> new BasketProductDTO(bp.getId(), bp.getProduct().getId(), bp.getQuantity()))
                .toList();

        return new BasketDTO(basket.getId(), productDTOs);
    }

    public List<BasketProductDTO> getProductByBasket(Long basketId) {
        List<BasketProduct> basketProducts = basketRepository.findBasketProductsByBasketId(basketId);

        // Convert each BasketProduct to BasketProductDTO
        return basketProducts.stream()
                .map(bp -> new BasketProductDTO(bp.getId(), bp.getProduct().getId(), bp.getQuantity()))
                .collect(Collectors.toList());
    }
}