import React from 'react';
import MugCard from './MugCard';
import { mugs } from './MugList';
import { Crown, Stars, Sparkles } from 'lucide-react';

export default function BestSellers() {
    const bestSellerMugs = mugs
        .slice()
        .sort((a, b) => (b.sellNumbers || 0) - (a.sellNumbers || 0))
        .slice(0, 3);

    const badges = [
        { icon: Crown, color: 'gold', label: '👑 #1 Best Seller' },
        { icon: Stars, color: 'silver', label: '⭐ #2 Popular Choice' },
        { icon: Sparkles, color: 'bronze', label: '✨ #3 Customer Favorite' },
    ];

    return (
        <section className="py-20 bg-gradient-to-b from-white to-pink-50 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-10 left-10 animate-float">
                    <div className="w-8 h-8 rounded-full bg-pink-100 opacity-50"></div>
                </div>
                <div className="absolute bottom-20 right-20 animate-float-delayed">
                    <div className="w-12 h-12 rounded-full bg-pink-100 opacity-50"></div>
                </div>
                <div className="absolute top-1/2 left-1/4 animate-pulse">
                    <Stars className="w-6 h-6 text-pink-200" />
                </div>
                <div className="absolute bottom-1/3 right-1/4 animate-pulse-delayed">
                    <Sparkles className="w-6 h-6 text-pink-200" />
                </div>
            </div>

            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-4 relative inline-block">
                        <span className="text-gray-800">Our</span>
                        <span className="text-pink-500 ml-2">Best Sellers</span>
                        <div className="absolute -top-6 -right-8 transform rotate-12">
                            <Crown className="w-8 h-8 text-yellow-400 animate-bounce" />
                        </div>
                    </h2>
                    <p className="text-gray-600 text-lg">Discover our most loved mugs ✨</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {bestSellerMugs.map((mug, index) => (
                        <div key={mug.id} className="relative group">
                            {/* Best seller badge */}
                            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                                <div
                                    className={`px-4 py-2 rounded-full font-medium text-white shadow-lg
                                    ${index === 0 ? 'bg-yellow-400' : index === 1 ? 'bg-gray-400' : 'bg-amber-600'}
                                    transform transition-transform group-hover:scale-110`}
                                >
                                    <div className="flex items-center space-x-2">
                                        {React.createElement(badges[index].icon, {
                                            className: 'w-4 h-4'
                                        })}
                                        <span className="text-sm">{badges[index].label}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Animated background */}
                            <div className="absolute inset-0 bg-gradient-to-r from-pink-50 via-white to-pink-50 rounded-lg transform transition-transform group-hover:scale-105 -z-10"></div>

                            {/* Card wrapper with animation */}
                            <div className="transform transition-transform hover:-translate-y-2 duration-300">
                                <MugCard
                                    id={mug.id}
                                    name={mug.name}
                                    price={mug.price}
                                    originalPrice={mug.originalPrice}
                                    image={mug.images[0]}
                                    sellNumbers={mug.sellNumbers}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}