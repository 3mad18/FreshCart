import React, { useState } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { HashLoader } from 'react-spinners';
import { Helmet } from 'react-helmet';

export default function Brands() {
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [loading, setLoading] = useState(false);

  function getBrands() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/brands');
  }

  const { data, isError, error, isLoading } = useQuery({
    queryKey: ['allbrands'],
    queryFn: getBrands,
    retry: Infinity,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <HashLoader color="green" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-500 text-2xl mt-10">
        <p>Something went wrong: {error.message}</p>
      </div>
    );
  }

  const handleBrandClick = (brand) => {
    setLoading(true);
    setSelectedBrand(brand);
    setTimeout(() => setLoading(false), 500);
  };

  const handleClosePopup = (e) => {
    if (e.target.id === 'popup-overlay') {
      setSelectedBrand(null);
    }
  };

  return (
    <div className="frame mb-10">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Brands</title>
      </Helmet>
      <h1 className="text-4xl font-extrabold text-green-700 text-center">All Brands</h1>
      <p className="text-lg text-gray-500 mb-10 text-center">We have a wide variety of brands to choose from</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {data?.data?.data.map((brand) => (
          <div
            key={brand._id}
            className="p-2 md:p-4 rounded border-2 hover:bg-gray-100 duration-300 cursor-pointer"
            onClick={() => handleBrandClick(brand)}
          >
            <img src={brand.image} alt={brand.name} className="w-full h-24 md:h-40 object-cover mb-2" />
            <h2 className="text-lg md:text-2xl text-center text-gray-600 font-semibold mb-2">{brand.name}</h2>
          </div>
        ))}
      </div>
      {selectedBrand && (
        <div
          id="popup-overlay"
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={handleClosePopup}
        >
          <div className="bg-white p-4 md:p-6 rounded shadow-lg relative max-w-md w-full animate-slide-down">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => setSelectedBrand(null)}
            >
              &times;
            </button>
            <h2 className="text-2xl md:text-3xl text-green-600 font-bold">{selectedBrand.name}</h2>
            <p className="text-gray-500 mb-2">{selectedBrand.slug}</p>
            <img src={selectedBrand.image} alt={selectedBrand.name} className="w-full h-24 md:h-40 object-cover mb-4" />
            <button
              className="mt-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded"
              onClick={() => setSelectedBrand(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
