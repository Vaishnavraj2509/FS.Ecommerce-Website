package com.SSS.Ecommerce.controller;

import com.SSS.Ecommerce.exception.ProductException;
import com.SSS.Ecommerce.exception.UserException;
import com.SSS.Ecommerce.model.Rating;
import com.SSS.Ecommerce.model.User;
import com.SSS.Ecommerce.request.RatingRequest;
import com.SSS.Ecommerce.service.RatingService;
import com.SSS.Ecommerce.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ratings")
public class RatingController {

    @Autowired
    private UserService userService;

    @Autowired
    private RatingService ratingService;

    @PostMapping("/create")
    public ResponseEntity<Rating> createRating(@RequestBody RatingRequest req,
                                               @RequestHeader("Authorization")String jwt)throws UserException, ProductException{

        User user = userService.findUserProfileByJwt(jwt);
        Rating rating = ratingService.createRating(req,user);

        return new ResponseEntity<Rating>(rating, HttpStatus.CREATED);
    }

    @GetMapping("/product/{productId}")
    public ResponseEntity<List<Rating>> getProductsRating(@PathVariable Long productId,
                                                          @RequestHeader("Authorization")String jwt)throws UserException, ProductException{

        User user = userService.findUserProfileByJwt(jwt);
        List<Rating> ratings = ratingService.getProducts(productId);

        return new ResponseEntity<>(ratings, HttpStatus.CREATED);
    }

}
