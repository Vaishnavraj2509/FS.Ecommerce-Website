package com.SSS.Ecommerce.service;

import com.SSS.Ecommerce.exception.CartItemException;
import com.SSS.Ecommerce.exception.UserException;
import com.SSS.Ecommerce.model.Cart;
import com.SSS.Ecommerce.model.CartItem;
import com.SSS.Ecommerce.model.Product;

public interface CartItemService {

    public CartItem createCartItem(CartItem cartItem);

    public CartItem updateCartItem(Long userId, Long id, CartItem cartItem) throws CartItemException, UserException;

    public CartItem isCartItemExist(Cart cart, Product product, String size, Long userId);

    public void removeCartItem(Long userId, Long CartItemId) throws CartItemException,UserException;

    public CartItem findCartItemById(Long cartItemId) throws CartItemException;

}
