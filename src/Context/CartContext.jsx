import axios from "axios";
import { createContext, useState, useEffect } from "react";

export let CartContext = createContext();

export default function CartContextProvider(props) {
  let headers = {
    token: localStorage.getItem('userToken')
  };
  const [cartId, setCartId] = useState(null);
  const [cartItemsNo, setCartItemsNo] = useState(0); 

  async function getLoggedUserCart() {
    try {
      const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, { headers });
      setCartId(response.data.data._id);
      setCartItemsNo(response.data.numOfCartItems); 
      return response;
    } catch (error) {
      console.error("Error fetching cart:", error);
      return null;
    }
  }

  async function deleteProductItem(productId) {
    try {
      const response = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, { headers });
      setCartItemsNo(prevCount => prevCount - 1);
      return response;
    } catch (error) {
      console.error("Error deleting product:", error);
      return null;
    }
  }

  async function addProductToCart(productId) {
    try {
      const response = await axios.post(`https://ecommerce.routemisr.com/api/v1/cart`, { productId }, { headers });
      setCartItemsNo(prevCount => prevCount + 1); 
      return response;
    } catch (error) {
      console.error("Error adding product:", error);
      return null;
    }
  }
  

  async function updateCartItemCount(productId, count) {
    try {
      const response = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, { count }, { headers });
      await getLoggedUserCart(); 
      return response;
    } catch (error) {
      console.error("Error updating cart item count:", error);
      return null;
    }
  }

  async function clearCart() {
    try {
      const response = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, { headers });
      setCartItemsNo(0);
      return response;
    } catch (error) {
      console.error("Error clearing cart:", error);
      return null;
    }
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
