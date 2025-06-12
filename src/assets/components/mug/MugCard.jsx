import { ShoppingCart, Star } from 'lucide-react';
import useCart from "../cart/CartContext.jsx";
import { Link } from 'react-router-dom';

export default function MugCard({ id, image, name, price, originalPrice, rating, sellNumbers, available, stock }) {
    const { addToCart } = useCart();

    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                stars.push(
                    <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                );
            } else if (i === fullStars && hasHalfStar) {
                stars.push(
                    <div key={i} className="relative">
                        <Star className="w-3 h-3 text-gray-300 fill-current" />
                        <div className="absolute inset-0 overflow-hidden" style={{ width: '50%' }}>
                            <Star className="w-3 h-3 text-yellow-400 fill-current" />
                        </div>
                    </div>
                );
            } else {
                stars.push(
                    <Star key={i} className="w-3 h-3 text-gray-300 fill-current" />
                );
            }
        }
        return stars;
    };

    return (
        <div className={`group relative bg-white rounded-lg shadow-sm hover:shadow-xl transition-shadow duration-300 ${
            !available ? 'opacity-75' : ''
        }`}>
            {/* Availability Badge */}
            <div className="absolute top-2 left-2 z-10">
                {!available ? (
                    <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                        Hết hàng
                    </span>
                ) : stock <= 10 && stock > 0 ? (
                    <span className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                        Còn {stock} sản phẩm
                    </span>
                ) : null}
            </div>

            <Link to={`/mug/${id}`}>
                <div className="aspect-square overflow-hidden rounded-t-lg">
                    <img
                        src={image}
                        alt={name}
                        className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ${
                            !available ? 'grayscale' : ''
                        }`}
                    />
                </div>
            </Link>
            <div className="p-4">
                <Link to={`/mug/${id}`}>
                    <h3 className="text-gray-800 font-medium text-lg mb-2 group-hover:text-blue-600 transition-colors">
                        {name}
                    </h3>
                </Link>

                {/* Rating and Sell Numbers */}
                <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1">
                        {renderStars(rating)}
                    </div>
                    <span className="text-sm text-gray-500">
                        {rating} ({sellNumbers.toLocaleString()} đã bán)
                    </span>
                </div>

                <div className="flex items-center justify-between">
                    <div>
                        <span className="text-pink-500 font-bold text-lg">{price.toLocaleString()} VND</span>
                        {originalPrice && (
                            <span className="ml-2 text-gray-400 line-through text-sm">
                                {originalPrice.toLocaleString()} VND
                            </span>
                        )}
                    </div>
                    <button
                        onClick={() => available && addToCart({ id, name, price, image })}
                        disabled={!available}
                        className={`p-2 rounded-full transition-colors ${
                            available
                                ? 'bg-blue-600 text-white hover:bg-pink-500'
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                    >
                        <ShoppingCart className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}