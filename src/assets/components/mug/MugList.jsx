import React, { useMemo } from 'react';
import MugCard from "./MugCard.jsx";
import { Search } from 'lucide-react';
import mug1 from "../../images/mug1.png";
import mug2 from "../../images/mug2.png";
import mug3 from "../../images/mug3.png";

export const mugs = [
    {
        id: 1,
        name: 'Cốc gốm Hello Kitty/Melody',
        price: 579000,
        originalPrice: 699000,
        sellNumbers: 1500,
        category: 'ceramic',
        description: 'Cốc gốm sang trọng và bền đẹp với thiết kế cổ điển. Hoàn hảo cho cà phê hoặc trà buổi sáng của bạn.',
        features: [
            'An toàn với máy rửa chén',
            'An toàn với lò vi sóng',
            'Dung tích 350ml',
            'Làm từ gốm cao cấp'
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
        name: 'Cốc Alien x Croc',
        price: 699000,
        sellNumbers: 2000,
        category: 'porcelain',
        description: 'Lấy cảm hứng từ sóng biển, chiếc cốc xinh đẹp này mang lại sự thanh thản cho thói quen hàng ngày của bạn.',
        features: [
            'Thiết kế thủ công',
            'An toàn với máy rửa chén và lò vi sóng',
            'Dung tích 400ml',
            'Bộ sưu tập giới hạn'
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
        name: 'Cốc Halloween',
        price: 649000,
        originalPrice: 799000,
        sellNumbers: 1200,
        category: 'glass',
        description: 'Thiết kế hoa anh đào tinh tế mang lại cảm giác mùa xuân cho trải nghiệm đồ uống của bạn.',
        features: [
            'Sứ cao cấp',
            'An toàn với máy rửa chén',
            'Dung tích 300ml',
            'Kèm hộp quà tặng'
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
                if (filters.priceRange === 'under500k') return mug.price < 500000;
                if (filters.priceRange === '500k-1m') return mug.price >= 500000 && mug.price <= 1000000;
                if (filters.priceRange === 'over1m') return mug.price > 1000000;
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
                    <h3 className="text-xl font-medium text-gray-900 mb-1">Không tìm thấy sản phẩm</h3>
                    <p className="text-gray-500">Hãy thử điều chỉnh tìm kiếm hoặc bộ lọc</p>
                </div>
            )}
        </>
    );
}