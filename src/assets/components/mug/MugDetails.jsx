import React, { useState, useEffect } from 'react';
import { Minus, Plus, ShoppingCart, Heart, Share2, Truck, Shield, RefreshCw, Star, Users } from 'lucide-react';
import useCart from "../cart/CartContext.jsx";
import { useParams, useNavigate } from 'react-router-dom';
import { mugs } from './MugList.jsx';

export default function MugDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCart();
    const [mug, setMug] = useState(null);

    useEffect(() => {
        // Find the mug with the matching ID
        const selectedMug = mugs.find(m => m.id === parseInt(id));

        if (!selectedMug) {
            console.error("Không tìm thấy cốc với ID:", id);
            navigate('/'); // Redirect to home if mug not found
            return;
        }

        setMug(selectedMug);
        console.log("Cốc đã chọn:", selectedMug); // Add this for debugging
    }, [id, navigate]);

    if (!mug) {
        return <div className="container mx-auto px-4 py-8">Đang tải...</div>;
    }

    const handleQuantityChange = (delta) => {
        const newQuantity = quantity + delta;
        if (newQuantity >= 1 && newQuantity <= mug.stock) {
            setQuantity(newQuantity);
        }
    };

    const handleAddToCart = () => {
        if (mug.available && quantity <= mug.stock) {
            addToCart({
                id: mug.id,
                name: mug.name,
                price: mug.price,
                image: mug.images[0],
                quantity
            });
        }
    };

    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                stars.push(
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                );
            } else if (i === fullStars && hasHalfStar) {
                stars.push(
                    <div key={i} className="relative">
                        <Star className="w-4 h-4 text-gray-300 fill-current" />
                        <div className="absolute inset-0 overflow-hidden" style={{ width: '50%' }}>
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        </div>
                    </div>
                );
            } else {
                stars.push(
                    <Star key={i} className="w-4 h-4 text-gray-300 fill-current" />
                );
            }
        }
        return stars;
    };

    return (
        <div className="container mx-auto px-4 py-8 pt-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Image Gallery */}
                <div className="space-y-4">
                    <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
                        <img
                            src={mug.images[selectedImage]}
                            alt={mug.name}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="grid grid-cols-5 gap-4">
                        {mug.images.map((image, index) => (
                            <button
                                key={index}
                                onClick={() => setSelectedImage(index)}
                                className={`aspect-square rounded-lg overflow-hidden border-2 ${
                                    selectedImage === index ? 'border-pink-500' : 'border-transparent'
                                }`}
                            >
                                <img src={image} alt={`${mug.name} góc nhìn ${index + 1}`} className="w-full h-full object-cover" />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Product Info */}
                <div className="space-y-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">{mug.name}</h1>

                        {/* Rating Section */}
                        <div className="flex items-center gap-4 mb-4">
                            <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1">
                                    {renderStars(mug.rating)}
                                </div>
                                <span className="text-lg font-semibold text-gray-700">
                                    {mug.rating}
                                </span>
                            </div>
                            <div className="flex items-center gap-1 text-gray-500">
                                <Users className="w-4 h-4" />
                                <span className="text-sm">
                                    {mug.sellNumbers.toLocaleString()} khách hàng đã mua
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <span className="text-2xl font-bold text-pink-500">{mug.price.toLocaleString()} VND</span>
                            {mug.originalPrice && (
                                <div className="flex items-center gap-2">
                                    <span className="text-lg text-gray-500 line-through">{mug.originalPrice.toLocaleString()} VND</span>
                                    <span className="bg-pink-100 text-pink-600 px-2 py-1 rounded-full text-sm font-medium">
                                        -{Math.round((1 - mug.price / mug.originalPrice) * 100)}%
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Availability Status */}
                        <div className="flex items-center gap-2">
                            {mug.available ? (
                                <>
                                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                    <span className="text-green-600 font-medium">
                                        {mug.stock > 10 ? 'Còn hàng' : `Chỉ còn ${mug.stock} sản phẩm`}
                                    </span>
                                </>
                            ) : (
                                <>
                                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                    <span className="text-red-600 font-medium">Hết hàng</span>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <p className="text-gray-600">{mug.description}</p>
                        <ul className="space-y-2">
                            {mug.features.map((feature, index) => (
                                <li key={index} className="flex items-center gap-2 text-gray-700">
                                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Quantity Selector */}
                    <div className="flex items-center gap-6">
                        <div className="flex items-center border rounded-lg">
                            <button
                                onClick={() => handleQuantityChange(-1)}
                                disabled={!mug.available}
                                className={`p-3 ${mug.available ? 'hover:bg-gray-100' : 'opacity-50 cursor-not-allowed'}`}
                            >
                                <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-12 text-center">{quantity}</span>
                            <button
                                onClick={() => handleQuantityChange(1)}
                                disabled={!mug.available || quantity >= mug.stock}
                                className={`p-3 ${mug.available && quantity < mug.stock ? 'hover:bg-gray-100' : 'opacity-50 cursor-not-allowed'}`}
                            >
                                <Plus className="w-4 h-4" />
                            </button>
                        </div>
                        <button
                            onClick={handleAddToCart}
                            disabled={!mug.available}
                            className={`flex-1 py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors ${
                                mug.available
                                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            }`}
                        >
                            <ShoppingCart className="w-5 h-5" />
                            {mug.available ? 'Thêm vào giỏ hàng' : 'Hết hàng'}
                        </button>
                        <button className="p-3 border rounded-lg hover:bg-gray-100">
                            <Heart className="w-5 h-5" />
                        </button>
                        <button className="p-3 border rounded-lg hover:bg-gray-100">
                            <Share2 className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Trust Badges */}
                    <div className="bg-blue-50 p-4 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                            <Shield className="w-5 h-5 text-blue-600" />
                            <span className="font-medium text-blue-800">Cam kết chất lượng</span>
                        </div>
                        <p className="text-sm text-blue-700">
                            Sản phẩm được {mug.sellNumbers.toLocaleString()} khách hàng tin tưởng với đánh giá {mug.rating}/5 sao
                        </p>
                    </div>

                    {/* Product Features */}
                    <div className="grid grid-cols-3 gap-4 pt-6 border-t">
                        <div className="flex flex-col items-center text-center gap-2">
                            <Truck className="w-6 h-6 text-blue-600" />
                            <span className="text-sm text-gray-600">Miễn phí vận chuyển</span>
                        </div>
                        <div className="flex flex-col items-center text-center gap-2">
                            <Shield className="w-6 h-6 text-blue-600" />
                            <span className="text-sm text-gray-600">Bảo hành 2 năm</span>
                        </div>
                        <div className="flex flex-col items-center text-center gap-2">
                            <RefreshCw className="w-6 h-6 text-blue-600" />
                            <span className="text-sm text-gray-600">Đổi trả trong 30 ngày</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}