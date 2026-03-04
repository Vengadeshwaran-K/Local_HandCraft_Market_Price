package com.local.mart.service;

import com.local.mart.Repository.ProductRepository;
import com.local.mart.entity.ProductEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductServiceImpl implements ProductService{

    @Autowired
    ProductRepository productRepo;

    @Override
    public String createProducts(ProductEntity product) {
        productRepo.save(product);
        return "Product Created";
    }

    @Override
    public List<ProductEntity> getProducts() {
        return productRepo.findAll();
    }

    @Override
    public ProductEntity getProduct(int id) {
        return productRepo.findById(id)
                .orElse(new ProductEntity());
    }

    @Override
    public String updateProduct(ProductEntity product) {
        int id=product.getId();
        ProductEntity product1=productRepo.findById(id).orElse(new ProductEntity());
        product1.setId(product.getId());
        product1.setName(product.getName());
        product1.setStock(product.getStock());
        product1.setPrice(product1.getPrice());
        product1.setDescription(product.getDescription());
        productRepo.save(product1);
        return "Updated Product";
    }

    @Override
    public String deleteProduct(int id) {
        productRepo.deleteById(id);
        return "Deleted";
    }
}
