import React, { useMemo } from 'react';
import MugCard from "./MugCard.jsx";
import { Search } from 'lucide-react';
import mug1 from "../../images/mug1.png";
import mug2 from "../../images/mug2.png";
import mug3 from "../../images/mug3.png";
import ghostMug from "../../images/ghost1.jpg";
import ghostMug2 from "../../images/ghost2.jpg";
import ghostMug3 from "../../images/ghost3.jpg";
import capybaraMug from "../../images/capy1.jpg";
import capybaraMug2 from "../../images/capy2.jpg";
import capybaraMug3 from "../../images/capy3.jpg";
import flowerMug from "../../images/flower1.jpg";
import flowerMug2 from "../../images/flower2.jpg";
import duckMug from "../../images/duck1.jpg";
import duckMug2 from "../../images/duck2.jpg";
import duckMug3 from "../../images/duck3.jpg";
import duckMug4 from "../../images/duck4.jpg";
import duckMug5 from "../../images/duck5.jpg";
import cup1 from "../../images/cup1.jpg";
import cup2 from "../../images/cup2.jpg";
import cup3 from "../../images/cup3.jpg";

export const mugs = [
    {
        id: 1, // Corrected ID
        name: 'Cốc gốm Hello Kitty/Melody',
        price: 100000,
        originalPrice: 200000,
        sellNumbers: 15,
        rating: 4.9,
        category: 'cốc đáng yêu',
        available: true,
        stock: 25,
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
        price: 120000,
        sellNumbers: 20,
        rating: 4.8,
        category: 'cốc dị',
        available: false,
        stock: 0,
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
        price: 150000,
        originalPrice: 250000,
        sellNumbers: 12,
        rating: 5.0,
        category: 'cốc theo ngày lễ',
        available: true,
        stock: 8,
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
    {
        id: 4,
        name: 'Cốc Hình Ma',
        price: 160000,
        originalPrice: 220000,
        sellNumbers: 8,
        rating: 4.8,
        category: 'cốc đáng yêu',
        available: true,
        stock: 10,
        description: 'Cốc sứ hình ma dễ thương với thiết kế Halloween độc đáo, phù hợp làm quà tặng mùa lễ hội.',
        features: [
            'Sứ dày dặn, giữ nhiệt tốt',
            'Trang trí hình ma đáng yêu',
            'Dung tích 350ml',
            'Tặng kèm túi vải đựng cốc'
        ],
        images: [ghostMug, ghostMug2, ghostMug3, ghostMug, ghostMug2]
    },
    {
        id: 5,
        name: 'Cốc Capybara',
        price: 130000,
        originalPrice: 180000,
        sellNumbers: 15,
        rating: 4.9,
        category: 'cốc đáng yêu',
        available: true,
        stock: 6,
        description: 'Cốc sứ in hình Capybara thư giãn, mang lại cảm giác dễ chịu và gần gũi mỗi khi thưởng thức đồ uống.',
        features: [
            'Chất liệu sứ trắng cao cấp',
            'Hình ảnh Capybara ngộ nghĩnh',
            'Dung tích 300ml',
            'Có thể dùng trong lò vi sóng'
        ],
        images: [capybaraMug, capybaraMug2, capybaraMug3, capybaraMug, capybaraMug2]
    },
    {
        id: 6,
        name: 'Cốc Hoa Cúc',
        price: 100000,
        originalPrice: 150000,
        sellNumbers: 20,
        rating: 4.7,
        category: 'cốc đáng yêu',
        available: true,
        stock: 12,
        description: 'Thiết kế hoa cúc nhẹ nhàng, phù hợp với những bạn yêu thích sự nữ tính và đơn giản.',
        features: [
            'Sứ nhẹ, dễ cầm nắm',
            'Họa tiết hoa cúc tinh tế',
            'Dung tích 280ml',
            'Bề mặt tráng men bóng mịn'
        ],
        images: [flowerMug, flowerMug2, flowerMug, flowerMug2, flowerMug]
    },
    {
        id: 7,
        name: 'Cốc Con Vịt',
        price: 150000,
        originalPrice: 200000,
        sellNumbers: 10,
        rating: 5.0,
        category: 'cốc đáng yêu',
        available: true,
        stock: 9,
        description: 'Cốc sứ hình con vịt vàng đáng yêu, đem lại niềm vui nhỏ mỗi ngày khi bạn thưởng thức đồ uống yêu thích.',
        features: [
            'Thiết kế hình vịt vàng đáng yêu',
            'Chất liệu sứ dày bền',
            'Dung tích 320ml',
            'Dễ dàng vệ sinh, không bám mùi'
        ],
        images: [duckMug, duckMug2, duckMug3, duckMug4, duckMug5]
    },
    {
        id: 8, // Corrected ID
        name: 'Cốc "Cup" thiết kế bởi Muggie',
        price: 200000, // Base price for size S
        originalPrice: null,
        sellNumbers: 25,
        rating: 5.0,
        category: 'cốc thiết kế',
        available: true,
        stock: 50,
        description: 'Một chiếc cốc độc đáo được thiết kế bởi Muggie, có sẵn hai màu sắc và hai kích cỡ. Hoàn hảo để thể hiện cá tính của bạn.',
        features: [
            'Thiết kế độc quyền bởi Muggie',
            'Chất liệu gốm cao cấp',
            'An toàn với máy rửa chén và lò vi sóng',
            'Nhiều tùy chọn màu sắc và kích cỡ'
        ],
        images: [cup1, cup2, cup3, cup1, cup2],
        designer: 'Muggie',
        designerNote: 'Lấy cảm hứng từ sự đơn giản và niềm vui, "Cup" là sự kết hợp giữa hình dáng cổ điển và màu sắc hiện đại. Mỗi đường cong đều được chăm chút để mang lại cảm giác thoải mái nhất khi cầm trên tay. - Muggie',
        variants: {
            colors: [
                { name: 'Hồng', value: '#FBCFE8', image: cup1, allImages: [cup1, cup1, cup3, cup1, cup3] },
                { name: 'Xanh', value: '#BFDBFE', image: cup2, allImages: [cup2, cup2, cup3, cup2, cup3] }
            ],
            sizes: [
                { name: 'S', price: 200000 },
                { name: 'L', price: 300000 }
            ]
        }
    }
];

export default function MugList({ searchTerm = '', filters = {} }) {
    const filteredAndSortedMugs = useMemo(() => {
        let result = [...mugs];

        if (searchTerm) {
            result = result.filter(mug =>
                mug.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                mug.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Apply price range filter
        if (filters.priceRange && filters.priceRange !== 'all') {
            result = result.filter(mug => {
                if (filters.priceRange === 'dưới 200k') return mug.price < 200000;
                if (filters.priceRange === '200-300k') return mug.price >= 200000 && mug.price <= 300000;
                if (filters.priceRange === 'trên 300k') return mug.price > 300000;
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
                            rating={mug.rating}
                            sellNumbers={mug.sellNumbers}
                            available={mug.available}
                            stock={mug.stock}
                            designer={mug.designer} // Pass designer prop
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