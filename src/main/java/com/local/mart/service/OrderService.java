package com.local.mart.service;

import com.local.mart.entity.OrderEntity;
import com.local.mart.util.Response;

import java.util.List;

public interface OrderService {

    Response createOrder(OrderEntity order);

    List<OrderEntity> getAllOrders();

    List<OrderEntity> getOrdersByUser(String email);

    OrderEntity getOrderById(int id);

    Response updateOrder(int id, OrderEntity order);

    Response deleteOrder(int id);
}