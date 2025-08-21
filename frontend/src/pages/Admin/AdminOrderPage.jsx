import React, { useEffect, useState } from 'react';
import { getAllOrders, confirmOrder, shipOrder, deliverOrder, deleteOrder } from '../../services/adminOrderService';

const AdminOrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const data = await getAllOrders();
      setOrders(data);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmOrder = async (orderId) => {
    await confirmOrder(orderId);
    fetchOrders();
  };

  const handleShipOrder = async (orderId) => {
    await shipOrder(orderId);
    fetchOrders();
  };

  const handleDeliverOrder = async (orderId) => {
    await deliverOrder(orderId);
    fetchOrders();
  };

  const handleDeleteOrder = async (orderId) => {
    await deleteOrder(orderId);
    fetchOrders();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-5">Admin - All Orders</h1>
      <table className="w-full bg-white shadow-md rounded">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Order ID</th>
            <th className="py-3 px-6 text-left">User</th>
            <th className="py-3 px-6 text-center">Status</th>
            <th className="py-3 px-6 text-center">Total</th>
            <th className="py-3 px-6 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {orders.map((order) => (
            <tr key={order.id} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-6 text-left whitespace-nowrap">{order.id}</td>
              <td className="py-3 px-6 text-left">{order.user.firstName}</td>
              <td className="py-3 px-6 text-center">{order.orderStatus}</td>
              <td className="py-3 px-6 text-center">₹{order.totalPrice}</td>
              <td className="py-3 px-6 text-center">
                <div className="flex item-center justify-center">
                  <button onClick={() => handleConfirmOrder(order.id)} className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">Confirm</button>
                  <button onClick={() => handleShipOrder(order.id)} className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">Ship</button>
                  <button onClick={() => handleDeliverOrder(order.id)} className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">Deliver</button>
                  <button onClick={() => handleDeleteOrder(order.id)} className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminOrderPage;
