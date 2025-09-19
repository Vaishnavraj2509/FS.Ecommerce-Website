package com.SSS.Ecommerce.service;

import com.SSS.Ecommerce.exception.ProductException;
import com.SSS.Ecommerce.model.Cart;
import com.SSS.Ecommerce.model.User;
import com.SSS.Ecommerce.request.AddItemRequest;

public interface CartService {

    public Cart createCart(User user);

    public String addCartItem(Long userId, AddItemRequest req) throws ProductException;

    public Cart findUserCart(Long userId);
}
