import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { HashLoader } from 'react-spinners';
import useProducts from '../../Hooks/useProducts';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet';
import { WishListContext } from '../../Context/WishListContext';

export default function Products() {
  const { addProductToCart, cartItemsNo, setCartItemsNo } = useContext(CartContext);
  const { addProductToWishList } = useContext(WishListContext);
  const [loading, setLoading] = useState(null);
  const [wishList, setWishList] = useState({});

  useEffect(() => {
    const savedWishList = JSON.parse(localStorage.getItem('wishList')) || {};
    setWishList(savedWishList);
  }, []);

  useEffect(() => {
    localStorage.setItem('wishList', JSON.stringify(wishList));
  }, [wishList]);

  async function addProduct(productId) {
    setLoading(productId);
    try {
      let response = await addProductToCart(productId);
      if (response.data.status === 'success') {
        setCartItemsNo(prevCount => prevCount + 1);
        toast.success(response.data.message, { duration: 2000 });
      } else {
        toast.error(response.data.message, { duration: 2000 });
      }
    } catch (error) {
      toast.error('Failed to add product to cart.', { duration: 2000 });
    } finally {
      setLoading(null);
    }
  }
  

  let { data, isError, error, isLoading } = useProducts();

  if (isLoading) {
    return (
      <div className='py-8 w-full flex justify-center'>
        <HashLoader color='green' />
      </div>
    );
  }
  if (isError) {
    return (
      <div className='py-8 w-full flex justify-center'>
        <h3>{error}</h3>
      </div>
    );
  }

  async function addToWishList(id) {
    try {
      let res = await addProductToWishList(id);
      if (res && res.status === 'success') {
        const isAdded = !wishList[id];

        setWishList((prevWishList) => ({
          ...prevWishList,
          [id]: isAdded,
        }));

        localStorage.setItem('wishList', JSON.stringify({
          ...wishList,
          [id]: isAdded,
        }));

        toast.success(isAdded ? 'Product added to wishlist' : 'Product removed from wishlist', {
          duration: 2000,
        });
      } else {
        toast.error(res?.message || 'Failed to update wishlist', { duration: 2000 });
      }
    } catch (error) {
      toast.error('Failed to update wishlist. Please try again later.', { duration: 2000 });
    }
  }

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Products</title>
      </Helmet>
      <div className="frame">
        <h1 className="text-4xl font-extrabold text-green-700 text-center">Shopping Now</h1>

        <div className="flex flex-wrap">
          {data?.data.data.map((product) => (
            <div key={product._id} className='w-1/2 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 px-2 py-4 '>
              <div className="product shadow rounded-lg">
                <Link to={`/productdetails/${product._id}/${product.category.name}`}>
                  <img className='w-full' src={product.imageCover} alt={product.title} />
                </Link>

                <span className='block font-semibold mt-2 text-green-600 ml-1'>{product.category.name}</span>
                <h3 className='text-lg font-normal text-gray-800 mb-4'>
                  {product.title.split(' ').slice(0, 2).join(' ')}
                </h3>
                <div className='flex justify-between items-center'>
                  <span className='price'>{product.price} EGP</span>
                  <span
                    onClick={() => addToWishList(product._id)}
                    className={`fa fa-heart fa-lg ml-12 ${wishList[product._id] ? 'text-red-600' : 'text-gray-300'} hover:text-red-600`}
                  ></span>
                  <span className='mr-2'>
                    {product.ratingsAverage} <i className='fas fa-star text-yellow-500'></i>
                  </span>
                </div>
                <button onClick={() => addProduct(product._id)} className='btn '>
                  {loading === product._id ? <i className='fas fa-spinner fa-spin'></i> : 'Add to cart'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
