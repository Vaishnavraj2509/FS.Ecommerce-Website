package com.SSS.Ecommerce.service;

import com.SSS.Ecommerce.exception.ProductException;
import com.SSS.Ecommerce.model.Rating;
import com.SSS.Ecommerce.model.User;
import com.SSS.Ecommerce.request.RatingRequest;
import org.springframework.stereotype.Service;

import java.util.List;

public interface RatingService{

    public Rating createRating(RatingRequest req, User user) throws ProductException;
    public List<Rating> getProducts(Long productId);

//   public  List<Rating> getProductsRating(Long productId);
}
