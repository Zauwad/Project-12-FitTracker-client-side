import { Link, NavLink } from "react-router";
import { useState } from "react";
import useAuth from "../../../hooks/UseAuth";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => logOut();

  const navLinks = (
    <>
      <li><NavLink to="/" className="text-[#FAFAFA] hover:text-[#17CF63]">Home</NavLink></li>
      <li><NavLink to="/trainers" className="text-[#FAFAFA] hover:text-[#17CF63]">All Trainers</NavLink></li>
      <li><NavLink to="/classes" className="text-[#FAFAFA] hover:text-[#17CF63]">All Classes</NavLink></li>
      <li><NavLink to="/community" className="text-[#FAFAFA] hover:text-[#17CF63]">Community</NavLink></li>
      <li><NavLink to="/dashboard" className="text-[#FAFAFA] hover:text-[#17CF63]">Dashboard</NavLink></li>
    </>
  );

  return (
    <nav className="sticky top-0 z-50 bg-[#0C0C0E]/70 backdrop-blur-lg border-b border-[#2C2C30]/40 shadow-md transition-all duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">

        {/* 🔹 Left - Brand */}
        <Link to="/" className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
          Fit<span className="text-[#17CF63]">Track</span>
        </Link>

        {/* 🔹 Center - Desktop Navigation */}
        <div className="hidden md:flex space-x-6 font-medium">
          <ul className="flex items-center gap-6">{navLinks}</ul>
        </div>

        {/* 🔹 Right - Profile / Login */}
        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-3">
              <Link to="/dashboard">
                <img
                  src={user.photoURL || "https://i.ibb.co/MBtjqXQ/default-profile.png"}
                  alt="Profile"
                  className="w-9 h-9 rounded-full border-2 border-[#17CF63] cursor-pointer"
                />
              </Link>
              <button
                onClick={handleLogout}
                className="text-sm font-semibold text-white border border-[#17CF63] px-4 py-1.5 rounded-lg hover:bg-[#17CF63] hover:text-black transition-all duration-200"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="text-sm font-semibold text-white  px-5 py-2 rounded-lg hover:bg-[#14b558] transition-all duration-200 outline-2 outline-[#17CF63]"
            >
              Login
            </Link>
          )}

          {/* 🔹 Mobile Menu Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-white hover:text-[#17CF63] focus:outline-none"
          >
            {menuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* 🔹 Mobile Dropdown */}
      <div
        className={`md:hidden bg-[#0C0C0E] border-t border-[#2C2C30]/50 transition-all duration-500 ease-in-out overflow-hidden ${
          menuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col items-center py-4 space-y-3 font-medium">
          {navLinks}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
