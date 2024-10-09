import { lazy, Suspense, useContext, useEffect, useState } from 'react';
import './App.css';
import { createBrowserRouter, createHashRouter, RouterProvider } from 'react-router-dom';
import LayOut from './Components/Layout/Layout';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import NotFound from './Components/NotFound/NotFound';
import { UserContextProvider } from './Context/UserContext';
import CounterContextProvider from './Context/CounterContext';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import CartContextProvider, { CartContext } from './Context/CartContext';
import toast, { Toaster } from 'react-hot-toast';
import { Offline, Online } from 'react-detect-offline';
import { HashLoader } from 'react-spinners';
import WishListContextProvider from './Context/WishListContext';



let query = new QueryClient();

let Home = lazy(() => import('./Components/Home/Home'));
let Products = lazy(() => import('./Components/Products/Products'));
let Categories = lazy(() => import('./Components/Categories/Categories'));
let Cart = lazy(() => import('./Components/Cart/Cart'));
let Brands = lazy(() => import('./Components/Brands/Brands'));
let ProductsDetails = lazy(() => import('./Components/ProductsDetails/ProductsDetails'));
let CheckOut = lazy(() => import('./Components/CheckOut/CheckOut'));
let Order = lazy(() => import('./Components/Order/Order'));
let WishList = lazy(() => import('./Components/WishList/WishList'));

let router = createHashRouter([
  {
    path: '/',
    element: <LayOut />,
    children: [
      {
        index: true, element: <ProtectedRoute>
          <Suspense fallback={<div className="loading"><HashLoader color="green" /></div>}>
            <Home />
          </Suspense>
        </ProtectedRoute>
      },
      {
        path: 'home', element: <ProtectedRoute>
          <Suspense fallback={<div className="loading"><HashLoader color="green" /></div>}>
            <Home />
          </Suspense>
        </ProtectedRoute>
      },
      {
        path: 'products', element: <ProtectedRoute>
          <Suspense fallback={<div className="loading"><HashLoader color="green" /></div>}>
            <Products />
          </Suspense>
        </ProtectedRoute>
      },
      {
        path: 'categories', element: <ProtectedRoute>
          <Suspense fallback={<div className="loading"><HashLoader color="green" /></div>}>
            <Categories />
          </Suspense>
        </ProtectedRoute>
      },
      {
        path: 'productdetails/:id/:category', element: <ProtectedRoute>
          <Suspense fallback={<div className="loading"><HashLoader color="green" /></div>}>
            <ProductsDetails />
          </Suspense>
        </ProtectedRoute>
      },
      {
        path: 'cart', element: <ProtectedRoute>
          <Suspense fallback={<div className="loading"><HashLoader color="green" /></div>}>
            <Cart />
          </Suspense>
        </ProtectedRoute>
      },

      {
        path: 'brands', element: <ProtectedRoute>
          <Suspense fallback={<div className="loading"><HashLoader color="green" /></div>}>
            <Brands />
          </Suspense>
        </ProtectedRoute>
      },
      {
        path: 'WishList', element: <ProtectedRoute>
          <Suspense fallback={<div className="loading"><HashLoader color="green" /></div>}>
            <WishList />
          </Suspense>
        </ProtectedRoute>
      },
      {
        path: 'checkout/:cartId', element: <ProtectedRoute>
          <Suspense fallback={<div className="loading"><HashLoader color="green" /></div>}>
            <CheckOut />
          </Suspense>
        </ProtectedRoute>
      },
      {
        path: 'allorders', element: <ProtectedRoute>
          <Suspense fallback={<div className="loading"><HashLoader color="green" /></div>}>
            <Order />
          </Suspense>
        </ProtectedRoute>
      },

      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: '*', element: <NotFound /> },
    ]
  },
]);

function App() {
  const { getLoggedUserCart, setCartItemsNo } = useContext(CartContext);
  const [isOnline, setIsOnline] = useState(true);
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    getCartItem();
    const handleOnline = () => {
      setIsOnline(true);
      setShowWarning(true);
      setTimeout(() => setShowWarning(false), 5000);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowWarning(true);
      setTimeout(() => setShowWarning(false), 5000);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  async function getCartItem() {
    try {
      let response = await getLoggedUserCart();
      setCartItemsNo(response.data.numOfCartItems);
    } catch (error) {
      console.error('Error fetching cart items', error);
    }
  }

  return (
    <QueryClientProvider client={query}>
      <UserContextProvider>
        <CounterContextProvider>
          <CartContextProvider>
            <WishListContextProvider>
              <Suspense fallback={<div className="loading"><HashLoader color="green" /></div>}>
                <RouterProvider router={router} />
              </Suspense>
              <Toaster />
              {showWarning && (
                <div className={`fixed bottom-0 left-0 right-0 text-white text-center py-2 ${isOnline ? 'bg-green-500' : 'bg-red-700'}`}>
                  {isOnline ? "Internet connection restored!" : "You are offline!"}
                </div>
              )}
              <ReactQueryDevtools />
            </WishListContextProvider>
          </CartContextProvider>
        </CounterContextProvider>
      </UserContextProvider>
    </QueryClientProvider>
  );
}

export default App;