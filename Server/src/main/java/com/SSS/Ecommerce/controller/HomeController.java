package com.SSS.Ecommerce.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class HomeController {

    @GetMapping("/")
    public ResponseEntity<Map<String, Object>> home() {
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Welcome to SSS Ecommerce API");
        response.put("status", "Server is running successfully");
        response.put("version", "1.0.0");
        response.put("baseUrl", "http://localhost:5454");
        
        Map<String, String> endpoints = new HashMap<>();
        endpoints.put("User Registration", "POST /auth/signup");
        endpoints.put("User Login", "POST /auth/signin");
        endpoints.put("Get Products", "GET /api/products");
        endpoints.put("User Profile", "GET /api/users/profile");
        endpoints.put("Shopping Cart", "GET /api/cart/");
        endpoints.put("Create Order", "POST /api/orders/");
        endpoints.put("API Documentation", "See README.md for complete API documentation");
        
        response.put("availableEndpoints", endpoints);
        response.put("timestamp", java.time.LocalDateTime.now());
        
        return ResponseEntity.ok(response);
    }

    @GetMapping("/health")
    public ResponseEntity<Map<String, String>> health() {
        Map<String, String> status = new HashMap<>();
        status.put("status", "UP");
        status.put("database", "Connected");
        status.put("server", "Running");
        return ResponseEntity.ok(status);
    }
}