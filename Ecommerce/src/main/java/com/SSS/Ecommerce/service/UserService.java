package com.SSS.Ecommerce.service;

import com.SSS.Ecommerce.exception.UserException;
import com.SSS.Ecommerce.model.User;

public interface UserService {

    public User findUserById(Long UserId) throws UserException;

    public User findUserProfileByJwt(String jwt) throws UserException;

}
