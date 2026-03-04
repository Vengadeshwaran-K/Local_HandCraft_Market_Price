package com.local.mart.controller;

import com.local.mart.entity.ProductEntity;
import com.local.mart.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
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
public class ProductController {

    @Autowired
    ProductService productService;

    @PostMapping("/create")
    public String create(@RequestBody ProductEntity product){
        return productService.createProducts(product);
    }

    @GetMapping("/GetAllproducts")
    public  List<ProductEntity> getAllProducts(){
        return productService.getProducts();
    }

    @GetMapping("/{id}/product")
    public ProductEntity getProduct(@PathVariable int id){
        return productService.getProduct(id);
    }

    @PutMapping("/update")
    public String update(@RequestBody ProductEntity product){
        return productService.updateProduct(product);
    }

    @DeleteMapping("/{id}/delete")
    public String delete(@PathVariable int id){
        return productService.deleteProduct(id);
    }
}
