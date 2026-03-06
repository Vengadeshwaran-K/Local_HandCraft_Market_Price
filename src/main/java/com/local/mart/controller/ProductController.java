package com.local.mart.controller;

import com.local.mart.entity.ProductEntity;
import com.local.mart.service.ProductService;
import com.local.mart.util.Response;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import org.springframework.security.access.prepost.PreAuthorize;

@RestController
@RequestMapping("/products")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public Response create(@RequestBody ProductEntity product) {
        return productService.createProducts(product);
    }

    @GetMapping
    public List<ProductEntity> getAllProducts() {
        return productService.getProducts();
    }

    @GetMapping("/{id}")
    public ProductEntity getProduct(@PathVariable int id) {
        return productService.getProduct(id);
    }

    @PutMapping
    @PreAuthorize("hasRole('ADMIN')")
    public Response update(@RequestBody ProductEntity product) {
        return productService.updateProduct(product);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public Response delete(@PathVariable int id) {
        return productService.deleteProduct(id);
    }
}