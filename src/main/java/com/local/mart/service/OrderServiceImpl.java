package com.local.mart.service;

import com.local.mart.Enum.Status;
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

        if (order.getProductName() == null || order.getProductName().isBlank())
            return new Response("Product name cannot be empty");

        if (order.getCategory() == null || order.getCategory().isBlank())
            return new Response("Category cannot be empty");

        if (order.getQuantity() <= 0)
            return new Response("Quantity must be greater than 0");

        if (order.getPaymentMethod() == null)
            return new Response("Payment method required");

        order.setStatus(Status.CREATED);
        order.setCreatedAt(LocalDate.now());

        orderRepo.save(order);

        return new Response("Order Created Successfully");
    }

    @Override
    public List<OrderEntity> getAllOrders() {
        return orderRepo.findAll();
    }

    @Override
    public OrderEntity getOrderById(int id) {

        return orderRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));
    }

    @Override
    public Response updateOrder(int id, OrderEntity order) {

        if (!orderRepo.existsById(id))
            return new Response("Order not found");

        OrderEntity existing = orderRepo.findById(id).get();

        existing.setCategory(order.getCategory());
        existing.setQuantity(order.getQuantity());
        existing.setStatus(order.getStatus());
        existing.setPaymentMethod(order.getPaymentMethod());

        orderRepo.save(existing);

        return new Response("Order Updated Successfully");
    }

    @Override
    public Response deleteOrder(int id) {

        if (!orderRepo.existsById(id))
            return new Response("Order not found");

        orderRepo.deleteById(id);

        return new Response("Order Deleted Successfully");
    }
}