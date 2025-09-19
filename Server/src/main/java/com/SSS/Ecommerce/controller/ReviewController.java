package com.SSS.Ecommerce.controller;

import com.SSS.Ecommerce.exception.ProductException;
import com.SSS.Ecommerce.exception.UserException;
import com.SSS.Ecommerce.model.Rating;
import com.SSS.Ecommerce.model.Review;
import com.SSS.Ecommerce.model.User;
import com.SSS.Ecommerce.request.ReviewRequest;
import com.SSS.Ecommerce.service.ReviewService;
import com.SSS.Ecommerce.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @Autowired
    private UserService userService;

    @PostMapping("/create")
    public ResponseEntity<Review>createReview(@RequestBody ReviewRequest req, @RequestHeader("Autorization")String jwt) throws UserException, ProductException{

        User user = userService.findUserProfileByJwt(jwt);
        Review review = reviewService.createReview(req,user);

        return new ResponseEntity<>(review, HttpStatus.CREATED);

    }

    @GetMapping("/product/{productId}")
    public ResponseEntity<List<Review>>getProductsReview(@PathVariable Long productId) throws UserException, ProductException{

        List<Review> reviews = reviewService.getAllReview(productId);

        return new ResponseEntity<>(reviews, HttpStatus.ACCEPTED);

    }

}
