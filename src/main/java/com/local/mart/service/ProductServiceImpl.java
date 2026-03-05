package com.local.mart.service;

import com.local.mart.Repository.ProductRepository;
import com.local.mart.entity.ProductEntity;
import com.local.mart.util.Response;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepo;

    public ProductServiceImpl(ProductRepository productRepo) {
        this.productRepo = productRepo;
    }

    @Override
    public Response createProducts(ProductEntity product) {

        if (product.getName() == null || product.getName().isBlank())
            return new Response("Product name cannot be empty");

        if (productRepo.existsByName(product.getName()))
            return  new Response("Product already exists");

        productRepo.save(product);
        return new Response("Product Created");
    }

    @Override
    public List<ProductEntity> getProducts() {
        return productRepo.findAll();
    }

    @Override
    public ProductEntity getProduct(int id) {
        return productRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));
    }

    @Override
    public Response updateProduct(ProductEntity product) {

        ProductEntity existingProduct = productRepo.findById(product.getId())
                .orElseThrow(() -> new RuntimeException("Product not found"));

        if (!existingProduct.getName().equals(product.getName()) &&
                productRepo.existsByName(product.getName())) {
            return new Response("Product name already exists");
        }

        existingProduct.setName(product.getName());
        existingProduct.setStock(product.getStock());
        existingProduct.setCategory(product.getCategory());
        existingProduct.setPrice(product.getPrice());   // FIXED
        existingProduct.setDescription(product.getDescription());

        productRepo.save(existingProduct);

        return new Response("Updated Product");
    }

    @Override
    public Response deleteProduct(int id) {

        if (!productRepo.existsById(id)) {
            throw new RuntimeException("Product not found with id: " + id);
        }

        productRepo.deleteById(id);
        return new Response("Deleted Product");
    }
}