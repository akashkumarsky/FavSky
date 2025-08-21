import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { createOrder } from '../services/orderService';
import { createPaymentLink } from '../services/paymentService';

const CheckoutPage = () => {
  const [shippingAddress, setShippingAddress] = useState({
    streetAddress: '',
    city: '',
    state: '',
    zipCode: '',
  });
  const cart = useSelector((state) => state.cart.cart);

  const handleAddressChange = (e) => {
    setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value });
  };

  const handleCheckout = async () => {
    try {
      const order = await createOrder({ shippingAddress });
      const paymentLink = await createPaymentLink(order.id);
      window.location.href = paymentLink.payment_link_url;
    } catch (error) {
      console.error('Checkout failed:', error);
    }
  };

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-5">Checkout</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Shipping Address</h2>
          <div className="space-y-4">
            <input
              type="text"
              name="streetAddress"
              placeholder="Street Address"
              onChange={handleAddressChange}
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              onChange={handleAddressChange}
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              name="state"
              placeholder="State"
              onChange={handleAddressChange}
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              name="zipCode"
              placeholder="Zip Code"
              onChange={handleAddressChange}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
          <div className="border p-4 rounded">
            {cart?.cartItems.map((item) => (
              <div key={item.id} className="flex justify-between mb-2">
                <span>{item.product.title} x {item.quantity}</span>
                <span>₹{item.price}</span>
              </div>
            ))}
            <hr />
            <div className="flex justify-between font-bold mt-2">
              <span>Total</span>
              <span>₹{cart?.totalPrice}</span>
            </div>
          </div>
          <button
            onClick={handleCheckout}
            className="w-full bg-indigo-600 text-white py-2 rounded mt-4 hover:bg-indigo-700"
          >
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
