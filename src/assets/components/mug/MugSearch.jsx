import React from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';

export default function MugSearch() {
    return (
        <div className="bg-white p-4 rounded-lg shadow-sm mb-8">
            <div className="flex gap-4 items-center">
                <div className="flex-1 relative">
                    <input
                        type="text"
                        placeholder="Search for mugs..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                </div>
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <SlidersHorizontal className="w-5 h-5" />
                    <span>Filters</span>
                </button>
            </div>
        </div>
    );
}