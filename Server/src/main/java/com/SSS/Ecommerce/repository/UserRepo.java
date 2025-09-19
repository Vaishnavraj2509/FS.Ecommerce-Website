package com.SSS.Ecommerce.repository;

import com.SSS.Ecommerce.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepo extends JpaRepository<User, Long>{

    public User findByEmail(String email);



}
