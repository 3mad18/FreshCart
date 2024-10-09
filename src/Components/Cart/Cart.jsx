import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../Context/CartContext';
import { HashLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';
import './Cart.css';
import { Helmet } from 'react-helmet';

export default function Cart() {
    const { clearCart, setCartItemsNo, getLoggedUserCart, updateCartItemCount, deleteProductItem, setCartId, cartId, cartItemsNo } = useContext(CartContext);
    const [cartDetails, setCartDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [noCartInfo, setNoCartInfo] = useState(null);

    const navigate = useNavigate();

    async function getCartItem() {
        setLoading(true);
        const response = await getLoggedUserCart();
        setCartItemsNo(response.data.numOfCartItems);
        setCartDetails(response.data.data);
        setLoading(false);
        setCartId(response.data.data._id);
    }

    async function updateCartCount(productId, count) {
        const response = await updateCartItemCount(productId, count);
        setCartDetails(response.data.data);
    }

    async function deleteItem(productId) {
        const response = await deleteProductItem(productId);
        setCartDetails(response.data.data);
        setCartItemsNo(response.data.numOfCartItems);
    }

    async function clearAllCart() {
        const response = await clearCart();
        if (response.data.message === "success") {
            setCartDetails(null);
            setNoCartInfo("No Products To Show");
            setCartItemsNo(0);
        } else {
            console.log("Error clearing cart");
        }
    }

    function goToCheckOut() {
        navigate(`/checkout/${cartId}`);
    }

    function goToShopping() {
        navigate('/products');
    }

    useEffect(() => {
        getCartItem();
    }, []);

    if (loading) {
        return (
            <div className='py-8 w-full flex justify-center'>
                <HashLoader color='green' />
            </div>
        );
    }

    return (
        <div className="frame pb-5">
            <div className="relative overflow-x-auto sm:rounded-lg">
                <h2 className='text-2xl sm:text-4xl font-extrabold text-green-700 text-center mb-4'>
                    Shopping Cart <i className='fa fa-shopping-bag'></i>
                </h2>

                <div className="flex flex-col sm:flex-row justify-between items-center text-lg font-semibold my-4 px-4">
                    <div className="text-gray-600 text-xl mb-4 sm:mb-0">
                        Total Items in Cart: <span className="bg-white shadow-xl rounded-full border border-green-600 py-1 px-3 text-xl">{cartItemsNo}</span>
                    </div>
                    <div className="text-slate-600">
                        <span className="text-gray-600 text-xl">Total Cart Price:</span> <span className="bg-white shadow-xl rounded-full border border-green-600 py-1 px-3 text-lg">{cartDetails?.totalCartPrice} <i className="fa-solid fa-dollar-sign"></i></span>
                    </div>
                </div>

                {cartDetails?.products?.length > 0 ? (
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-200">
                            <tr>
                                <th scope="col" className="px-2 py-3">
                                    <span className="sr-only">Image</span>
                                </th>
                                <th scope="col" className="px-2 py-3">Product</th>
                                <th scope="col" className="px-2 py-3">Qty</th>
                                <th scope="col" className="px-2 py-3">Price</th>
                                <th scope="col" className="px-2 py-3">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartDetails?.products.map((product) => (
                                <tr key={product.product.id} className="bg-white border-b hover:bg-gray-100">
                                    <td className="p-2">
                                        <img src={product.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt={product.product.title} />
                                    </td>
                                    <td className="px-2 py-4 font-semibold text-gray-900">{product.product.title}</td>
                                    <td className="px-2 py-4">
                                        <div className="flex items-center justify-center">
                                            <button
                                                onClick={() => updateCartCount(product.product.id, product.count - 1)}
                                                className="inline-flex items-center justify-center p-1 me-2 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200"
                                                type="button"
                                            >
                                                <span className="sr-only">Decrease quantity</span>
                                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
                                                </svg>
                                            </button>
                                            <div><span>{product.count}</span></div>
                                            <button
                                                onClick={() => updateCartCount(product.product.id, product.count + 1)}
                                                className="inline-flex items-center justify-center h-6 w-6 p-1 ms-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200"
                                                type="button"
                                            >
                                                <span className="sr-only">Increase quantity</span>
                                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                                                </svg>
                                            </button>
                                        </div>
                                    </td>
                                    <td className="px-2 py-4 font-semibold text-gray-900"><span>{product.price} EGP</span></td>
                                    <td className="px-2 py-4">
                                        <span onClick={() => deleteItem(product.product.id)} className="cursor-pointer font-medium text-red-600 hover:underline">Remove</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="flex flex-col justify-center items-center h-64">
                        <span className="text-gray-600 text-2xl font-semibold mb-4">No Products To Show</span>
                        <button
                            onClick={goToShopping}
                            className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-800"
                        >
                            Start Shopping <i className='fa fa-shopping-cart'></i>
                        </button>
                    </div>
                )}
            </div>

            {cartDetails?.products?.length > 0 && (
                <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4 w-full py-8 mx-auto">
                    <div className="w-full md:w-1/4">
                        <button onClick={clearAllCart} className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full py-2.5 text-center">
                            Clear All
                        </button>
                    </div>
                    <div className="w-full md:w-3/4">
                        <button className='btnDetails w-full' onClick={goToCheckOut}>Continue To Check Out</button>
                    </div>
                </div>
            )}
            <Helmet>
                <meta charSet="utf-8" />
                <title>Cart</title>
            </Helmet>
        </div>
    );
}
