import React, { useContext, useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { create } from "../../Context/CartContext";
import logo from "../../assets/images/logo.svg";
import userImage from "../../image/user.jpg";
export default function Navbar() {
  let { cartCount } = useContext(create);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  let navigate = useNavigate();
  let { userLogin, setUserLogin } = useContext(UserContext);
  const [isActive, setIsActive] = useState(false);

  function logOut() {
    localStorage.removeItem('userToken');
    setUserLogin(null);
    navigate("/login");
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {

    // const handleScroll = () => {
    //   setIsMobileMenuOpen(false);
    // };

    // window.addEventListener("scroll", handleScroll);

    // return () => {
    //   window.removeEventListener("scroll", handleScroll);
    // };
  }, []);

  return (
    <React.Fragment>
      <nav className="sticky top-0 left-0 w-full z-[312] pb-2 pt-2 bg-[#fcfcfc]">
        <div className="flex relative items-center mx-auto  pt-0 justify-between">
          <div className="text-black w-fit  items-center font-bold md:text-sm text-[15px] mx-3">
            <Link to={`/home`} className="items-center text-green-600 justify-center hover:text-green-600 md:text-lg" >
              <img className="lg:w-[9rem]" src={logo} alt="logo" />
            </Link>
          </div>
          <div className="flex items-center justify-between me-auto w-full ">
            <ul className="md:flex hidden justify-centerspace-x-2">
              {userLogin !== null && (
                <ul className="flex items-center justify-start  ms-auto w-full">
                  <li>
                    <NavLink to="/home" className={({ isActive }) => `hoverNav mx-2 font-serif px-1 text-[18px] font-normal text-black ${isActive ? "border-b-2 border-black" : ""}`}>Home</NavLink>
                  </li>
                  <li>
                    <NavLink to="/products" className={({ isActive }) => `hoverNav mx-2 font-serif px-1 text-[18px] font-normal text-black ${isActive ? "border-b-2 border-black" : ""}`}>Products</NavLink>
                  </li>
                  <li>
                    <NavLink to="/brands" className={({ isActive }) => `hoverNav mx-2 font-serif px-1 text-[18px] font-normal text-black ${isActive ? "border-b-2 border-black" : ""}`}>Brands</NavLink>
                  </li>
                  <li>
                    <NavLink to="/categories" className={({ isActive }) => `hoverNav mx-2 font-serif px-1 text-[18px] font-normal text-black ${isActive ? "border-b-2 border-black" : ""}`}>Categories</NavLink>
                  </li>
                  <li>
                  </li>
                </ul>
              )}
            </ul>
            {userLogin !== null ? (
              <div className="hidden md:flex items-center">
                <div className="relative">
                  <div className="inline-flex items-center overflow-hidden  ">
                    {userLogin !== null ? (
                      <div className="hidden md:flex items-center justify-end pt-2">
                     
                          <Link to={`cart`} className="relative mx-6 text-sm flex">
                            <span className="text-green-600 absolute bottom-3/4 p-1 py-0 right-1/2 translate font-bold rounded-full">{cartCount}</span>
                            <i className="text-green-600 fa-solid fa-cart-shopping"></i>
                          </Link>
                      </div>
                    ) : null
                    }
                    <span className="bg-red- flex  items-center justify-items-center flex-col"
                      onClick={() => setIsActive(!isActive)}
                    >
                      <img src={userImage} alt="userImage" className="w-8 mx-3 rounded-full" />
                      <i className="text-gray-500 text-[15px] fa-solid fa-chevron-down"></i>
                    </span>
                  </div>

                  {isActive && (
                    <div
                      className="absolute end-0  z-10 mt-2 w-48 divide-y divide-gray-100 rounded-md border border-gray-100 bg-white shadow-lg"
                      role="menu"
                      onBlur={() => setIsActive(false)}
                    >
                      <div className="p-2 ">
                        <strong className="block p-2 text-xs font-medium uppercase text-gray-400">
                        </strong>
                        <li className="flex items-center p-2 cursor-pointer ">
                          <i className="text-sm me-2  ms-1 text-gray-500 fa-solid fa-bag-shopping"></i>
                          <NavLink to="/allorders" className='hoverNav text-gray-500 mx-1 text-[18px]'>allorders</NavLink>
                        </li>
                        <li className="flex items-center p-2 cursor-pointer">
                          <i className="text-sm me-2  ms-1 text-gray-500 fa-regular fa-heart"></i>
                          <NavLink to="/wishlist" className='hoverNav text-gray-500 mx-1 text-[18px]'>wishlist</NavLink>
                        </li>
                        <NavLink
                          to="/changePassword"
                          className="flex items-center rounded-lg py-2 p-2 text-sm text-gray-500"
                          role="menuitem"
                        >
                          <i className="text-sm me-2  ms-1 text-gray-500 fa-solid fa-key"></i>
                          change Password
                        </NavLink>
                        <NavLink
                          to="/updateUser"
                          className="flex items-center rounded-lg p-2 py-2 text-sm text-gray-500"
                          role="menuitem"
                        >
                          <i className="text-sm me-2 ms-1  text-gray-500   fa-solid fa-pen-clip fa-rotate-270"></i>
                          update User
                        </NavLink>
                        <li onClick={logOut} className="flex p-2 items-center cursor-pointer ">
                          <span className="hoverNav text-base font-normal text-black">

                            <i className="text-sm me-2 ms-1 text-gray-500 fa-solid fa-right-from-bracket"></i>

                            <span className="text-gray-500">
                              Logout
                            </span>
                          </span>
                        </li>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <ul className="hidden md:flex items-center list-none">
                <li className="list-none">
                  <NavLink to="/login" className={({ isActive }) => `hoverNav p-2 text-base font-normal text-black ${isActive ? "font-bold" : ""}`}>Login</NavLink>
                </li>
                <li className="list-none">
                  <NavLink to="/register" className={({ isActive }) => `hoverNav p-2 text-base font-normal text-black ${isActive ? "font-extrabold" : ""}`}>Register</NavLink>
                </li>
              </ul>
            )}
          </div>

          <div className="md:hidden flex items-center hoverNav mx-3">
            {userLogin !== null ? (
              <>
                {/* <Link to={`/wishlist`} className="mx-2 relative flex">
                  <i className="text-sm text-green-600 fa-solid fa-heart"></i>
                </Link> */}
                <Link to={`/cart`} className="mx-6 relative flex">
                  <span className="text-green-600 absolute bottom-3/4 p-1 py-0 right-1/2 translate font-bold rounded-full">{cartCount}</span>
                  <i className="text-sm text-green-600 fa-solid fa-cart-shopping"></i>
                </Link>
              </>
            ) : (
              <>
                <li>
                  <NavLink to="/login" className={({ isActive }) => `hoverNav p-2 text-base font-normal text-black ${isActive ? "border-b-2 border-black" : ""}`}>Login</NavLink>
                </li>
                <li>
                  <NavLink to="/register" className={({ isActive }) => `hoverNav p-2 text-base font-normal text-black ${isActive ? "border-b-2 border-black" : ""}`}>Register</NavLink>
                </li>
              </>
            )}
            <button onClick={toggleMobileMenu} className="outline-none p-2 mobile-menu-button">
              <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M4 6h16M4 12h16m-7 6h7"></path>
              </svg>
            </button>
          </div>
        </div>
        <div className={`mobile-menu ${isMobileMenuOpen ? "" : "hidden"} md:hidden`}>
          <ul className="mt-4 text-start space-y-7">
            {userLogin !== null && (
              <>
                <li className="mt-5">
                  <NavLink to="/home" className={({ isActive }) => `hoverNav p-2 text-base font-normal text-black ${isActive ? "border-b-2 border-black" : ""}`}>Home</NavLink>
                </li>
                <li>
                  <NavLink to="/products" className={({ isActive }) => `hoverNav p-2 text-base font-normal text-black ${isActive ? "border-b-2 border-black" : ""}`}>Products</NavLink>
                </li>
                <li>
                  <NavLink to="/brands" className={({ isActive }) => `hoverNav p-2 text-base font-normal text-black ${isActive ? "border-b-2 border-black" : ""}`}>Brands</NavLink>
                </li>
                <li>
                  <NavLink to="/categories" className={({ isActive }) => `hoverNav p-2 text-base font-normal text-black ${isActive ? "border-b-2 border-black" : ""}`}>Categories</NavLink>
                </li>
                <span className="bg-red- flex  items-center justify-items-center flex-col"
                      onClick={() => setIsActive(!isActive)}>
                      <img src={userImage} alt="userImage" className="w-8 mx-3 rounded-full" />
                      <i className="text-gray-500 text-[15px] fa-solid fa-chevron-down"></i>
                    </span>
                    {isActive && (
                    <div
                      className="absolute end-0  z-10 mt-2 w-48 divide-y divide-gray-100 rounded-md border border-gray-100 bg-white shadow-lg"
                      role="menu"
                      onBlur={() => setIsActive(false)}
                    >
                      <div className="p-2 ">
                        <strong className="block p-2 text-xs font-medium uppercase text-gray-400">
                        </strong>
                        <li className="flex items-center p-2 cursor-pointer ">
                          <i className="text-sm me-2  ms-1 text-gray-500 fa-solid fa-bag-shopping"></i>
                          <NavLink to="/allorders" className='hoverNav text-gray-500 mx-1 text-[18px]'>allorders</NavLink>
                        </li>
                        <li className="flex items-center p-2 cursor-pointer">
                          <i className="text-sm me-2  ms-1 text-gray-500 fa-regular fa-heart"></i>
                          <NavLink to="/wishlist" className='hoverNav text-gray-500 mx-1 text-[18px]'>wishlist</NavLink>
                        </li>
                        <NavLink
                          to="/changePassword"
                          className="flex items-center rounded-lg py-2 p-2 text-sm text-gray-500"
                          role="menuitem"
                        >
                          <i className="text-sm me-2  ms-1 text-gray-500 fa-solid fa-key"></i>
                          change Password
                        </NavLink>
                        <NavLink
                          to="/updateUser"
                          className="flex items-center rounded-lg p-2 py-2 text-sm text-gray-500"
                          role="menuitem"
                        >
                          <i className="text-sm me-2 ms-1  text-gray-500   fa-solid fa-pen-clip fa-rotate-270"></i>
                          update User
                        </NavLink>
                        <li onClick={logOut} className="flex p-2 items-center cursor-pointer ">
                          <span className="hoverNav text-base font-normal text-black">

                            <i className="text-sm me-2 ms-1 text-gray-500 fa-solid fa-right-from-bracket"></i>

                            <span className="text-gray-500">
                              Logout
                            </span>
                          </span>
                        </li>
                      </div>
                    </div>
                  )}
                {/* <li onClick={logOut} className="mx-3 flex justify-end cursor-pointer">
                  <span className="hoverNav p-2 text-base font-normal text-black">
                    <i className="text-sm text-[18px] text-gray-500 fa-solid fa-right-from-bracket"></i>
                  </span>
                </li> */}
              </>
            )}
          </ul>
        </div>
      </nav>
    </React.Fragment>
  );
}
