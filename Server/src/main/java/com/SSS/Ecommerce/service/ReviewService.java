package com.SSS.Ecommerce.service;

import com.SSS.Ecommerce.exception.ProductException;
import com.SSS.Ecommerce.model.Review;
import com.SSS.Ecommerce.model.User;
import com.SSS.Ecommerce.request.ReviewRequest;

import java.util.List;

public interface ReviewService {

    public Review createReview(ReviewRequest req, User user) throws ProductException;
    public List<Review> getAllReview(Long productId);

}
