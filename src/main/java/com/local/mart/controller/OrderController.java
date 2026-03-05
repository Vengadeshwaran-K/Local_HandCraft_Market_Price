package com.local.mart.controller;

import com.local.mart.entity.OrderEntity;
import com.local.mart.service.OrderService;
import com.local.mart.util.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping("/create")
    public Response createOrder(@RequestBody OrderEntity order) {
        return orderService.createOrder(order);
    }

    @GetMapping("/getAllOrders")
    public List<OrderEntity> getAllOrders() {
        return orderService.getAllOrders();
    }

    @GetMapping("/{id}/order")
    public OrderEntity getOrderById(@PathVariable int id) {
        return orderService.getOrderById(id);
    }

    @PutMapping("/{id}/update")
    public Response updateOrder(@PathVariable int id,
                                   @RequestBody OrderEntity order) {
        return orderService.updateOrder(id, order);
    }

    @DeleteMapping("/{id}")
    public Response deleteOrder(@PathVariable int id) {
        return orderService.deleteOrder(id);
    }
}