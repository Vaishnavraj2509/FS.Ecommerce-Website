package com.SSS.Ecommerce.controller;

import com.SSS.Ecommerce.model.Cart;
import com.SSS.Ecommerce.model.User;
import com.SSS.Ecommerce.exception.UserException;
import com.SSS.Ecommerce.service.CartService;
import com.SSS.Ecommerce.service.CustomUserServiceImplementation;
import com.SSS.Ecommerce.repository.UserRepo;
import com.SSS.Ecommerce.request.LoginRequest;
import com.SSS.Ecommerce.response.AuthResponse;
import com.SSS.Ecommerce.config.JwtProvider;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private UserRepo userRepo;
    private JwtProvider jwtProvider;
    private PasswordEncoder passwordEncoder;
    private CustomUserServiceImplementation customUserService;
    private CartService cartService;

    public AuthController(UserRepo userRepo,
                          CustomUserServiceImplementation customUserService,
                          PasswordEncoder passwordEncoder,
                          JwtProvider jwtProvider, CartService cartService) {
        this.userRepo = userRepo;
        this.customUserService = customUserService;
        this.passwordEncoder = passwordEncoder;
        this.jwtProvider = jwtProvider;
        this.cartService = cartService;
    }

    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> createUserHandler(@RequestBody User user) throws UserException {
        String email = user.getEmail();                 // DEBUG BREAKPOINT 1: Inspect incoming data
        String password = user.getPassword();
        String firstName = user.getFirstName();
        String lastName = user.getLastName();

        User isEmailExist = userRepo.findByEmail(email); // DEBUG BREAKPOINT 2: Check DB for existing user
        if (isEmailExist != null) {
            throw new UserException("Email is already used with another account");
        }

        User createdUser = new User();
        createdUser.setEmail(email);
        createdUser.setPassword(passwordEncoder.encode(password));
        createdUser.setFirstName(firstName);
        createdUser.setLastName(lastName);

        User savedUser = userRepo.save(createdUser);// DEBUG BREAKPOINT 3: After saving user
        Cart cart = cartService.createCart(savedUser);

        Authentication authentication = new UsernamePasswordAuthenticationToken(savedUser.getEmail(), savedUser.getPassword());
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = jwtProvider.generateToken(authentication); // DEBUG BREAKPOINT 4: Inspect token generation
        AuthResponse authResponse = new AuthResponse();
        authResponse.setJwt(token);
        authResponse.setMessage("Signup Success");

        return new ResponseEntity<>(authResponse, HttpStatus.CREATED); // DEBUG BREAKPOINT 5: Inspect final response
    }

    @PostMapping("/signin")
    public ResponseEntity<AuthResponse> loginUserHandler(@RequestBody LoginRequest loginRequest) {
        String username = loginRequest.getEmail();  // DEBUG BREAKPOINT 6: Inspect login request email
        String password = loginRequest.getPassword(); // DEBUG BREAKPOINT 7: Inspect password

        Authentication authentication = authenticate(username, password); // DEBUG BREAKPOINT 8: After authentication
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = jwtProvider.generateToken(authentication); // DEBUG BREAKPOINT 9: Inspect token generation
        AuthResponse authResponse = new AuthResponse();
        authResponse.setJwt(token);
        authResponse.setMessage("Signin Success");
        return new ResponseEntity<>(authResponse, HttpStatus.CREATED); // DEBUG BREAKPOINT 10: Inspect final response
    }

    private Authentication authenticate(String username, String password) {
        UserDetails userDetails = customUserService.loadUserByUsername(username); // DEBUG BREAKPOINT 11: Inspect DB-loaded user

        if (userDetails == null) {
            throw new BadCredentialsException("Invalid Username");
        }
        if (!passwordEncoder.matches(password, userDetails.getPassword())) { // DEBUG BREAKPOINT 12: Password validation
            throw new BadCredentialsException("Invalid Password...");
        }

        return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
    }
}
