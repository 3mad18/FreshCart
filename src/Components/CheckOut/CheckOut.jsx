import React, { useContext, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { CartContext } from '../../Context/CartContext';
import { useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function CheckOut() {
  let { cartId } = useParams();
  let { cashOnDelivery } = useContext(CartContext);
  let navigate = useNavigate();

  useEffect(() => {
    console.log('Cart ID from URL:', cartId);

    if (!cartId) {
      console.error('Cart ID is missing from the URL');
    }
  }, [cartId]);

  async function pay() {
    console.log('Form values:', formik.values);
    console.log('Cart ID:', cartId);

    if (!cartId) {
      console.error("Cart ID is missing");
      return;
    }

    let url = `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`;
    if (isOnlinePayment) {
      url = `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5174`;
    }

    try {
      let response = await cashOnDelivery(url, formik.values);

      if (response.status === 'success') {
        console.log('Response:', response);
        if (isOnlinePayment) {
          window.location.href = response.session.url;
        } else {
          navigate('/allorders');
        }
      } else {
        console.error("Payment failed:", response);
      }
    } catch (error) {
      console.error("Error during payment:", error);
    }
  }


  const [isOnlinePayment, setIsOnlinePayment] = useState(false);
  const [countryid, setCountryid] = useState(0);

  const egyptGovernorates = [
    "Cairo", "Giza", "Alexandria", "Dakahlia", "Red Sea", "Beheira",
    "Fayoum", "Gharbia", "Ismailia", "Monufia", "Minya", "Qalyubia",
    "New Valley", "Suez", "Aswan", "Assiut", "Beni Suef", "Port Said",
    "Damietta", "Sharqia", "South Sinai", "Kafr El Sheikh", "Matrouh",
    "Luxor", "Qena", "North Sinai", "Sohag"
  ];

  const validationSchema = Yup.object({
    phone: Yup.string()
      .matches(/^01[0-2,5]\d{8}$/, "Invalid phone number. Please enter a valid 11-digit phone number starting with 01.")
      .required("Phone number is required"),
    details: Yup.string().required("Details are required"),
    city: Yup.string().required("You must select a governorate")
  });

  let formik = useFormik({
    initialValues: {
      details: '',
      phone: '',
      city: ''
    },
    validationSchema,
    onSubmit: pay
  });

  return (
    <>
      <div className="frame py-10">
        <form onSubmit={formik.handleSubmit} className='max-w-lg mx-auto bg-glass p-8 shadow-xl rounded-lg w-full flex flex-col items-center gap-6'>
          <h1 className='text-4xl font-extrabold text-green-700 text-center'>Check Out</h1>

          <div className="w-full">
            <label htmlFor="phone" className='block mb-1 text-sm font-medium text-gray-600'>Your phone</label>
            <input
              name='phone'
              type="tel"
              id="phone"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.phone}
              className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 ${formik.touched.phone && formik.errors.phone ? 'border-red-500' : ''}`}
              placeholder="Type Your Phone"
              required
            />
            {formik.touched.phone && formik.errors.phone ? (
              <div className="mb-2  text-sm text-red-800" >
                <span className="font-medium">Error:</span> {formik.errors.phone}
              </div>
            ) : null}
          </div>

          <div className="w-full">
            <label htmlFor="details" className='block mb-1 text-sm font-medium text-gray-600'>Your details</label>
            <input
              name='details'
              type="text"
              id="details"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.details}
              className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 ${formik.touched.details && formik.errors.details ? 'border-red-500' : ''}`}
              placeholder="Type Any details you want"
              required
            />
            {formik.touched.details && formik.errors.details ? (
              <div className="mb-2 text-sm text-red-800" >
                <span className="font-medium">Error:</span> {formik.errors.details}
              </div>
            ) : null}
          </div>

          <div className='relative z-0 w-full mb-5 group'>
            <select
              value={formik.values.city}
              name="city"
              id="city"
              onChange={(e) => {
                setCountryid(e.target.value);
                formik.setFieldValue("city", e.target.value);
              }}
              className={`bg-gray-50 py-3 px-0 w-full text-md text-gray-700 bg-transparent border-b-2 border-gray-400 focus:outline-none focus:border-green-500 transition duration-200 ${formik.touched.city && formik.errors.city ? 'border-red-500' : ''}`}
            >
              <option value="" disabled>Select Governorate</option>
              {egyptGovernorates.map((gov, index) => (
                <option key={index} value={gov}>{gov}</option>
              ))}
            </select>
            {formik.touched.city && formik.errors.city ? (
              <div className="mb-2 text-sm text-red-800" >
                <span className="font-medium">Error:</span> {formik.errors.city}
              </div>
            ) : null}
          </div>

          <div className="w-full">
            <input type="checkbox" id='forOnline' onChange={() => setIsOnlinePayment(!isOnlinePayment)} className="mr-2" />
            <label htmlFor="forOnline" className='text-sm font-medium text-gray-900'>Pay Online <i className='fa-regular fa-credit-card'></i></label>
          </div>

          <button type="submit" className="w-full text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2 text-center">
            {isOnlinePayment ? "Pay Online" : "Cash On Delivery"}
          </button>
        </form>

        <Helmet>
          <meta charSet="utf-8" />
          <title>Check Out</title>
        </Helmet>
      </div>
    </>
  );
}
