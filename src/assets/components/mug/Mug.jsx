import React, { useState } from 'react';
import MugSearch from "./MugSearch.jsx";
import MugList from "./MugList.jsx";

export default function Mug() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
        priceRange: 'all',
        category: 'all',
        sortBy: 'featured'
    });

    const handleSearch = (term) => {
        setSearchTerm(term);
    };

    const handleFilter = (newFilters) => {
        setFilters(newFilters);
    };

    return (
        <div className="min-h-screen pt-24 pb-12">
            <div className="container mx-auto px-4">
                <div className="mb-8 bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-sm">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Bộ sưu tập của chúng tôi</h1>
                    <p className="text-gray-600">Khám phá bộ sưu tập cốc đẹp được chọn lọc của chúng tôi</p>
                </div>
                <MugSearch onSearch={handleSearch} onFilter={handleFilter} />
                <MugList searchTerm={searchTerm} filters={filters} />
            </div>
        </div>
    );
}