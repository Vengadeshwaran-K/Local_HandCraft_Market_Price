package com.local.mart.service;

import com.local.mart.entity.ProductEntity;

import java.util.List;

public interface ProductService {

    String createProducts(ProductEntity product);

    List<ProductEntity> getProducts();

    ProductEntity getProduct(int id);

    String updateProduct(ProductEntity product);

    String deleteProduct(int id);
}
