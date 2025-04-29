import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import Cookies from "js-cookie";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [tokenExists, setTokenExists] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("auth_token");
    setTokenExists(!!token);
  }, []);

  const handleRemoveNumber = () => {
    Cookies.remove("auth_token");
    setTokenExists(false);
    alert("Number removed. Please enter again.");
    navigate("/"); // or navigate to PhoneNumberPopup
  };
  return (


    <header className="bg-green-800 text-white py-4 shadow-md">
    <div className="container mx-auto px-4 flex items-center justify-between">
      {/* Logo / Title */}
      <Link to="/" className="text-xl font-semibold">
        🌱 Seed Protection
      </Link>

      {/* Desktop Links */}
      <nav className="hidden md:flex space-x-6 font-medium">
        <Link to="/" className="hover:text-gray-200 mt-2">Home</Link>
        <Link to="/about" className="hover:text-gray-200 mt-2">About</Link>
        <Link to="/dashboard" className="hover:text-gray-200 mt-2">Dashboard</Link>
        <Link to="/control" className="hover:text-gray-200 mt-2">Control</Link>
        <Link to="/historical" className="hover:text-gray-200 mt-2">Live Data Report</Link>
        {tokenExists && (
            <button
              onClick={handleRemoveNumber}
              className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            >
              Remove Number
            </button>
          )}
      
      </nav>

      {/* Mobile Hamburger / Close Icon */}
      <button
        className="md:hidden p-2 focus:outline-none"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
      >
        {menuOpen
          ? <AiOutlineClose size={24} />
          : <AiOutlineMenu size={24} />
        }
      </button>
    </div>

    {/* Mobile Menu */}
    {menuOpen && (
      <nav className="md:hidden bg-green-800 px-4 pb-4  font-medium ml-2 grid grid-cols-2 gap-2 cursor-pointer">
        <Link
          to="/"
          className="block hover:text-gray-400"
          onClick={() => setMenuOpen(false)}
        >Home</Link>
        <Link
          to="/about"
          className="block hover:text-gray-400"
          onClick={() => setMenuOpen(false)}
        >About</Link>
        <Link
          to="/dashboard"
          className="block hover:text-gray-400"
          onClick={() => setMenuOpen(false)}
        >Dashboard</Link>

        <Link
          to="/control"
          className="block hover:text-gray-400"
          onClick={() => setMenuOpen(false)}
        >Control</Link>

        <Link
          to="/historical"
          className="block hover:text-gray-400"
          onClick={() => setMenuOpen(false)}
        >Live Data Report</Link>


          {tokenExists && (
            <button
              onClick={() => {
                handleRemoveNumber();
                setMenuOpen(false);
              }}
              className="block text-left w-full text-red-500 hover:text-red-600"
            >
              Remove Number
            </button>
          )}
      </nav>
    )}
  </header>
  )
}

export default Navbar
