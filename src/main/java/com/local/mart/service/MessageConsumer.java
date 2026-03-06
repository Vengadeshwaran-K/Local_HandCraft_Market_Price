package com.local.mart.service;

import com.local.mart.config.RabbitMQConfig;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;

@Service
public class MessageConsumer {

    @RabbitListener(queues = RabbitMQConfig.QUEUE)
    public void consumeMessage(String message) {
        System.out.println("----------------------------------------");
        System.out.println("RECEIVED FROM RABBITMQ: " + message);

        if (message.contains("Order Created")) {
            processOrderNotification(message);
        } else if (message.contains("User Created")) {
            processUserNotification(message);
        } else if (message.contains("New Product Added")) {
            processProductNotification(message);
        } else {
            System.out.println("General System Notification: " + message);
        }
        System.out.println("----------------------------------------");
    }

    private void processOrderNotification(String details) {
        System.out.println("LOGIC: Triggering Inventory Check / Sending Order Confirmation Email...");
        System.out.println("ACTION: " + details);
    }

    private void processUserNotification(String details) {
        System.out.println("LOGIC: Sending Welcome Email sequence...");
        System.out.println("ACTION: New member registered: " + details);
    }

    private void processProductNotification(String details) {
        System.out.println("LOGIC: Refreshing global cache / Updating Featured Products listing...");
        System.out.println("ACTION: Catalog updated: " + details);
    }
}
