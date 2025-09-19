package com.SSS.Ecommerce.repository;

import com.SSS.Ecommerce.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.security.PublicKey;
import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    @Query("Select r from Review r Where r.product.id=:productId")
    public List<Review>getAllProductsReview(@Param("productId")Long productId);
}
