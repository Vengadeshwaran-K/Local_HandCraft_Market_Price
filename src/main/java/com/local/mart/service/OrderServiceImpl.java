package com.local.mart.service;

import com.local.mart.Repository.OrderRepository;
import com.local.mart.entity.OrderEntity;
import com.local.mart.util.Response;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepo;

    public OrderServiceImpl(OrderRepository orderRepo) {
        this.orderRepo = orderRepo;
    }

    @Override
    public Response createOrder(OrderEntity order) {

        if (order.getCategory() == null || order.getCategory().isBlank())
            return new Response("Order category cannot be empty");

        if (order.getQuantity() <= 0)
            return new Response("Quantity must be greater than 0");

        order.setCreated_at(LocalDate.now());

        orderRepo.save(order);

        return new Response("Order Created Successfully");
    }

    @Override
    public List<OrderEntity> getAllOrders() {
        return orderRepo.findAll();
    }

    @Override
    public OrderEntity getOrderById(int id) {

        if (!orderRepo.existsById(id)) {
            throw new RuntimeException("Order not found with id: " + id);
        }

        return orderRepo.findById(id).get();
    }

    @Override
    public Response updateOrder(int id, OrderEntity order) {

        if (!orderRepo.existsById(id)) {
            return new Response("Order not found with id: " + id);
        }

        if (order.getQuantity() <= 0)
            return new Response("Quantity must be greater than 0");

        OrderEntity existingOrder = orderRepo.findById(id).get();

        existingOrder.setCategory(order.getCategory());
        existingOrder.setQuantity(order.getQuantity());
        existingOrder.setStatus(order.getStatus());

        orderRepo.save(existingOrder);

        return new Response("Order Updated Successfully");
    }

    @Override
    public Response deleteOrder(int id) {

        if (!orderRepo.existsById(id)) {
            return new Response("Order not found with id: " + id);
        }

        orderRepo.deleteById(id);

        return new Response("Order Deleted Successfully");
    }
}