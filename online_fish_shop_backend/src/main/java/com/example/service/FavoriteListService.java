package com.example.service;

import com.example.model.Customer;
import com.example.model.FavoriteList;
import com.example.model.Product;
import com.example.repository.FavoriteListRepository;
import com.example.repository.ProductRepository;
import com.example.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class FavoriteListService {

    @Autowired
    private FavoriteListRepository favoriteListRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    public FavoriteList addProductToFavorites(Long customerId, Long productId) {
        Optional<Customer> customerOpt = userRepository.findById(customerId).filter(user -> user instanceof Customer).map(user -> (Customer) user);
        Optional<Product> productOpt = productRepository.findById(productId);

        if (customerOpt.isPresent() && productOpt.isPresent()) {
            Customer customer = customerOpt.get();
            Product product = productOpt.get();

            FavoriteList favoriteList = customer.getFavoriteList();
            if (favoriteList == null) {
                favoriteList = new FavoriteList();
                favoriteList.setCustomer(customer);
            }

            favoriteList.addProduct(product);
            return favoriteListRepository.save(favoriteList);
        }

        throw new RuntimeException("Customer or Product not found");
    }

    public FavoriteList removeProductFromFavorites(Long customerId, Long productId) {
        Optional<Customer> customerOpt = userRepository.findById(customerId).filter(user -> user instanceof Customer).map(user -> (Customer) user);
        Optional<Product> productOpt = productRepository.findById(productId);

        if (customerOpt.isPresent() && productOpt.isPresent()) {
            Customer customer = customerOpt.get();
            Product product = productOpt.get();

            FavoriteList favoriteList = customer.getFavoriteList();
            if (favoriteList != null) {
                favoriteList.removeProduct(product);
                return favoriteListRepository.save(favoriteList);
            }
        }

        throw new RuntimeException("Customer or Product not found");
    }

    public FavoriteList getFavoriteListByCustomerId(Long customerId) {
        Optional<Customer> customerOpt = userRepository.findById(customerId).filter(user -> user instanceof Customer).map(user -> (Customer) user);

        if (customerOpt.isPresent()) {
            return customerOpt.get().getFavoriteList();
        }

        throw new RuntimeException("Customer not found");
    }
}