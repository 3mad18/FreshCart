import React, { useEffect, useState } from 'react'
import Slider from "react-slick";
import axios from 'axios';

export default function CategoriesSlider() {
  const [categories, setCategories] = useState([]);

  function getCategories() {
    axios.get('https://ecommerce.routemisr.com/api/v1/categories')
      .then(({ data }) => {
        setCategories(data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    getCategories();
  }, []);

  var settings = {
    focusOnSelect: true,
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 8,  
    slidesToScroll: 1,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,  
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,  
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,  
        settings: {
          slidesToShow: 1, 
          slidesToScroll: 1
        }
      }
    ]
  };
  

  return (
    <div className="frame">
      <div className="py-5 ">
        <h2 className='font-serif text-lg py-2 text-green-600'>Shop Popular Categories</h2>
        <Slider {...settings}>
          {categories.map((category) => (
            <div key={category._id}>
              <img className='category-image w-full' src={category.image} alt={category.name} />
              <h3 className='font-light'>{category.name}</h3>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
