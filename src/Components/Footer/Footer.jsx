import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-slate-100 text-gray-800 py-6 backdrop-blur-sm mt-auto">
      <div className="mx-auto px-4 md:px-8 lg:px-16">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-12 mb-8 md:mb-0 w-full">
            <div className="w-full">
              <h2 className="text-lg font-semibold">Get The FreshCart App</h2>
              <h3 className="font-light pb-2">
                We will send you a link. Open it on your phone to download the app.
              </h3>
              <div>
                <div className="flex flex-col md:flex-row space-x-0 md:space-x-4 w-full">
                  <div className="w-full md:w-5/6">
                    <input
                      type="email"
                      id="helper-text"
                      aria-describedby="helper-text-explanation"
                      className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      placeholder="Email..."
                    />
                  </div>
                  <div className="w-full md:w-1/6 mt-2 md:mt-0">
                    <button className="text-white bg-green-500 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full py-2.5 text-center">
                      Share App Link
                    </button>
                  </div>
                </div>

                <div className="border-t-2 my-6"></div>

                <div className="flex flex-col md:flex-row justify-between items-center w-full">
                  <div className="flex items-center space-x-4 mb-4 md:mb-0">
                    <div className="font-light text-xl">Payment Partners</div>
                    <div className="flex items-center ml-6 space-x-4"> 
                      <i className="fa-brands fa-amazon mt-1 text-2xl" />
                      <i className="fa-brands fa-cc-paypal mt-1 text-2xl" />
                      <i className="fa-brands fa-cc-mastercard mt-1 text-2xl" />
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 ml-auto"> 
                    <div className="font-light text-lg">Get deliveries with FreshCart</div>
                    <i className="fa-brands fa-cc-apple-pay mt-1 text-2xl" />
                    <i className="fa-brands fa-google-play mt-1 text-2xl" />
                  </div>
                </div>
                <div className="border-t-2 mt-6"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center mt-8">
          <p className="text-sm">&copy; 2024 FreshCart App. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
