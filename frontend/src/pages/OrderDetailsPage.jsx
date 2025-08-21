import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getOrderById } from '../services/orderService';

const OrderDetailsPage = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const data = await getOrderById(orderId);
        setOrder(data);
      } catch (error) {
        console.error('Failed to fetch order details:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [orderId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!order) {
    return <div>Order not found.</div>;
  }

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-5">Order Details</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <strong>Order ID:</strong> {order.id}
        </div>
        <div className="mb-4">
          <strong>Order Date:</strong> {new Date(order.orderDate).toLocaleDateString()}
        </div>
        <div className="mb-4">
          <strong>Status:</strong> {order.orderStatus}
        </div>
        <div className="mb-4">
          <strong>Total:</strong> ₹{order.totalPrice}
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Items</h2>
          {order.orderItems.map((item) => (
            <div key={item.id} className="flex justify-between items-center mb-2 p-2 border-b">
              <div>
                <p className="font-semibold">{item.product.title}</p>
                <p>Quantity: {item.quantity}</p>
              </div>
              <div>₹{item.price}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
