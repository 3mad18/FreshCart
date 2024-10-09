import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Slider from "react-slick";
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import { HashLoader } from 'react-spinners';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet';
import { WishListContext } from '../../Context/WishListContext';

export default function ProductsDetails() {
  const { addProductToWishList } = useContext(WishListContext);
  const { id, category } = useParams();
  const { addProductToCart, cartItemsNo, setCartItemsNo } = useContext(CartContext);
  const [loading, setLoading] = useState(null);
  const [productDetails, setProductDetails] = useState(null);
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [wishList, setWishList] = useState({});

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
  };

  useEffect(() => {
    const savedWishList = JSON.parse(localStorage.getItem('wishList')) || {};
    console.log('Loaded wishList from localStorage:', savedWishList);
    setWishList(savedWishList);
  }, []);

  useEffect(() => {
    localStorage.setItem('wishList', JSON.stringify(wishList));
    console.log('Updated localStorage with wishList:', wishList);
  }, [wishList]);


  async function addProduct(productId) {
    setLoading(productId);
    try {
      const response = await addProductToCart(productId);
      if (response.data.status === 'success') {
        let newCartItemsNo = cartItemsNo + 1;
        setCartItemsNo(newCartItemsNo);
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
  const getProductsDetails = async () => {
    try {
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
      if (data.data) {
        setProductDetails(data.data);
      } else {
        toast.error('No product found.');
      }
    } catch (error) {
      toast.error('Failed to fetch product details.');
    }
  };
  
  async function addToWishList(id) {
    try {
      let res = await addProductToWishList(id);
      if (res && res.status === 'success') {
        const isAdded = !wishList[id];

        if (isAdded) {
          toast.success('Product added to wishlist', { duration: 2000 });
        } else {
          toast.success('Product removed from wishlist', { duration: 2000 });
        }

        setWishList((prevWishList) => ({
          ...prevWishList,
          [id]: isAdded,
        }));
      } else {
        toast.error(res?.message || 'Failed to update wishlist', { duration: 2000 });
      }
    } catch (error) {
      toast.error('Failed to update wishlist. Please try again later.', { duration: 2000 });
    }
  }

  const getRelatedProducts = async (category) => {
    try {
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
      const related = data.data.filter((product) => product.category.name === category);
      setRelatedProduct(related);
    } catch {
      toast.error('Failed to fetch related products.');
    }
  };

  useEffect(() => {
    getProductsDetails();
    getRelatedProducts(category);
  }, [id, category]);

  const { data, isError, error, isLoading } = useQuery({
    queryKey: ['recentProducts'],
    queryFn: () => axios.get('https://ecommerce.routemisr.com/api/v1/products'),
    staleTime: 80000,
    select: (data) => data.data.data,
  });

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
        <h3>{error.message}</h3>
      </div>
    );
  }

  return (
    <div className="frame">
      <Helmet>
        <meta charSet="utf-8" />
        <title>{productDetails?.title}</title>
      </Helmet>
      <div className="row">
        <div className="w-1/4">
          <Slider {...settings}>
            {productDetails?.images.map((src, index) => (
              <img key={index} className='w-full' src={src} alt={productDetails?.title} />
            ))}
          </Slider>
        </div>
        <div className="w-3/4 px-4">
          <h1 className='text-lg font-normal text-gray-950'>{productDetails?.title}</h1>
          <p className='text-gray-600 font-light mt-4'>{productDetails?.description}</p>
          <div className='flex justify-between items-center'>
            <div>
              <span>{productDetails?.price} EGP</span>
            </div>
            <div>
              <span
                onClick={() => addToWishList(productDetails?._id)}
                className={`fa fa-heart fa-lg mx-2 ${wishList[productDetails?._id] ? 'text-red-600' : 'text-gray-300'} hover:text-red-600`}
              ></span>
              <span>{productDetails?.ratingsAverage} <i className='fas fa-star text-yellow-500'></i></span>
            </div>
          </div>
          <button onClick={() => addProduct(productDetails?._id)} className='btnDetails'>
            {loading === productDetails?._id ? <i className='fas fa-spinner fa-spin'></i> : 'Add to cart'}
          </button>
        </div>
      </div>

      <h2 className='font-medium text-2xl pt-8 text-green-600'>Similar Products</h2>
      <div className="row">
        {relatedProduct.map((product) => (
          <div key={product._id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 rounded-lg p-2">
            <div className="product shadow">
              <Link to={`/productdetails/${product._id}/${product.category.name}`}>
                <img className='w-full' src={product.imageCover} alt={product.title} />
                <span className='block font-semibold mt-2 text-green-600'>{product.category.name}</span>
                <h3 className='text-lg font-normal text-gray-800 mb-4'>{product.title.split(' ').slice(0, 2).join(' ')}</h3>
                <div className='flex justify-between items-center'>
                  <span>{product.price} EGP</span>
                  <span
                    onClick={() => addToWishList(product._id)}
                    className={`fa fa-heart fa-lg ml-14 hover:text-red-600 ${wishList[product._id] ? 'text-red-600' : 'text-gray-300'}`}
                  ></span>
                  <span>{product.ratingsAverage} <i className='fas fa-star text-yellow-500'></i></span>
                </div>
                <button onClick={() => addProduct(product._id)} className='btn'>
                  {loading === product._id ? <i className='fas fa-spinner fa-spin'></i> : 'Add to cart'}
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
