package com.sky.ecommerce.service;

import com.sky.ecommerce.user.domain.OrderStatus;
import com.sky.ecommerce.user.domain.PaymentStatus;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import com.sky.ecommerce.exception.OrderException;
import com.sky.ecommerce.repository.OrderRepository;

@Service
public class PaymentServiceImpl implements PaymentService {

    // Injects Razorpay Key ID from application.properties
    @Value("${razorpay.api.key}")
    private String razorpayApiKey;

    // Injects Razorpay Key Secret from application.properties
    @Value("${razorpay.api.secret}")
    private String razorpayApiSecret;

    @Autowired
    private OrderRepository orderRepository;

    /**
     * Creates a payment link for a given order using Razorpay.
     *
     * @param order The order entity for which to create the payment link.
     * @return The short URL for the payment link.
     * @throws RazorpayException if there's an error communicating with Razorpay.
     * @throws OrderException if the order details are invalid.
     */
    @Override
    public String createPaymentLink(com.sky.ecommerce.model.Order order) throws RazorpayException, OrderException {
        try {
            // 1. Initialize Razorpay client with your API keys
            RazorpayClient razorpayClient = new RazorpayClient(razorpayApiKey, razorpayApiSecret);

            // 2. Create a JSON object with order details
            JSONObject orderRequest = new JSONObject();
            // Amount should be in the smallest currency unit (e.g., paise for INR)
            orderRequest.put("amount", order.getTotalPrice() * 100);
            orderRequest.put("currency", "INR"); // Set your desired currency
            orderRequest.put("receipt", order.getId());

            // 3. Create the order on Razorpay's servers
            Order createdOrder = razorpayClient.orders.create(orderRequest);

            // 4. Get the payment link from the response
            // The 'short_url' is the payment link you can send to the user
            return createdOrder.get("short_url");

        } catch (Exception e) {
            // If something goes wrong, wrap it in a custom exception
            throw new OrderException("Error creating payment link: " + e.getMessage());
        }
    }

    /**
     * Updates the order with payment information after a successful transaction.
     *
     * @param orderId The ID of the order to update.
     * @param paymentId The payment ID from Razorpay.
     * @throws OrderException if the order is not found or fails to update.
     */
    @Override
    public void updatePaymentInformation(String orderId, String paymentId) throws OrderException {
        // Find the order by its ID
        com.sky.ecommerce.model.Order order = orderRepository.findById(Long.valueOf(orderId))
                .orElseThrow(() -> new OrderException("Order not found with id: " + orderId));

        // Update the order's payment details
        order.getPaymentDetails().setPaymentId(paymentId);
        order.getPaymentDetails().setStatus(PaymentStatus.valueOf("COMPLETED"));
        order.setOrderStatus(OrderStatus.valueOf("PLACED"));

        // Save the updated order to the database
        orderRepository.save(order);

        System.out.println("Payment information updated for Order ID: " + orderId + ", Payment ID: " + paymentId);
    }

    @Override
    public void handlePaymentFailure(String orderId) throws OrderException {
        com.sky.ecommerce.model.Order order = orderRepository.findById(Long.valueOf(orderId))
                .orElseThrow(() -> new OrderException("Order not found with id: " + orderId));

        order.getPaymentDetails().setStatus(PaymentStatus.valueOf("FAILED"));
        order.setOrderStatus(OrderStatus.valueOf("PAYMENT_FAILED"));

        orderRepository.save(order);

        System.out.println("Payment failed for Order ID: " + orderId);
    }
}
