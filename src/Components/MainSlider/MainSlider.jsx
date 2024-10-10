import React from 'react';
import Slider from "react-slick";
import mainslider1 from '../../assets/images/images/slider-image-3.jpeg';
import mainslider2 from '../../assets/images/images/slider-2.jpeg';
import mainslider3 from '../../assets/images/images/grocery-banner-2.jpeg';
import slide1 from '../../assets/images/images/slider-image-1.jpeg';
import slide2 from '../../assets/images/images/slider-image-2.jpeg';

export default function MainSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 1, slidesToScroll: 1, infinite: true, dots: true } },
      { breakpoint: 600, settings: { slidesToShow: 1, slidesToScroll: 1, initialSlide: 1 } },
      { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } }
    ]
  };

  return (
    <div className="frame">
      <div className="flex flex-row md:flex-row overflow-hidden">
        {/* Slider section */}
        <div className="w-2/3 md:w-3/4 mb-8">
          <Slider {...settings}>
            <img 
              src={mainslider1} 
              alt="" 
              className='w-full h-[200px] sm:h-[300px] md:h-[400px] object-cover' 
            />
            <img 
              src={mainslider2} 
              alt="" 
              className='w-full h-[200px] sm:h-[300px] md:h-[400px] object-cover' 
            />
            <img 
              src={mainslider3} 
              alt="" 
              className='w-full h-[200px] sm:h-[200px] md:h-[400px] object-cover' 
            />
          </Slider>
        </div>

        <div className="w-1/3 md:w-1/4 flex flex-col">
          <img 
            src={slide1} 
            alt="" 
            className='w-full h-[100px] sm:h-[150px] md:h-[200px] object-cover ' 
          />
          <img 
            src={slide2} 
            alt="" 
            className='w-full h-[100px] sm:h-[150px] md:h-[200px] object-cover' 
          />
        </div>
      </div>
    </div>
  );
}
