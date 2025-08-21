import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div className="flex">
      <aside className="w-64 bg-gray-800 text-white h-screen">
        <div className="p-4">
          <h1 className="text-2xl font-bold">Admin</h1>
        </div>
        <nav>
          <ul>
            <li className="p-4 hover:bg-gray-700"><Link to="/admin">Dashboard</Link></li>
            <li className="p-4 hover:bg-gray-700"><Link to="/admin/products">Products</Link></li>
            <li className="p-4 hover:bg-gray-700"><Link to="/admin/orders">Orders</Link></li>
            <li className="p-4 hover:bg-gray-700"><Link to="/admin/users">Users</Link></li>
          </ul>
        </nav>
      </aside>
      <main className="flex-1 p-10">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboard;
