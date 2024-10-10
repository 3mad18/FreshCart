import React, { useContext, useEffect, useState } from 'react'
import Style from './Home.module.css'
import { CounterContext } from '../../Context/CounterContext'
import RecentProducts from '../RecentProducts/RecentProducts';
import CategoriesSlider from '../CategoriesSlider/CategoriesSlider';
import MainSlider from '../MainSlider/MainSlider';
import { Helmet } from 'react-helmet';
import { HashLoader } from 'react-spinners';

export default function Home() {
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Home</title>
      </Helmet>

      {loading ? (

        <div className="flex justify-center items-center h-screen ">
          <HashLoader color="green" />
        </div>
      ) : (
        <>
          <MainSlider />
          <CategoriesSlider />
          <RecentProducts />
        </>
      )}
    </>
  );
}
