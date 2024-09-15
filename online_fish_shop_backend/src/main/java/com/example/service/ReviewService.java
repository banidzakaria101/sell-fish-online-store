package com.example.service;

import com.example.model.Customer;
import com.example.model.Product;
import com.example.model.Review;
import com.example.repository.CustomerRepository;
import com.example.repository.ProductRepository;
import com.example.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private CustomerRepository customerRepository;

    public Review addReview(Long productId, Long customerId, int rating, String comment) {
        Optional<Product> product = productRepository.findById(productId);
        if (product.isPresent()) {
            Review review = new Review();
            review.setRating(rating);
            review.setComment(comment);
            review.setProduct(product.get());
            review.setReviewDate(LocalDateTime.now());

            Optional<Customer> customer = customerRepository.findById(customerId);
            if (customer.isPresent()) {
            review.setCustomer(customer.get());
                return reviewRepository.save(review);
            } else {
                throw new RuntimeException("Customer not found");
            }
        }else{
            throw new RuntimeException("Product not found");
        }

    }

    public List<Review> getReviews(Long productId) {
        Optional<Product> product = productRepository.findById(productId);
        if (product.isPresent()) {
            return product.get().getReviews();
        } else {
            throw new RuntimeException("Product not found");
        }
    }

    public void deleteReview(Long reviewId, Long customerId) {
        Optional<Review> existingReview = reviewRepository.findById(reviewId);
        if (existingReview.isPresent()) {
            Review review = existingReview.get();
            if (review.getCustomer().getId().equals(customerId)) {
                reviewRepository.delete(review);
            } else {
                throw new RuntimeException("you can only delete your own reviews");
            }
        }else{
            throw new RuntimeException("Review not found");
        }
    }

    public Review updateReview(Long productId, Long customerId, Long reviewId, int rating, String comment) {
        Optional<Product> product = productRepository.findById(productId);
        if (product.isPresent()) {
            Optional<Review> existingReview = reviewRepository.findById(reviewId);
            if (existingReview.isPresent()) {
                Review review = existingReview.get();
                if (review.getCustomer().getId().equals(customerId)) {
                    review.setRating(rating);
                    review.setComment(comment);
                    review.setReviewDate(LocalDateTime.now());

                    return reviewRepository.save(review);
                }
            }
        }
        throw new RuntimeException("Product not found");
    }
}
