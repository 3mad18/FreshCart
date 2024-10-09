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
      await getLoggedUserCart(); 
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


  useEffect(() => {
    getLoggedUserCart();
  }, []);

  return (
    <CartContext.Provider value={{
      clearCart,
      cartItemsNo,
      setCartItemsNo,
      getOrder,
      cartId,
      setCartId,
      getLoggedUserCart,
      addProductToCart,
      getAllOrders,
      updateCartItemCount,
      deleteProductItem,
      cashOnDelivery,
      onlinePayment
    }}>
      {props.children}
    </CartContext.Provider>
  );
}
