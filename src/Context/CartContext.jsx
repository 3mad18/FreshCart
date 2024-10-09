import axios from "axios";
import { createContext, useState, useEffect } from "react";

export let CartContext = createContext();

export default function CartContextProvider(props) {
  let headers = {
    token: localStorage.getItem('userToken')
  };
  const [cartId, setCartId] = useState(null);
  let [cartItemsNo, setCartItemsNo] = useState(null);



  function getLoggedUserCart() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, { headers })
      .then((response) => {
        setCartId(response.data.data._id);
        return response;
      })
      .catch((error) => error);
  }

  function deleteProductItem(productId) {
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, { headers })
      .then((response) => response)
      .catch((error) => error);
  }

  function addProductToCart(productId) {
    return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`, { productId }, { headers })
      .then((response) => response)
      .catch((error) => error);
  }

  function updateCartItemCount(productId, count) {
    return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, { count }, { headers })
      .then((response) => response)
      .catch((error) => error);
  }

  function clearCart() {
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, { headers })
      .then((response) => response)
      .catch((error) => error);
  }

  function cashOnDelivery(url, shippingAddress) {
    return axios.post(url, { shippingAddress }, { headers })
      .then((response) => {
        console.log('Response from API:', response);
        return response.data;
      })
      .catch((error) => {
        console.error('Error during cash on delivery:', error.response ? error.response.data : error.message);
        throw error;
      });
  }
  function onlinePayment(cartId, shippingAddress) {
    if (!cartId) {
      console.error('Cart ID is missing!');
      return;
    }
    return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`, { shippingAddress }, { headers })
      .then((response) => response)
      .catch((error) => {
        console.error("Error during online payment:", error.response ? error.response.data : error.message);
        throw error;
      });
  }


  function getOrder(userId) {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`)
      .then((reponse) => reponse)
      .catch((error) => error)
  }

  function getAllOrders(id) {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`)
      .then((response) => response)
      .catch((error) => error);
  }

  useEffect(() => {
    getLoggedUserCart();
  }, []);

  return (
    <CartContext.Provider value={{ clearCart, cartItemsNo, setCartItemsNo, getOrder, cartId, setCartId, getLoggedUserCart, addProductToCart, getAllOrders, updateCartItemCount, deleteProductItem, cashOnDelivery, onlinePayment }}>
      {props.children}
    </CartContext.Provider>
  );
}
