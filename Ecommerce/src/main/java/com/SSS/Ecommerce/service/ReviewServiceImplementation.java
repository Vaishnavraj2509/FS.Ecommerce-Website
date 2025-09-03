package com.SSS.Ecommerce.service;

import com.SSS.Ecommerce.exception.ProductException;
import com.SSS.Ecommerce.model.Product;
import com.SSS.Ecommerce.model.Review;
import com.SSS.Ecommerce.model.User;
import com.SSS.Ecommerce.repository.ProductRepository;
import com.SSS.Ecommerce.repository.ReviewRepository;
import com.SSS.Ecommerce.request.ReviewRequest;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ReviewServiceImplementation implements ReviewService {

    private ReviewRepository reviewRepository;
    private ProductService productService;
    private ProductRepository productRepository;

    public ReviewServiceImplementation(ReviewRepository reviewRepository, ProductService productService,ProductRepository productRepository){
        this.reviewRepository=reviewRepository;
        this.productService=productService;
    }

    @Override
    public Review createReview(ReviewRequest req, User user) throws ProductException {
        Product product = productService.findProductById(req.getProductId());

        Review review = new Review();
        review.setUser(user);
        review.setProduct(product);
        review.setReview(req.getReview());
        review.setCreatedAt(LocalDateTime.now());

        return reviewRepository.save(review);
    }

    @Override
    public List<Review> getAllReview(Long productId) {

        return reviewRepository.getAllProductsReview(productId);
    }
}
