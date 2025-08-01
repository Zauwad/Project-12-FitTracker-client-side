import { Link, NavLink, useNavigate } from "react-router";
import { useState } from "react";
import useAuth from "../../../hooks/UseAuth";
// import { AuthContext } from "../providers/AuthProvider"; // example context for auth

const Navbar = () => {
    const { user, logOut } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate()

    const handleLogout = () => {
        logOut();
    };

    const navLinks = (
        <>
            <li><NavLink to="/" className="hover:text-primary">Home</NavLink></li>
            <li><NavLink to="/trainers" className="hover:text-primary">All Trainers</NavLink></li>
            <li><NavLink to="/classes" className="hover:text-primary">All Classes</NavLink></li>
            <li><NavLink to="/community" className="hover:text-primary">Community</NavLink></li>
            {user && <li><NavLink to="/dashboard" className="hover:text-primary">Dashboard</NavLink></li>}
        </>
    );

    return (
        <div className="navbar bg-base-100 shadow-md px-4">
            <div className="navbar-start">
                <Link to="/" className="text-2xl font-bold text-primary">FitTrackerPro</Link>
            </div>

            <div className="navbar-center hidden md:flex">
                <ul className="menu menu-horizontal px-1 space-x-4">
                    {navLinks}
                </ul>
            </div>

            <div className="navbar-end">
                {user ? (
                    <div className="flex items-center gap-3">
                        {/* Profile Picture */}
                        <Link to="/profile">
                            <img
                                src={user.photoURL || "https://i.ibb.co/MBtjqXQ/default-profile.png"}
                                alt="Profile"
                                className="w-10 h-10 rounded-full border-2 border-primary cursor-pointer"
                            />
                        </Link>
                        {/* Logout */}
                        <button onClick={handleLogout} className="btn btn-outline btn-sm">Logout</button>
                    </div>
                ) : (
                    <Link to="/login" className="btn btn-primary btn-sm">Login</Link>
                )}
                {/* Mobile menu toggle */}
                <div className="md:hidden ml-2">
                    <button onClick={() => setMenuOpen(!menuOpen)} className="btn btn-ghost">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="absolute top-16 left-0 w-full bg-base-100 shadow-md md:hidden">
                    <ul className="menu p-2">{navLinks}</ul>
                </div>
            )}
        </div>
    );
};

export default Navbar;
