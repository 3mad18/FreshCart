import React, { useContext, useState } from 'react';
import logo from '../../assets/images/logo.svg';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';
import { CartContext } from '../../Context/CartContext';
import { WishListContext } from '../../Context/WishListContext';

// مكون القائمة الجانبية للموبايل
function MobileMenu({ isOpen, toggleMenu, userLogin }) {
    return (
        <div
            className={`fixed top-0 backdrop-blur-lg bg-white left-0 p-6 right-0 shadow-lg transform ${isOpen ? 'translate-y-0' : '-translate-y-full'
                } transition-transform duration-300 ease-in-out lg:hidden z-40`}
        >
            <ul className="flex flex-col items-center text-lg text-gray-600 gap-6 mt-16">
                {userLogin ? (
                    <>
                        <li>
                            <NavLink
                                to={'/'}
                                className={({ isActive }) =>
                                    `p-2 rounded-lg border border-transparent ${isActive ? 'text-gray-600 font-medium bg-green-200 border-green-400' : ''
                                    }`
                                }
                                onClick={toggleMenu}
                            >
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to={'products'}
                                className={({ isActive }) =>
                                    `p-2 rounded-lg border border-transparent ${isActive ? 'text-gray-600 font-medium bg-green-200 border-green-400' : ''
                                    }`
                                }
                                onClick={toggleMenu}
                            >
                                Products
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to={'categories'}
                                className={({ isActive }) =>
                                    `p-2 rounded-lg border border-transparent ${isActive ? 'text-gray-600 font-medium bg-green-200 border-green-400' : ''
                                    }`
                                }
                                onClick={toggleMenu}
                            >
                                Categories
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to={'brands'}
                                className={({ isActive }) =>
                                    `p-2 rounded-lg border border-transparent ${isActive ? 'text-gray-600 font-medium bg-green-200 border-green-400' : ''
                                    }`
                                }
                                onClick={toggleMenu}
                            >
                                Brands
                            </NavLink>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <NavLink
                                to={'register'}
                                className={({ isActive }) =>
                                    `p-2 rounded-lg border border-transparent ${isActive ? 'bg-green-200 border-green-400 text-gray-100' : ''
                                    }`
                                }
                                onClick={toggleMenu}
                            >
                                Register
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to={'login'}
                                className={({ isActive }) =>
                                    `p-2 rounded-lg border border-transparent ${isActive ? 'bg-green-200 border-green-400 text-gray-100' : ''
                                    }`
                                }
                                onClick={toggleMenu}
                            >
                                Login
                            </NavLink>
                        </li>
                    </>
                )}
            </ul>
        </div>
    );
}

export default function NavBar() {
    const navigate = useNavigate();
    const { cartItemsNo } = useContext(CartContext);
    const { wishListCount } = useContext(WishListContext);
    const { userLogin, setUserLogin } = useContext(UserContext);

    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const signOut = () => {
        localStorage.removeItem('userToken');
        setUserLogin(null);
        navigate('/login');
    };

    return (
        <div className="frame">
            <nav className="bg-gray-100 backdrop-blur-lg fixed top-0 left-0 right-0 z-50 py-1 items-center">
                <div className="Navbar flex mx-auto items-center justify-between lg:justify-between py-3">

                    {/* الشعار */}
                    <div className="flex-shrink-0 ">
                        <Link to="/">
                            <img width={150} src={logo} alt="Fresh Cart Logo" />
                        </Link>
                    </div>

                    {/* قائمة الموبايل */}
                    <div className="lg:hidden flex items-center justify-between w-full px-2">
                        {/* الأيقونات في الوسط */}
                        <div className="flex-grow text-center">
                            {userLogin && (
                                <div className="flex items-center justify-center ">
                                    <NavLink className='mx-2' to='cart'>
                                        <div className="relative">
                                            <i className='fa fa-cart-shopping text-2xl text-green-500 hover:text-green-600'></i>
                                            <span className='absolute -top-2 -right-2 bg-white  rounded-full px-1 text-xs text-green-500 font-extrabold'>{cartItemsNo}</span>
                                        </div>                                 </NavLink>


                                    <NavLink className='mx-2' to='wishlist'>
                                        <div className="relative">

                                            <i className='fa-solid fa-heart-circle-check text-2xl text-red-500 hover:text-red-700'></i>
                                            <span className='absolute -top-2 -right-3 bg-white rounded-full px-1 text-xs text-green-500 font-extrabold'>{wishListCount}</span>
                                        </div>

                                    </NavLink>
                                </div>
                            )}
                        </div>

                        {/* زر القائمة على اليمين */}
                        <button onClick={toggleMenu} className="flex items-center px-3 py-2 border rounded text-gray-700 border-gray-700">
                            <i className={`fa ${isOpen ? 'fa-times' : 'fa-bars'} text-2xl`}></i>
                        </button>
                    </div>

                    {/* قائمة سطح المكتب */}
                    <ul className="hidden lg:flex lg:items-center  ">
                        {userLogin && (
                            <>
                                <li><NavLink className='mx-3 text-md text-slate-900 font-serif hover:text-green-600' to=''><i className="fa-solid fa-house mx-1"></i>Home</NavLink></li>
                                <li><NavLink className='mx-3 text-md text-slate-900 font-serif hover:text-green-600' to='products'><i className="fa-solid fa-shop mx-1 "></i>Products</NavLink></li>
                                <li><NavLink className='mx-3 text-md text-slate-900 font-serif hover:text-green-600' to='categories'><i className="fa-solid fa-layer-group mx-1"></i>Categories</NavLink></li>
                                <li><NavLink className='mx-3 text-md text-slate-900 font-serif hover:text-green-600' to='brands'> <i className="fa-solid fa-star mx-1"></i>Brands</NavLink></li>
                            </>
                        )}
                    </ul>

                    {/* أيقونات الجهة اليمنى على سطح المكتب */}
                    <div className="hidden lg:flex items-center px-2">
                        {userLogin ? (
                            <>
                                <NavLink className='mx-2' to='cart'>
                                    <div className="relative">
                                        <i className='fa fa-cart-shopping text-2xl text-green-500 hover:text-green-600'></i>
                                        <span className='absolute -top-2 -right-2 bg-white  rounded-full px-1 text-xs text-green-600 font-extrabold'>{cartItemsNo}</span>
                                    </div>
                                </NavLink>


                                <NavLink className='mx-2' to='wishlist'>
                                    <div className="relative">

                                        <i className='fa-solid fa-heart-circle-check text-2xl text-red-500 hover:text-red-700'></i>
                                        <span className='absolute -top-2 -right-3 bg-white rounded-full px-1 text-xs text-red-600 font-extrabold'>{wishListCount}</span>
                                    </div>

                                </NavLink>

                                <span onClick={signOut} className='text-md text-slate-900 font-serif cursor-pointer p-1 hover:text-red-600 pl-3'>Sign Out <i className='fa fa-sign-out'></i></span>
                            </>
                        ) : (
                            <>
                                <NavLink className='mx-2 text-md text-slate-900 font-serif hover:text-green-600' to='login'>Login  <i className='fa fa-sign-in '></i></NavLink>
                                <NavLink className='mx-2 text-md text-slate-900 font-serif hover:text-green-600' to='register'>Register<i className="fa-solid fa-address-card mx-1"></i></NavLink>                            </>
                        )}
                    </div>
                </div>
            </nav>

            <MobileMenu isOpen={isOpen} toggleMenu={toggleMenu} userLogin={userLogin} />
        </div>
    );
}
