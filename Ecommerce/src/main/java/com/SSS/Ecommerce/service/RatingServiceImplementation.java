package com.SSS.Ecommerce.service;

import com.SSS.Ecommerce.exception.ProductException;
import com.SSS.Ecommerce.model.Product;
import com.SSS.Ecommerce.model.Rating;
import com.SSS.Ecommerce.model.User;
import com.SSS.Ecommerce.repository.RatingRepository;
import com.SSS.Ecommerce.request.RatingRequest;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class RatingServiceImplementation implements RatingService{

    private RatingRepository ratingRepository;
    private ProductService productService;

    public RatingServiceImplementation(RatingService ratingService, ProductService productService){
        this.ratingRepository = ratingRepository;
        this.productService = productService;
    }
    @Override
    public Rating createRating(RatingRequest req, User user) throws ProductException {
        Product product = productService.findProductById(req.getProductId());

        Rating rating = new Rating();
        rating.setProduct(product);
        rating.setUser(user);
        rating.setRating(req.getRating());
        rating.setCreatedAt(LocalDateTime.now());
        return ratingRepository.save(rating);
    }

    @Override
    public List<Rating> getProducts(Long productId) {

        return ratingRepository.getAllProductsRating(productId);
    }
}
