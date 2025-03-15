import React from 'react';
import {Menu, X, ShoppingCart, Search, User} from 'lucide-react';
import logo from '../../images/muggy.jpg';
import useCart from "../cart/CartContext.jsx";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const { itemCount } = useCart();

    return (
        <header className="fixed w-full bg-pink-50 shadow-sm z-50">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-20">
                    <a href="" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img src={logo} className="h-8" alt="Muggy Logo"/>
                        <span
                            className="self-center text-2xl font-semibold whitespace-nowrap text-pink-600">Muggy</span>
                    </a>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex space-x-8">
                        <a href="/" className="text-gray-700 hover:text-pink-500">Home</a>
                        <a href="/mugs" className="text-gray-700 hover:text-pink-500">Collection</a>
                        <a href="#bestsellers" className="text-gray-700 hover:text-pink-500">Best Sellers</a>
                        <a href="#contact" className="text-gray-700 hover:text-pink-500">Contact</a>
                        <a href="/cart" className="text-gray-700 hover:text-pink-500 relative">
                            <ShoppingCart className="w-6 h-6" />
                            {itemCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                                    {itemCount}
                                </span>
                            )}
                        </a>
                        <button className="text-gray-700 hover:text-pink-500">
                            <Search className="w-6 h-6"/>
                        </button>
                        <button className="text-gray-700 hover:text-pink-500">
                            <User className="w-6 h-6"/>
                        </button>
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-pink-600"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X/> : <Menu/>}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <div className="md:hidden bg-pink-50 border-t border-pink-100">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        <a href="/" className="block px-3 py-2 text-gray-700 hover:text-pink-500 hover:bg-pink-100 rounded">Home</a>
                        <a href="/mugs" className="block px-3 py-2 text-gray-700 hover:text-pink-500 hover:bg-pink-100 rounded">Collection</a>
                        <a href="#bestsellers" className="block px-3 py-2 text-gray-700 hover:text-pink-500 hover:bg-pink-100 rounded">Best Sellers</a>
                        <a href="#contact" className="block px-3 py-2 text-gray-700 hover:text-pink-500 hover:bg-pink-100 rounded">Contact</a>
                    </div>
                </div>
            )}
        </header>
    );
}