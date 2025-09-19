package com.SSS.Ecommerce.service;

import com.SSS.Ecommerce.exception.CartItemException;
import com.SSS.Ecommerce.exception.UserException;
import com.SSS.Ecommerce.model.Cart;
import com.SSS.Ecommerce.model.CartItem;
import com.SSS.Ecommerce.model.Product;
import com.SSS.Ecommerce.model.User;
import com.SSS.Ecommerce.repository.CartItemRepository;
import com.SSS.Ecommerce.repository.CartRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Optional;

@Service
public class CartItemServiceImplementation implements CartItemService{

    private CartItemRepository cartItemRepository;
    private UserService userService;
    private CartRepository cartRepository;

    public CartItemServiceImplementation(CartItemRepository cartItemRepository, UserService userService, CartRepository cartRepository){
        this.cartItemRepository=cartItemRepository;
        this.userService=userService;
        this.cartRepository=cartRepository;
    }
    @Override
    public CartItem createCartItem(CartItem cartItem) {
        cartItem.setQuantity(1);
        cartItem.setPrice(cartItem.getProduct().getPrice()*cartItem.getQuantity());
        cartItem.setDiscountedPrice(cartItem.getProduct().getDiscountedPrice()*cartItem.getQuantity());

        CartItem createdCartItem = cartItemRepository.save(cartItem);

        return createdCartItem;


    }


    @Override
    public CartItem updateCartItem(Long userId, Long id, CartItem cartItem) throws CartItemException, UserException {

        CartItem item = findCartItemById(id);
        User user = userService.findUserById(item.getUserId());

        if(user.getId().equals(userId)){
          item.setQuantity(cartItem.getQuantity());
          item.setPrice(item.getQuantity()*item.getProduct().getPrice());
          item.setDiscountedPrice(item.getProduct().getPrice()*cartItem.getQuantity());
        }
        return cartItemRepository.save(item);
    }

    @Override
    public CartItem isCartItemExist(Cart cart, Product product, String size, Long userId) {

        CartItem cartItem = cartItemRepository.isCartItemExist(cart, product, size, userId);

        return cartItem;
    }

    @Override
    public void removeCartItem(Long userId, Long cartItemId) throws CartItemException, UserException {

        CartItem cartItem = findCartItemById(cartItemId);
        //FOUND USER
        User user = userService.findUserById(cartItem.getUserId());

        //FOUND ALREADY REGISTERED USER
        User reqUser = userService.findUserById(userId);

        if(user.getId().equals((reqUser.getId()))){
            cartItemRepository.deleteById(cartItemId);
        }
        else{
            throw new UserException("You can't remove another users item");
        }

    }

    @Override
    public CartItem findCartItemById(Long cartItemId) throws CartItemException {

        Optional<CartItem> opt = cartItemRepository.findById(cartItemId);

        if(opt.isPresent()) {
            return opt.get();
        }
        throw new CartItemException("cartItem not found with id:"+ cartItemId);
    }
}
