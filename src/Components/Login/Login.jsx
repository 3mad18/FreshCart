import axios from 'axios';
import { useFormik } from 'formik';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';
import { Helmet } from 'react-helmet';

export default function Login() {
  const { setUserLogin, decodeToken } = useContext(UserContext);
  const navigate = useNavigate();

  const [apiError, setApiError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (formValues) => {
    setIsLoading(true);
    try {
      const response = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', formValues);
      if (response.data.message === 'success') {
        const token = response.data.token;
        if (token) {
          localStorage.setItem('userToken', token);
          setUserLogin(token);
          const decodedToken = decodeToken();
          console.log('Decoded token on login:', decodedToken);
          navigate('/');
        } else {
          setApiError('Token is missing from response');
        }
      } else {
        setApiError(response.data.message);
      }
    } catch (error) {
      console.error('Login error:', error);
      if (error.response && error.response.status === 401) {
        setApiError('Unauthorized: Invalid credentials.');
      } else {
        setApiError('An error occurred during login. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Email is invalid').required('Email is required'),
    password: Yup.string()
      .matches(/^[A-Z][a-z0-9]{5,10}$/, 'Password must start with an uppercase letter and be between 5 and 10 characters')
      .required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: handleLogin
  });

  return (
    <div className='py-8 max-w-xl mx-auto px-4 sm:px-10 md:px-8'>
      {apiError && (
        <div className="p-3 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
          {apiError}
        </div>
      )}
      <h2 className='text-2xl font-extrabold italic text-green-600 mb-5'>Login Now :</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="relative z-0 w-full mb-5 group">
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.email}
            type="email"
            name="email"
            id="floating_email"
            className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
            required
          />
          <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-7 scale-75 top-3 -z-10 peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8">
            Email address
          </label>
        </div>
        {formik.errors.email && formik.touched.email && (
          <div className="p-3 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
            {formik.errors.email}
          </div>
        )}

        <div className="relative z-0 w-full mb-5 group">
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.password}
            type="password"
            name="password"
            id="floating_password"
            className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
            required
          />
          <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-7 scale-75 top-3 -z-10 peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8">
            Password
          </label>
        </div>
        {formik.errors.password && formik.touched.password && (
          <div className="p-3 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
            {formik.errors.password}
          </div>
        )}

        <div className="flex items-center justify-between">
          <p className='text-sm'>Don't have an account yet? <span className='font-semibold underline text-green-700'><NavLink to='/register'>Register Now</NavLink></span></p>
          <button type="submit" className="text-white bg-green-500 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-20 py-2 text-center">
            {isLoading ? <i className='fas fa-spinner fa-spin'></i> : 'Login'}
          </button>
        </div>
      </form>

      <Helmet>
        <meta charSet="utf-8" />
        <title>Login</title>
      </Helmet>
    </div>
  );
}
