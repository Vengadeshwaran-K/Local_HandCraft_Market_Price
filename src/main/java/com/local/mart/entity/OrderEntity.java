package com.local.mart.entity;

import com.local.mart.Enum.PaymentMethod;
import com.local.mart.Enum.Status;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Table(name = "orders")
@Data
public class OrderEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String productName;
    private int productId;
    private String userEmail;
    private String category;

    private int quantity;

    @Enumerated(EnumType.STRING)
    private Status status;

    @Enumerated(EnumType.STRING)
    private PaymentMethod paymentMethod;

    private LocalDate createdAt;
}