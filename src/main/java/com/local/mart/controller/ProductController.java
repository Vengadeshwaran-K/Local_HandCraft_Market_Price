package com.local.mart.controller;

import com.local.mart.entity.ProductEntity;
import com.local.mart.service.ProductService;
import com.local.mart.util.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/products")
@CrossOrigin(origins = "*")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @PostMapping
    public Response create(@RequestBody ProductEntity product){
        return productService.createProducts(product);
    }

    @GetMapping
    public List<ProductEntity> getAllProducts(){
        return productService.getProducts();
    }

    @GetMapping("/{id}")
    public ProductEntity getProduct(@PathVariable int id){
        return productService.getProduct(id);
    }

    @PutMapping
    public Response update(@RequestBody ProductEntity product){
        return productService.updateProduct(product);
    }

    @DeleteMapping("/{id}")
    public Response delete(@PathVariable int id){
        return productService.deleteProduct(id);
    }
}