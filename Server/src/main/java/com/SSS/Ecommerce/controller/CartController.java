package com.SSS.Ecommerce.controller;

import com.SSS.Ecommerce.exception.ProductException;
import com.SSS.Ecommerce.exception.UserException;
import com.SSS.Ecommerce.model.Cart;
import com.SSS.Ecommerce.model.User;
import com.SSS.Ecommerce.request.AddItemRequest;
import com.SSS.Ecommerce.response.ApiResponse;
import com.SSS.Ecommerce.service.CartService;
import com.SSS.Ecommerce.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
//@Tag(name="Cart Management",description="find user cart, add item to cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @Autowired
    private UserService userService;

    @GetMapping("/")
    public ResponseEntity<Cart>findUserCart(@RequestHeader("Authorization")String jwt)throws UserException{
        User user = userService.findUserProfileByJwt(jwt);
        Cart cart = cartService.findUserCart(user.getId());

        return  new ResponseEntity<Cart>(cart, HttpStatus.OK);
    }
    @PutMapping("/add")
    public ResponseEntity<ApiResponse>AddItemToCart(@RequestBody AddItemRequest req, @RequestHeader("Authorization")String jwt)
        throws UserException, ProductException{
        User user = userService.findUserProfileByJwt(jwt);

        cartService.addCartItem(user.getId(),req);
        ApiResponse res = new ApiResponse();
        res.setMessage("Product created successfully");
        res.setStatus(true);

        return new ResponseEntity<>(res, HttpStatus.CREATED);
    }
}
