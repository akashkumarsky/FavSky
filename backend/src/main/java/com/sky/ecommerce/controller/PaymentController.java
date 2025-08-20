package com.sky.ecommerce.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sky.ecommerce.exception.OrderException;
import com.sky.ecommerce.model.Order;
import com.sky.ecommerce.repository.OrderRepository;
import com.sky.ecommerce.response.ApiResponse;
import com.sky.ecommerce.response.PaymentLinkResponse;
import com.sky.ecommerce.service.OrderService;
import com.sky.ecommerce.service.PaymentService;
import com.razorpay.RazorpayException;

@RestController
@RequestMapping("/api")
public class PaymentController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private PaymentService paymentService;

    @Autowired
    private OrderRepository orderRepository;

    @PostMapping("/payments/{orderId}")
    public ResponseEntity<PaymentLinkResponse> createPaymentLink(@PathVariable String orderId)
            throws OrderException, RazorpayException {
        // Wrap the entire method's logic in a try-catch block
        try {
            Order order = orderService.findOrderById(Long.valueOf(orderId));
            PaymentLinkResponse paymentLinkResponse = new PaymentLinkResponse();
            paymentLinkResponse.setPayment_link_url(paymentService.createPaymentLink(order));
            return new ResponseEntity<PaymentLinkResponse>(paymentLinkResponse, HttpStatus.CREATED);
        } catch (Exception e) {
            throw new OrderException(e.getMessage());
        }
    }

    @GetMapping("/payments")
    public ResponseEntity<ApiResponse> redirect(@RequestParam(name = "payment_id") String paymentId,
            @RequestParam(name = "order_id") String orderId) throws OrderException {
        try {
            paymentService.updatePaymentInformation(orderId, paymentId);
            return new ResponseEntity<ApiResponse>(new ApiResponse("Payment success", true), HttpStatus.OK);
        } catch (Exception e) {
            throw new OrderException(e.getMessage());
        }
    }
}
