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
    private final MessageProducer messageProducer;
    private final com.local.mart.Repository.ProductRepository productRepo;

    public OrderServiceImpl(OrderRepository orderRepo, MessageProducer messageProducer,
            com.local.mart.Repository.ProductRepository productRepo) {
        this.orderRepo = orderRepo;
        this.messageProducer = messageProducer;
        this.productRepo = productRepo;
    }

    @Override
    public Response createOrder(OrderEntity order) {

        if (order.getProductId() <= 0)
            return new Response("Product ID required");

        if (order.getQuantity() <= 0)
            return new Response("Quantity must be greater than 0");

        if (order.getPaymentMethod() == null)
            return new Response("Payment method required");

        // Validate product and stock
        var productOpt = productRepo.findById(order.getProductId());
        if (productOpt.isEmpty()) {
            return new Response("Product not found");
        }

        var product = productOpt.get();
        if (product.getStock() < order.getQuantity()) {
            return new Response("Insufficient stock. Only " + product.getStock() + " left.");
        }

        // Reduce stock
        product.setStock(product.getStock() - order.getQuantity());
        productRepo.save(product);

        // Map order details from product for consistency
        order.setProductName(product.getName());
        order.setCategory(product.getCategory());
        order.setStatus(Status.CREATED);
        order.setCreatedAt(LocalDate.now());

        // Set user email from security context if not provided
        if (order.getUserEmail() == null || order.getUserEmail().isBlank()) {
            org.springframework.security.core.Authentication auth = org.springframework.security.core.context.SecurityContextHolder
                    .getContext().getAuthentication();
            if (auth != null) {
                order.setUserEmail(auth.getName());
            }
        }

        orderRepo.save(order);
        try {
            messageProducer.sendMessage("Order Created: " + order.getQuantity() + "x " + order.getProductName() + " by "
                    + order.getUserEmail());
        } catch (Exception e) {
            System.err.println("Failed to send order message: " + e.getMessage());
        }

        return new Response("Order Created Successfully");
    }

    @Override
    public List<OrderEntity> getAllOrders() {
        return orderRepo.findAll();
    }

    @Override
    public List<OrderEntity> getOrdersByUser(String email) {
        return orderRepo.findByUserEmail(email);
    }

    @Override
    public OrderEntity getOrderById(int id) {

        return orderRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));
    }

    @Override
    public Response updateOrder(int id, OrderEntity order) {

        OrderEntity existing = orderRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        if (order.getStatus() != null) {
            existing.setStatus(order.getStatus());
        }
        if (order.getQuantity() > 0) {
            existing.setQuantity(order.getQuantity());
        }
        if (order.getCategory() != null) {
            existing.setCategory(order.getCategory());
        }
        if (order.getPaymentMethod() != null) {
            existing.setPaymentMethod(order.getPaymentMethod());
        }

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