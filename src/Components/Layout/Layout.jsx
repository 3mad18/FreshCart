import React, { useEffect, useState } from 'react'
import Style from './Layout.module.css'
import Footer from '../Footer/Footer'
import NavBar from '../NavBar/NavBar'
import { Outlet } from 'react-router-dom'
import Cart from '../Cart/Cart'
export default function Layout() {
  const [counter, setcounter] = useState(0)
  useEffect(() => { }, [])

  return <>
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-grow flex items-center justify-center">
        <div className="container w-full">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  </>

}
