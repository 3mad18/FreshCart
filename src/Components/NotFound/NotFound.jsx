import React from "react";
import notFoundImage from '../../assets/image-36.png';
import { Helmet } from "react-helmet";

export default function NotFound() {
  return (
    <>
      <div className="flex flex-col justify-center items-center py-8">
        <img src={notFoundImage} alt="Not Found" className="w-1/2 h-auto" />
        <h1 className="text-4xl text-gray-800 mt-4">Page Not Found</h1>
        <Helmet>
          <meta charSet="utf-8" />
          <title>404</title>
        </Helmet>
      </div>
    </>
  );
}
