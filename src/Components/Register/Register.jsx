import axios from 'axios';
import { useFormik } from 'formik';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { UserContext } from '../../Context/UserContext';
import { Helmet } from 'react-helmet';

export default function Register() {
  let { setUserLogin } = useContext(UserContext);
  let navigate = useNavigate();

  const [apiError, setapiError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // حالة لإظهار وإخفاء كلمة المرور
  const [showRePassword, setShowRePassword] = useState(false); // حالة لإظهار وإخفاء تأكيد كلمة المرور

  function handleRegistration(formValues) {
    setIsLoading(true);
    axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', formValues)
      .then((response) => {
        if (response.data.message === 'success') {
          localStorage.setItem('userToken', response.data.token);
          setUserLogin(response.data.token);
          alert('Registration completed successfully');
          navigate('/login');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  let validat = Yup.object().shape({
    name: Yup.string().min(3, 'Name at least min length is 3').max(10, 'Name max length is 10').required('Name is required'),
    email: Yup.string().email('Email is invalid').required('Email is required'),
    password: Yup.string().matches(/^[A-Z][a-z0-9]{5,10}$/, 'Password must start with uppercase and at least 5 characters ').required('Password is required'),
    rePassword: Yup.string().oneOf([Yup.ref('password')], 'The password does not match').required('RePassword is required'),
    phone: Yup.string().matches(/^01[0125][0-9]{8}$/, 'Phone is invalid').required('Phone is required'),
  });

  let formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: ''
    },
    validationSchema: validat,
    onSubmit: handleRegistration
  });

  return (
    <div className='py-8 max-w-xl mx-auto sm:px-10 md:px-8 px-4'>
      {apiError ? <div className="p-3 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
        {apiError}
      </div> : null}
      <h2 className='text-2xl font-extrabold italic text-green-600 mb-5'>Register Now :</h2>
      <form onSubmit={formik.handleSubmit}>
        {/* حقل الاسم */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.name}
            type="text"
            name="name"
            id="floating_first_name"
            className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
            required
          />
          <label htmlFor="floating_first_name" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-7 scale-75 top-3 -z-10 peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8">
            Name
          </label>
        </div>
        {formik.errors.name && formik.touched.name ? <div className="p-3 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
          {formik.errors.name}
        </div> : null}

        {/* حقل البريد الإلكتروني */}
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
        {formik.errors.email && formik.touched.email ? <div className="p-3 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
          {formik.errors.email}
        </div> : null}

        <div className="relative z-0 w-full mb-5 group">
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.password}
            type={showPassword ? "text" : "password"}
            name="password"
            id="floating_password"
            className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
            required
          />
          <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-7 scale-75 top-3 -z-10 peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8">
            Password
          </label>
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-0 top-3 cursor-pointer"
          >
            <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye text-gray-400'}`}></i>
          </span>
        </div>
        {formik.errors.password && formik.touched.password ? <div className="p-3 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
          {formik.errors.password}
        </div> : null}

        <div className="relative z-0 w-full mb-5 group">
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.rePassword}
            type={showRePassword ? "text" : "password"}
            name="rePassword"
            id="floating_repeat_password"
            className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
            required
          />
          <label htmlFor="floating_repeat_password" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-7 scale-75 top-3 -z-10 peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8">
            Confirm password
          </label>
          <span
            onClick={() => setShowRePassword(!showRePassword)}
            className="absolute right-0 top-3 cursor-pointer"
          >
            <i className={`fas ${showRePassword ? 'fa-eye-slash' : 'fa-eye text-gray-400'}`}></i>
          </span>
        </div>
        {formik.errors.rePassword && formik.touched.rePassword ? <div className="p-3 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
          {formik.errors.rePassword}
        </div> : null}

        <div className="relative z-0 w-full mb-5 group">
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.phone}
            type="tel"
            name="phone"
            id="floating_phone"
            className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
            required
          />
          <label htmlFor="floating_phone" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-7 scale-75 top-3 -z-10 peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8">
            Phone
          </label>
        </div>
        {formik.errors.phone && formik.touched.phone ? <div className="p-3 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
          {formik.errors.phone}
        </div> : null}

        <button type="submit" className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 focus:outline-none focus:bg-green-700">
          {isLoading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
}
