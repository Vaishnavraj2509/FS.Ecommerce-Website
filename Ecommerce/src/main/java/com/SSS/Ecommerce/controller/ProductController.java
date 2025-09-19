package com.SSS.Ecommerce.controller;

import com.SSS.Ecommerce.exception.ProductException;
import com.SSS.Ecommerce.model.Product;
import com.SSS.Ecommerce.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    // Get products by filters (category, color, size, etc.)
    @GetMapping
    public ResponseEntity<Page<Product>> findProductByCategoryHandler(@RequestParam String category,
                                                                      @RequestParam List<String> color,
                                                                      @RequestParam List<String> size,
                                                                      @RequestParam Integer minPrice,
                                                                      @RequestParam Integer maxPrice,
                                                                      @RequestParam Integer minDiscount,
                                                                      @RequestParam String sort,
                                                                      @RequestParam String stock,
                                                                      @RequestParam Integer pageNumber,
                                                                      @RequestParam Integer pageSize) {

        Page<Product> res = productService.getAllProduct(
                category, color, size, minPrice, maxPrice, minDiscount, sort, stock, pageNumber, pageSize
        );

        System.out.println("complete products");
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    // Get product by ID
    @GetMapping("/id/{productId}")
    public ResponseEntity<Product> findProductByIdHandler(@PathVariable Long productId) throws ProductException {
        Product product = productService.findProductById(productId);
        return new ResponseEntity<Product>(product, HttpStatus.ACCEPTED);
    }
}
