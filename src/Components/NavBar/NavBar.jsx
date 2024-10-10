import React, { useContext, useState } from 'react';
import logo from '../../assets/images/logo.svg';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';
import { CartContext } from '../../Context/CartContext';
import { WishListContext } from '../../Context/WishListContext';

function MobileMenu({ isOpen, toggleMenu, userLogin, signOut, cartItemsNo, wishListCount }) {
    return (
        <div
            className={`fixed top-0 backdrop-blur-lg bg-gray-100 left-0 p-6 right-0 shadow-lg transform ${isOpen ? 'translate-y-0' : '-translate-y-full'
                } transition-transform duration-300 ease-in-out lg:hidden z-40`}
        >
            <ul className="flex flex-col items-center text-lg text-gray-600 gap-6 mt-16">
                {userLogin ? (
                    <>
                        <li>
                            <NavLink
                                to={'/'}
                                className={({ isActive }) =>
                                    `p-2 rounded-lg border border-transparent text-md text-slate-900 font-serif hover:text-green-600${isActive ? ' text-gray-600 font-medium bg-green-200 border-green-400' : ''
                                    }`
                                }
                                onClick={toggleMenu}
                            >
                                <i className="fa-solid fa-house mx-1"></i> Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to={'products'}
                                className={({ isActive }) =>
                                    `p-2 rounded-lg border border-transparent text-md ml-5 text-slate-900 font-serif hover:text-green-600${isActive ? ' text-gray-600 font-medium bg-green-200 border-green-400' : ''
                                    }`
                                }
                                onClick={toggleMenu}
                            >
                                <i className="fa-solid fa-shop mx-1 "></i> Products
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to={'categories'}
                                className={({ isActive }) =>
                                    `p-2 rounded-lg border border-transparent text-md ml-7 text-slate-900 font-serif hover:text-green-600 ${isActive ? ' bg-green-200 border-green-400' : ''
                                    }`
                                }
                                onClick={toggleMenu}
                            >
                                <i className="fa-solid fa-layer-group mx-1"></i> Categories
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to={'brands'}
                                className={({ isActive }) =>
                                    `p-2 rounded-lg border border-transparent  text-md text-slate-900 font-serif hover:text-green-600${isActive ? ' text-gray-600 font-medium bg-green-200 border-green-400' : ''
                                    }`
                                }
                                onClick={toggleMenu}
                            >
                                <i className="fa-solid fa-star mx-1"></i> Brands
                            </NavLink>
                        </li>

                        <li className="flex justify-center ml-2  gap-4 pt-2">
                            <NavLink className='mx-2' to='cart'>
                                <div className="relative">
                                    <i className='fa fa-cart-shopping text-2xl text-green-500 hover:text-green-600'></i>
                                    <span className='absolute -top-2 -right-2 bg-white rounded-full px-1 text-xs text-green-500 font-extrabold'>{cartItemsNo}</span>
                                </div>
                            </NavLink>

                            <NavLink className='mx-2' to='wishlist'>
                                <div className="relative">
                                    <i className='fa-solid fa-heart-circle-check text-2xl text-red-500 hover:text-red-700'></i>
                                    <span className='absolute -top-2 -right-3 bg-white rounded-full px-1 text-xs text-green-500 font-extrabold'>{wishListCount}</span>
                                </div>
                            </NavLink>
                        </li>
                        <li>
                            <span
                                onClick={() => {
                                    signOut();
                                    toggleMenu();
                                }}
                                className='p-2 rounded-lg border border-transparent text-md ml-4 text-slate-900 font-serif hover:text-red-600 cursor-pointer'
                            >
                                Sign Out <i className='fa fa-sign-out'></i>
                            </span>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <NavLink
                                to={'register'}
                                className={({ isActive }) =>
                                    `p-2 rounded-lg border border-transparent text-md  text-slate-900 font-serif hover:text-green-600${isActive ? ' bg-green-200 border-green-400 text-gray-100' : ''
                                    }`
                                }
                                onClick={toggleMenu}
                            >
                                Register<i className="fa-solid fa-address-card mx-1"></i>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to={'login'}
                                className={({ isActive }) =>
                                    `p-2 rounded-lg border border-transparent text-md text-slate-900 font-serif hover:text-green-600 ${isActive ? ' bg-green-200 border-green-400 text-gray-100' : ''
                                    }`
                                }
                                onClick={toggleMenu}
                            >
                                Login <i className='fa fa-sign-in '></i>
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
            <nav className="bg-gray-100 backdrop-blur-lg fixed top-0 left-0 right-0 z-50 py-1 items-center ">
                <div className="Navbar flex mx-auto items-center justify-between lg:justify-between py-3 z-50">

                    <div className="flex-shrink-0 z-50">
                        <Link to="/">
                            <img width={150} src={logo} alt="Fresh Cart Logo" />
                        </Link>
                    </div>

                    <div className="lg:hidden flex items-center justify-between w-full px-2 z-50">
                        <button onClick={toggleMenu} className="flex items-center px-3 py-2 border rounded text-gray-700 border-gray-700 ml-auto">
                            <i className={`fa ${isOpen ? 'fa-times' : 'fa-bars'} text-2xl`}></i>
                        </button>
                    </div>

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

                                <span onClick={signOut} className='text-md text-slate-900 font-serif cursor-pointer p-1 hover:text-red-600 mx-2'>
                                    Sign Out <i className='fa fa-sign-out'></i>
                                </span>
                            </>
                        ) : (
                            <>
                                <NavLink className='mx-3 text-md text-slate-900 font-serif hover:text-green-600' to='login'>Login <i className='fa fa-sign-in '></i></NavLink>
                                <NavLink className='mx-3 text-md text-slate-900 font-serif hover:text-green-600' to='register'>Register<i className="fa-solid fa-address-card mx-1"></i></NavLink>
                            </>
                        )}
                    </div>
                </div>

                <MobileMenu
                    isOpen={isOpen}
                    toggleMenu={toggleMenu}
                    userLogin={userLogin}
                    signOut={signOut}
                    cartItemsNo={cartItemsNo}
                    wishListCount={wishListCount}
                />
            </nav>
        </div>
    );
}
  


