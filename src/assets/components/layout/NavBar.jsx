import React from 'react';
import {Menu, X, ShoppingCart, Search, User} from 'lucide-react';
import {Flower2} from 'lucide-react';
import logo from '../../images/muggy.jpg';
import useCart from "../cart/CartContext.jsx";
import './NavbarStyles.css'

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const { itemCount } = useCart();

    return (
        <header className="fixed w-full navbar-gradient shadow-lg z-50">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-20 relative">
                    {/* Decorative flowers */}
                    <Flower2 className="flower-icon left-2" />
                    <Flower2 className="flower-icon right-2" />

                    <a href="" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img src={logo} className="h-10 rounded-full shadow-md" alt="Muggie Logo"/>
                        <span className="self-center text-2xl font-semibold whitespace-nowrap text-pink-600 hover:text-pink-700 transition-colors">
                            Muggie
                        </span>
                    </a>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex space-x-8">
                        <a href="/" className="nav-link text-pink-700 hover:text-pink-500">Home</a>
                        <a href="/mugs" className="nav-link text-pink-700 hover:text-pink-500">Collection</a>
                        <a href="/mugs/bestsellers" className="nav-link text-pink-700 hover:text-pink-500">Best Sellers</a>
                        <a href="#contact" className="nav-link text-pink-700 hover:text-pink-500">Contact</a>
                        <a href="/cart" className="text-pink-700 hover:text-pink-500 relative transition-transform hover:scale-110">
                            <ShoppingCart className="w-6 h-6" />
                            {itemCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full animate-pulse">
                                    {itemCount}
                                </span>
                            )}
                        </a>
                        <button className="text-pink-700 hover:text-pink-500 transition-transform hover:scale-110">
                            <Search className="w-6 h-6"/>
                        </button>
                        <button className="text-pink-700 hover:text-pink-500 transition-transform hover:scale-110">
                            <User className="w-6 h-6"/>
                        </button>
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
                        <a href="/" className="block px-3 py-2 text-pink-700 hover:text-pink-500 hover:bg-pink-100 rounded-lg transition-colors">Home</a>
                        <a href="/mugs" className="block px-3 py-2 text-pink-700 hover:text-pink-500 hover:bg-pink-100 rounded-lg transition-colors">Collection</a>
                        <a href="#bestsellers" className="block px-3 py-2 text-pink-700 hover:text-pink-500 hover:bg-pink-100 rounded-lg transition-colors">Best Sellers</a>
                        <a href="#contact" className="block px-3 py-2 text-pink-700 hover:text-pink-500 hover:bg-pink-100 rounded-lg transition-colors">Contact</a>
                    </div>
                </div>
            )}
        </header>
    );
}
