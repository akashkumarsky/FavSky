import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getOrderHistory } from '../services/orderService';

const OrderHistoryPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const data = await getOrderHistory();
        setOrders(data);
      } catch (error) {
        console.error('Failed to fetch order history:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrderHistory();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-5">Order History</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        {orders.length === 0 ? (
          <p>You have no orders.</p>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr>
                <th className="py-2">Order ID</th>
                <th className="py-2">Date</th>
                <th className="py-2">Status</th>
                <th className="py-2">Total</th>
                <th className="py-2"></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b">
                  <td className="py-2">{order.id}</td>
                  <td className="py-2">{new Date(order.orderDate).toLocaleDateString()}</td>
                  <td className="py-2">{order.orderStatus}</td>
                  <td className="py-2">₹{order.totalPrice}</td>
                  <td className="py-2">
                    <Link to={`/order/${order.id}`} className="text-indigo-600 hover:underline">
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default OrderHistoryPage;
