package com.SSS.Ecommerce.service;

import com.SSS.Ecommerce.exception.OrderException;
import com.SSS.Ecommerce.model.Address;
import com.SSS.Ecommerce.model.Order;
import com.SSS.Ecommerce.model.User;
import com.SSS.Ecommerce.repository.CartRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderServiceImplementation implements OrderService{


    private CartRepository cartRepository;
    private CartService cartitemService;
    private ProductService productService;

    public OrderServiceImplementation(CartRepository cartRepository, CartService cartitemService, ProductService productService){
       this.cartitemService=cartitemService;
       this.cartRepository=cartRepository;
       this.productService=productService;
    }

    @Override
    public Order createdOrder(User user, Address shippingAddress) {
        return null;
    }

    @Override
    public Order findOrderById(Long orderId) throws OrderException {
        return null;
    }

    @Override
    public List<Order> usersOrderHistory(Long userId) {
        return List.of();
    }

    @Override
    public Order placedOrder(Long orderId) throws OrderException {
        return null;
    }

    @Override
    public Order confirmedOrder(Long orderId) throws OrderException {
        return null;
    }

    @Override
    public Order shippedOrder(Long orderId) throws OrderException {
        return null;
    }

    @Override
    public Order deliveredOrder(Long orderId) throws OrderException {
        return null;
    }

    @Override
    public Order cancledOrder(Long orderId) throws OrderException {
        return null;
    }

    @Override
    public List<Order> getAllOrders() {
        return List.of();
    }

    @Override
    public Order deleteOrder(Long orderId) throws OrderException {
        return null;
    }
}
