import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { HashLoader } from 'react-spinners';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet';

export default function Categories() {
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedCategoryName, setSelectedCategoryName] = useState("");
  const [subcategories, setSubcategories] = useState([]);

  const getCategories = async () => {
    const response = await axios.get("https://ecommerce.routemisr.com/api/v1/categories");
    return response.data;
  };

  const getSubcategories = async (categoryId) => {
    const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${categoryId}/subcategories`);
    return response.data;
  };

  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["getCategories"],
    queryFn: getCategories,
    retry: Infinity,
  });

  const { data: subcategoryData, isLoading: isSubcategoryLoading } = useQuery({
    queryKey: ["getSubcategories", selectedCategoryId],
    queryFn: () => getSubcategories(selectedCategoryId),
    enabled: !!selectedCategoryId,
  });

  const handleCategoryClick = (categoryId, categoryName) => {
    setSelectedCategoryId(categoryId);
    setSelectedCategoryName(categoryName);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <HashLoader color='green' />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-500 text-2xl pt-20">
        <p>Something went wrong</p>
      </div>
    );
  }

  return (
    <div className="frame">
      <div className="flex flex-col overflow-hidden">
        <div className="lg:w-full lg:mx-4 lg:mb-0 flex-col lg:flex-row">
          <h1 className="text-4xl font-extrabold text-green-700 text-center">Categories</h1>
          <p className="text-lg text-gray-500 mb-4 text-center">We have a wide variety of Categories to choose from</p>

          <div className="flex flex-wrap -m-4 p-4 md:p-12">
            {data?.data.map((category, index) => (
              <div
                key={index}
                className="w-full sm:w-1/2 lg:w-1/4 p-4 transition-transform transform hover:scale-105 cursor-pointer duration-200"
                onClick={() => handleCategoryClick(category._id, category.name)}
              >
                <div className="bg-gray-100 rounded-lg p-4 h-full flex flex-col">
                  <img
                    className="w-full h-64 object-cover mb-4 rounded"
                    src={category.image}
                    alt={category.name}
                  />
                  <h3 className="text-lg font-bold text-gray-900 title-font text-center">
                    {category.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        {selectedCategoryId && (
          <div className="mt-8 py-5">
            <h2 className="text-2xl font-bold text-gray-900 title-font mb-4 p-12 text-center">
              <span className='text-green-600'>{selectedCategoryName}</span> Subcategories
            </h2>
            {isSubcategoryLoading ? (
              <div className="flex justify-center items-center min-h-screen">
                <HashLoader color='green' />
              </div>
            ) : (
              <>
                {subcategoryData?.data.length < 1 ? (
                  <h3 className="text-lg font-bold title-font text-center text-green-950">
                    No Products Available
                  </h3>
                ) : (
                  <div className="flex flex-wrap m-4">
                    {subcategoryData.data.map((subcategory, index) => (
                      <div key={index} className="w-full sm:w-1/2 lg:w-1/3 mx-auto p-6">
                        <div className="bg-gray-100 cursor-pointer rounded-lg p-2 h-full flex flex-col duration-300 hover:shadow-2xl border-transparent mx-8 border-4 hover:scale-105 hover:bg-green-200">
                          <h3 className="text-lg font-bold title-font text-center text-indigo-950">
                            {subcategory.name}
                          </h3>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Categories</title>
      </Helmet>
    </div>
  );
}
