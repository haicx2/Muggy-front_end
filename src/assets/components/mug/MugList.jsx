import React, { useMemo } from 'react';
import MugCard from "./MugCard.jsx";
import { Search } from 'lucide-react';
import mug1 from "../../images/mug1.png";
import mug2 from "../../images/mug2.png";
import mug3 from "../../images/mug3.png";

export const mugs = [
    {
        id: 1,
        name: 'Hello Kitty/Melody Ceramic Mug',
        price: 24.99,
        originalPrice: 29.99,
        sellNumbers: 1500,
        category: 'ceramic',
        description: 'Elegant and durable ceramic mug with a classic design. Perfect for your morning coffee or tea.',
        features: [
            'Dishwasher safe',
            'Microwave safe',
            'Holds 12oz of liquid',
            'Made from high-quality ceramic'
        ],
        images: [
            mug1,
            mug1,
            mug1,
            mug1,
            mug1
        ]
    },
    {
        id: 2,
        name: 'Alien x Croc Mug',
        price: 29.99,
        sellNumbers: 2000,
        category: 'porcelain',
        description: 'Inspired by ocean waves, this beautiful mug brings serenity to your daily routine.',
        features: [
            'Handcrafted design',
            'Dishwasher and microwave safe',
            'Holds 14oz of liquid',
            'Limited edition collection'
        ],
        images: [
            mug2,
            mug2,
            mug2,
            mug2,
            mug2
        ]
    },
    {
        id: 3,
        name: 'Halloween Mug',
        price: 27.99,
        originalPrice: 34.99,
        sellNumbers: 1200,
        category: 'glass',
        description: 'Delicate cherry blossom design brings a touch of springtime to your beverage experience.',
        features: [
            'Premium porcelain',
            'Dishwasher safe',
            'Holds 10oz of liquid',
            'Gift box included'
        ],
        images: [
            mug3,
            mug3,
            mug3,
            mug3,
            mug3
        ]
    },
];

export default function MugList({ searchTerm = '', filters = {} }) {
    // Use useMemo to only recalculate when inputs change
    const filteredAndSortedMugs = useMemo(() => {
        // Start with all mugs
        let result = [...mugs];

        // Apply search term filter
        if (searchTerm) {
            result = result.filter(mug =>
                mug.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                mug.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Apply price range filter
        if (filters.priceRange && filters.priceRange !== 'all') {
            result = result.filter(mug => {
                if (filters.priceRange === 'under20') return mug.price < 20;
                if (filters.priceRange === '20-50') return mug.price >= 20 && mug.price <= 50;
                if (filters.priceRange === 'over50') return mug.price > 50;
                return true;
            });
        }

        // Apply category filter
        if (filters.category && filters.category !== 'all') {
            result = result.filter(mug => mug.category === filters.category);
        }

        // Apply sorting
        if (filters.sortBy && filters.sortBy !== 'featured') {
            result.sort((a, b) => {
                if (filters.sortBy === 'price_asc') return a.price - b.price;
                if (filters.sortBy === 'price_desc') return b.price - a.price;
                if (filters.sortBy === 'bestseller') return b.sellNumbers - a.sellNumbers;
                return 0;
            });
        }

        return result;
    }, [searchTerm, filters]);

    return (
        <>
            {filteredAndSortedMugs.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredAndSortedMugs.map((mug) => (
                        <MugCard
                            key={mug.id}
                            id={mug.id}
                            name={mug.name}
                            price={mug.price}
                            originalPrice={mug.originalPrice}
                            image={mug.images[0]}
                            sellNumbers={mug.sellNumbers}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-12 bg-white/80 backdrop-blur-sm rounded-lg">
                    <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-pink-100">
                        <Search className="w-8 h-8 text-pink-400" />
                    </div>
                    <h3 className="text-xl font-medium text-gray-900 mb-1">No mugs found</h3>
                    <p className="text-gray-500">Try adjusting your search or filters</p>
                </div>
            )}
        </>
    );
}