import { useContext, useEffect, useState } from "react";
import { WishListContext } from "../../Context/WishListContext";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { HashLoader } from "react-spinners";

export default function WishList() {
    const { getWishList, removeProductFromWishList, updateWishListCount } = useContext(WishListContext);
    const { addProductToCart, setCartItemsNo } = useContext(CartContext);
    const [wishList, setWishList] = useState([]);
    const [loadingAddToCart, setLoadingAddToCart] = useState(null);
    const [loadingRemove, setLoadingRemove] = useState(null);
    const [isLoadingWishList, setIsLoadingWishList] = useState(true);

    useEffect(() => {
        async function fetchWishList() {
            try {
                const res = await getWishList();
                if (res.status === 'success') {
                    setWishList(res.data);
                } else {
                    toast.error("Failed to fetch wishlist");
                }
            } catch (error) {
                toast.error("An error occurred while fetching wishlist");
            } finally {
                setIsLoadingWishList(false);
            }
        }
        fetchWishList();
    }, [getWishList]);

    async function handleRemoveItem(productId) {
        setLoadingRemove(productId);
        try {
            const res = await removeProductFromWishList(productId);
            if (res.status === 'success') {
                setWishList((prevWishList) => prevWishList.filter((item) => item._id !== productId));
                toast.success('Product removed from wishlist');
                await updateWishListCount();
            } else {
                toast.error(res.message || 'Failed to remove product from wishlist');
            }
        } catch (error) {
            toast.error("An error occurred while removing the product");
        } finally {
            setLoadingRemove(null);
        }
    }

    async function handleAddToCart(productId) {
        setLoadingAddToCart(productId);
        try {
            const res = await addProductToCart(productId);
            if (res.data.status === 'success') {
                toast.success('Product added to cart');
                setCartItemsNo((prevCount) => prevCount + 1);
            } else {
                toast.error('Failed to add product to cart');
            }
        } catch (error) {
            toast.error("An error occurred while adding the product to cart");
        } finally {
            setLoadingAddToCart(null);
        }
    }

    if (isLoadingWishList) {
        return (
            <div className='py-8 w-full flex justify-center'>
                <HashLoader color='green' />
            </div>
        );
    }
    
    return (
        <div className="frame flex items-center justify-center">
            <div className="w-full mb-6 bg-gray-100 shadow-2xl rounded-lg overflow-hidden">
                <div className="p-6 bg-green-100 border-b border-green-300">
                    <h1 className="text-4xl font-extrabold text-gray-800 text-center">Wish List</h1>
                    <p className="text-center text-gray-600">
                        {wishList.length > 0 ? (
                            <>
                                You have <span className="text-green-800 font-extrabold">{wishList.length}</span> products in your wishlist.
                            </>
                        ) : (
                            'Your wishlist is empty.'
                        )}
                    </p>
                </div>

                <div className="p-6 my-6">
                    {wishList.length > 0 ? (
                        wishList.map((product) => (
                            <div key={product._id} className="p-2">
                                <div className="flex flex-wrap items-center justify-center lg:justify-between bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                                    <div className="flex flex-wrap justify-center lg:justify-between p-2 items-center space-x-4">
                                        <div>
                                            <img
                                                src={product.imageCover}
                                                className="object-cover h-36 w-36 rounded-lg border border-gray-200"
                                                alt={product.title}
                                            />
                                        </div>
                                        <div className="text-center lg:text-start p-2">
                                            <h3 className="text-lg font-semibold text-gray-900">
                                                {product.title.split(" ").slice(0, 3).join(" ")}
                                            </h3>
                                            <p className="text-lg font-semibold text-green-500">
                                                <i className="fa-solid fa-coins text-green-500"></i> {product.price} EGP
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex space-x-2 ml-auto">
                                        <button
                                            onClick={() => handleRemoveItem(product._id)}
                                            disabled={loadingRemove === product._id}
                                            className="text-red-900  bg-red-400 p-2 rounded-lg hover:text-white hover:bg-red-800 hover:border-red-600 font-medium transition-colors duration-300"
                                        >
                                            {loadingRemove === product._id ? (
                                                <>
                                                    <i className="fa-solid fa-spinner fa-spin-pulse"></i> <span>Removing...</span>
                                                </>
                                            ) : (
                                                <span>
                                                    <i className="fa-solid fa-trash mr-2"></i> Remove
                                                </span>
                                            )}
                                        </button>

                                        <button
                                            onClick={() => handleAddToCart(product._id)}
                                            disabled={loadingAddToCart === product._id}
                                            className="text-green-800  bg-green-500 p-2 rounded-lg hover:text-white hover:bg-green-800 hover:border-green-600 font-medium transition-colors duration-300"
                                        >
                                            {loadingAddToCart === product._id ? (
                                                <>
                                                    <i className="fa-solid fa-spinner fa-spin-pulse"></i> <span>Adding...</span>
                                                </>
                                            ) : (
                                                <span>
                                                    <i className="fa-solid fa-cart-shopping mr-2"></i> Add to Cart
                                                </span>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-600">Your wishlist is empty.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
