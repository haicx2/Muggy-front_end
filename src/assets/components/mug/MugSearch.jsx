import React, { useState } from 'react';
import { Search, SlidersHorizontal, Flower2 } from 'lucide-react';
import './MugSearchStyles.css';

export default function MugSearch({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        if (onSearch) {
            onSearch(value);
        }
    };

    return (
        <div className="search-container p-6 rounded-2xl shadow-sm mb-8 relative overflow-hidden">
            <Flower2 className="search-flower flower-1 w-6 h-6" />
            <Flower2 className="search-flower flower-2 w-6 h-6" />
            <Flower2 className="search-flower flower-3 w-5 h-5" />

            <div className="flex gap-4 items-center">
                <div className="flex-1 relative">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearch}
                        placeholder="Search for your perfect mug..."
                        className="search-input w-full pl-12 pr-4 py-3 border-2 border-pink-200 rounded-xl
                                 focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-200
                                 bg-white/80 backdrop-blur-sm text-gray-700 placeholder-gray-400"
                    />
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-400 w-5 h-5" />
                </div>

                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="filter-button flex items-center gap-2 px-6 py-3 border-2 border-pink-200
                             rounded-xl hover:border-pink-400 hover:bg-pink-50 transition-all
                             bg-white/80 backdrop-blur-sm text-gray-700"
                >
                    <SlidersHorizontal className="w-5 h-5 text-pink-400" />
                    <span>Filters</span>
                </button>
            </div>

            {/* Filter Panel */}
            {isOpen && (
                <div className="mt-4 p-4 bg-white/90 backdrop-blur-sm rounded-xl border-2 border-pink-100">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Price Range</label>
                            <select className="w-full p-2 border border-pink-200 rounded-lg focus:border-pink-400 focus:ring-2 focus:ring-pink-200">
                                <option>All Prices</option>
                                <option>Under $20</option>
                                <option>$20 - $50</option>
                                <option>Over $50</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Category</label>
                            <select className="w-full p-2 border border-pink-200 rounded-lg focus:border-pink-400 focus:ring-2 focus:ring-pink-200">
                                <option>All Categories</option>
                                <option>Ceramic</option>
                                <option>Porcelain</option>
                                <option>Glass</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Sort By</label>
                            <select className="w-full p-2 border border-pink-200 rounded-lg focus:border-pink-400 focus:ring-2 focus:ring-pink-200">
                                <option>Featured</option>
                                <option>Price: Low to High</option>
                                <option>Price: High to Low</option>
                                <option>Newest First</option>
                            </select>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}