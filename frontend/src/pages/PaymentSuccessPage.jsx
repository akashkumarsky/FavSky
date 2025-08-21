import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { updatePaymentStatus } from '../services/paymentService';
import { useDispatch } from 'react-redux';
import { getCart } from '../services/cartService';
import { getCart as getCartAction } from '../redux/cart/cartSlice';

const PaymentSuccessPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const updatePayment = async () => {
      const params = new URLSearchParams(location.search);
      const paymentId = params.get('payment_id');
      const paymentLinkId = params.get('payment_link_id');
      const paymentStatus = params.get('payment_status');
      const orderId = params.get('order_id');

      try {
        await updatePaymentStatus({
          paymentId,
          paymentLinkId,
          paymentStatus,
          orderId,
        });
        const cart = await getCart();
        dispatch(getCartAction(cart));
        navigate(`/order/${orderId}`);
      } catch (error) {
        console.error('Failed to update payment status:', error);
        navigate('/payment-failed');
      }
    };

    updatePayment();
  }, [location, navigate, dispatch]);

  return (
    <div className="container mx-auto mt-10 text-center">
      <h1 className="text-3xl font-bold mb-5">Payment Processing...</h1>
      <p>Please wait while we process your payment.</p>
    </div>
  );
};

export default PaymentSuccessPage;
