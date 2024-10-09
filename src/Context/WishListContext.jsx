import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";

export const WishListContext = createContext();

export default function WishListContextProvider({ children }) {
    const [wishListCount, setWishListCount] = useState(0);

    const updateWishListCount = async () => {
        const wishList = await getWishList();
        setWishListCount(wishList.data.length);
    };

    const getHeaders = () => ({
        token: localStorage.getItem("userToken"),
    });

    useEffect(() => {
        updateWishListCount();
    }, []);

    async function getWishList() {
        return axios.get("https://ecommerce.routemisr.com/api/v1/wishlist", { headers: getHeaders() })
            .then((response) => response.data)
            .catch((error) => {
                console.error("Error fetching wishlist:", error);
                return error.response.data;
            });
    }

    async function addProductToWishList(productId) {
        return axios.post("https://ecommerce.routemisr.com/api/v1/wishlist", { productId }, { headers: getHeaders() })
            .then((response) => {
                updateWishListCount();      
                return response.data;
            })
            .catch((error) => {
                console.error("Error adding product to wishlist:", error);
                return error.response.data;
            });
    }
    
    async function removeProductFromWishList(productId) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, { headers: getHeaders() })
            .then((response) => {
                updateWishListCount();  
                return response.data;
            })
            .catch((error) => {
                console.error("Error removing product from wishlist:", error);
                return error.response.data;
            });
    }
    

    return (
        <WishListContext.Provider value={{
            wishListCount,
            updateWishListCount,
            getWishList,
            addProductToWishList,
            removeProductFromWishList
        }}>
            {children}
        </WishListContext.Provider>
    );
}
