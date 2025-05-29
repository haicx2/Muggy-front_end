import React, { useState } from 'react';
import MugSearch from "./MugSearch.jsx";
import MugList from "./MugList.jsx";

export default function Mug() {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (term) => {
        setSearchTerm(term);
    };

    return (
        <div className="min-h-screen pt-24 pb-12">
            <div className="container mx-auto px-4">
                <div className="mb-8 bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-sm">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Our Collection</h1>
                    <p className="text-gray-600">Discover our handpicked selection of beautiful mugs</p>
                </div>
                <MugSearch onSearch={handleSearch} />
                <MugList searchTerm={searchTerm} />
            </div>
        </div>
    );
}