import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../Context/CartContext';
import { jwtDecode } from 'jwt-decode';
import { HashLoader } from 'react-spinners';
import { Helmet } from 'react-helmet';

export default function Order() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  let { getAllOrders } = useContext(CartContext);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('userToken');
        if (token) {
          const decoded = jwtDecode(token);
          const res = await getAllOrders(decoded.id);
          console.log("Fetched Orders: ", res.data);
          setOrders(res.data);
        } else {
          setError('Token not found.');
        }
      } catch (error) {
        setError('An error occurred while fetching orders.');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [getAllOrders]);

  return (
    <div className="frame py-5">
      {loading ? (
        <div className='py-8 w-full flex justify-center'>
          <HashLoader color='green' />
        </div>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <div className="w-full mb-6 rounded-lg overflow-hidden">
          <div>
            <div className="p-6 bg-gray-200 shadow-lg mb-4 border-gray-400">
              <h1 className="text-4xl font-extrabold text-gray-800 text-center">
                Your All Orders
              </h1>
              <div className="flex justify-between flex-wrap text-center mt-4">
                <h2 className="text-xl font-semibold text-gray-700">
                  Your Orders: <span className='font-bold text-gray-800'>{orders.length}</span>
                  <i className="fa-solid fa-bag-shopping text-gray-700 pl-2 mt-2"></i>
                </h2>
              </div>
            </div>
            {orders.length > 0 ? (
              orders.map((order) => (
                <div key={order._id} className="order-item border border-gray-300 rounded-lg mb-4 p-4  shadow-lg">
                  <h2 className="text-xl font-bold">Order ID: {order.id}</h2>
                  <p>Paid At: {new Date(order.createdAt).toLocaleDateString()}</p>
                  <p>Payment Method: {order.paymentMethodType === "card" ? "Card" : "Cash on Delivery"}</p>
                  <p>Total Price: {order.totalOrderPrice} EGP</p>

                  <div className="w-full mt-4">
                    {order.cartItems && order.cartItems.length > 0 ? (
                      order.cartItems.map((item) => (
                        <div key={item._id} className="flex items-center justify-between p-2 border-b border-gray-300">
                          <div className="flex items-center space-x-4">
                            <img
                              src={item.product.imageCover}
                              className="w-16 h-16 object-cover rounded-lg"
                              alt={item.product.name}
                            />
                            <div>
                              <p className="text-lg font-semibold text-gray-900">Product: {item.product.name}</p>
                              <p className="text-sm text-gray-600">Name: {item.product.title.split(" ").slice(0, 2).join(" ")}</p>
                              <p className="text-sm text-gray-600">Price: {item.price} EGP</p>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-center text-red-600">No items in this order.</p>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-600">No orders found.</p>
            )}
          </div>
        </div>
      )}
      <Helmet>
        <meta charSet="utf-8" />
        <title>Orders</title>
      </Helmet>
    </div>
  );
}
