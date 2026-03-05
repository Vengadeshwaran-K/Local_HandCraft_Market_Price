package com.local.mart.service;

import com.local.mart.entity.ProductEntity;
import com.local.mart.util.Response;

import java.util.List;

public interface ProductService {

    Response createProducts(ProductEntity product);

    List<ProductEntity> getProducts();

    ProductEntity getProduct(int id);

    Response updateProduct(ProductEntity product);

    Response deleteProduct(int id);
}
