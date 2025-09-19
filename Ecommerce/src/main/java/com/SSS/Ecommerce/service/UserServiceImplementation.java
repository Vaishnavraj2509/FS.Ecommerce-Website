package com.SSS.Ecommerce.service;

import com.SSS.Ecommerce.config.JwtProvider;
import com.SSS.Ecommerce.exception.UserException;
import com.SSS.Ecommerce.model.User;
import com.SSS.Ecommerce.repository.UserRepo;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImplementation implements UserService{

    private UserRepo userRepo;
    private JwtProvider jwtProvider;

    public UserServiceImplementation( UserRepo userRepo, JwtProvider jwtProvider ){
        this.userRepo=userRepo;
        this.jwtProvider=jwtProvider;

    }
    @Override
    public User findUserById(Long userId) throws UserException {

        Optional<User>user=userRepo.findById(userId);
        if(user.isPresent()) {
            return user.get();
        }
        throw new UserException("User not found with id:" + userId);
    }

    @Override
    public User findUserProfileByJwt(String jwt) throws UserException {
        String email = jwtProvider.getEmailFromToken(jwt);

        User user = userRepo.findByEmail(email);

        if(user==null){
            throw new UserException("User not found with email"+email);
        }
        return user;
    }
}
