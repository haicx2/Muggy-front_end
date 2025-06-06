import React, {useEffect, useRef, useState} from 'react';
import {Flower2, Heart, LogOut, Menu, Settings, ShoppingBag, ShoppingCart, User, X} from 'lucide-react';
import {Link} from 'react-router-dom';
import logo from '../../images/muggy.jpg';
import useCart from "../cart/CartContext.jsx";
import {useAuth} from "../user/AuthContext.jsx";
import './NavbarStyles.css';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
    const {itemCount} = useCart();
    const {user, logout} = useAuth();
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsUserDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleLogout = () => {
        logout();
        setIsUserDropdownOpen(false);
    };

    return (
        <header className="fixed w-full navbar-gradient shadow-lg z-50">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-20 relative">
                    {/* Decorative flowers - moved further to the sides */}
                    <Flower2 className="flower-icon left-flower"/>
                    <Flower2 className="flower-icon right-flower"/>

                    <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img src={logo} className="h-14 w-14 rounded-full shadow-md" alt="Muggie Logo"/>
                        <span
                            className="self-center text-3xl font-semibold whitespace-nowrap text-pink-600 hover:text-pink-700 transition-colors">
                            Muggie
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex space-x-8 items-center">
                        <Link to="/" className="nav-link text-pink-700 hover:text-pink-500">Home</Link>
                        <Link to="/mugs" className="nav-link text-pink-700 hover:text-pink-500">Collection</Link>
                        <Link to="/mugs/bestsellers" className="nav-link text-pink-700 hover:text-pink-500">Best
                            Sellers</Link>
                        <Link to="/contact" className="nav-link text-pink-700 hover:text-pink-500">Contact</Link>

                        {user && (
                            <span className="text-pink-700 font-medium">
                                Welcome, {user.name}!
                            </span>
                        )}

                        <Link to="/cart"
                              className="text-pink-700 hover:text-pink-500 relative transition-transform hover:scale-110">
                            <ShoppingCart className="w-6 h-6"/>
                            {itemCount > 0 && (
                                <span
                                    className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full animate-pulse">
                                    {itemCount}
                                </span>
                            )}
                        </Link>

                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                                className={`text-pink-700 hover:text-pink-500 transition-all rounded-full p-1
                                         ${user ? 'bg-pink-100' : ''} ${isUserDropdownOpen ? 'ring-2 ring-pink-300' : ''}`}
                            >
                                <User className="w-6 h-6"/>
                            </button>

                            {isUserDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-2 z-50
                                              border-2 border-pink-100 animate-fadeIn">
                                    {user ? (
                                        <>
                                            <div className="px-4 py-2 border-b border-pink-100">
                                                <p className="text-sm font-medium text-gray-700">{user.name}</p>
                                                <p className="text-xs text-gray-500 truncate">{user.email}</p>
                                            </div>
                                            <Link to="/profile"
                                                  className="px-4 py-2 text-sm text-gray-700 hover:bg-pink-50 flex items-center">
                                                <User className="w-4 h-4 mr-2 text-pink-400"/>
                                                My Profile
                                            </Link>
                                            <Link to="/orders"
                                                  className="px-4 py-2 text-sm text-gray-700 hover:bg-pink-50 flex items-center">
                                                <ShoppingBag className="w-4 h-4 mr-2 text-pink-400"/>
                                                My Orders
                                            </Link>
                                            <Link to="/wishlist"
                                                  className="px-4 py-2 text-sm text-gray-700 hover:bg-pink-50 flex items-center">
                                                <Heart className="w-4 h-4 mr-2 text-pink-400"/>
                                                Wishlist
                                            </Link>
                                            <Link to="/settings"
                                                  className="px-4 py-2 text-sm text-gray-700 hover:bg-pink-50 flex items-center">
                                                <Settings className="w-4 h-4 mr-2 text-pink-400"/>
                                                Settings
                                            </Link>
                                            <div className="border-t border-pink-100 mt-1"></div>
                                            <button
                                                onClick={handleLogout}
                                                className="px-4 py-2 text-sm text-red-600 hover:bg-pink-50 flex items-center w-full text-left"
                                            >
                                                <LogOut className="w-4 h-4 mr-2"/>
                                                Sign Out
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <Link to="/login"
                                                  className="px-4 py-3 text-sm font-medium text-gray-700 hover:bg-pink-50 flex items-center">
                                                Sign In
                                            </Link>
                                            <Link to="/register"
                                                  className="px-4 py-3 text-sm font-medium text-pink-600 hover:bg-pink-50 flex items-center">
                                                Create Account
                                            </Link>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-pink-600 hover:text-pink-700 transition-colors"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X/> : <Menu/>}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <div className="md:hidden navbar-gradient border-t border-pink-200">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        <Link to="/"
                              className="block px-3 py-2 text-pink-700 hover:text-pink-500 hover:bg-pink-100 rounded-lg transition-colors">Home</Link>
                        <Link to="/mugs"
                              className="block px-3 py-2 text-pink-700 hover:text-pink-500 hover:bg-pink-100 rounded-lg transition-colors">Collection</Link>
                        <Link to="/mugs/bestsellers"
                              className="block px-3 py-2 text-pink-700 hover:text-pink-500 hover:bg-pink-100 rounded-lg transition-colors">Best
                            Sellers</Link>
                        <Link to="/contact"
                              className="block px-3 py-2 text-pink-700 hover:text-pink-500 hover:bg-pink-100 rounded-lg transition-colors">Contact</Link>

                        {user ? (
                            <>
                                <div className="block px-3 py-2 text-pink-700 font-medium">Welcome, {user.name}!</div>
                                <Link to="/profile"
                                      className="block px-3 py-2 text-pink-700 hover:text-pink-500 hover:bg-pink-100 rounded-lg transition-colors">My
                                    Profile</Link>
                                <Link to="/orders"
                                      className="block px-3 py-2 text-pink-700 hover:text-pink-500 hover:bg-pink-100 rounded-lg transition-colors">My
                                    Orders</Link>
                                <button
                                    onClick={handleLogout}
                                    className="block w-full text-left px-3 py-2 text-red-600 hover:text-red-700 hover:bg-pink-100 rounded-lg transition-colors"
                                >
                                    Sign Out
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login"
                                      className="block px-3 py-2 text-pink-700 hover:text-pink-500 hover:bg-pink-100 rounded-lg transition-colors">Sign
                                    In</Link>
                                <Link to="/register"
                                      className="block px-3 py-2 text-pink-700 hover:text-pink-500 hover:bg-pink-100 rounded-lg transition-colors">Create
                                    Account</Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
}