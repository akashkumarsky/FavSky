package com.sky.ecommerce.service;

import com.razorpay.RazorpayException;
import com.sky.ecommerce.exception.OrderException;
import com.sky.ecommerce.model.Order;


public interface PaymentService {
    
    public String createPaymentLink(Order order) throws RazorpayException, OrderException;
    
    public void updatePaymentInformation(String orderId, String paymentId) throws OrderException;

    public void handlePaymentFailure(String orderId) throws OrderException;
    
}
