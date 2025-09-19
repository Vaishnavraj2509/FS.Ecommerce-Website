package com.SSS.Ecommerce.repository;

import com.SSS.Ecommerce.model.Order;
import com.SSS.Ecommerce.model.Product;
import com.SSS.Ecommerce.model.Rating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {

    @Query("SELECT DISTINCT o FROM Order o JOIN o.orderItems i WHERE i.product.id = :productId")
    List<Order> getAllProductsOrder(@Param("productId") Long productId);


}
