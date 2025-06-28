import React, { useState, useEffect } from 'react';
import { Minus, Plus, ShoppingCart, Heart, Share2, Truck, Shield, RefreshCw, Star, Users, PenTool } from 'lucide-react';
import useCart from "../cart/CartContext.jsx";
import { useParams, useNavigate } from 'react-router-dom';
import { mugs } from './MugList.jsx';

export default function MugDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [mug, setMug] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCart();
    const [selectedImage, setSelectedImage] = useState(0);
    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const [currentPrice, setCurrentPrice] = useState(0);

    useEffect(() => {
        const selectedMug = mugs.find(m => m.id === parseInt(id));

        if (!selectedMug) {
            console.error("Không tìm thấy cốc với ID:", id);
            navigate('/');
            return;
        }

        setMug(selectedMug);
        setQuantity(1);

        if (selectedMug.variants) {
            const defaultColor = selectedMug.variants.colors[0];
            const defaultSize = selectedMug.variants.sizes[0];
            setSelectedColor(defaultColor.name);
            setSelectedSize(defaultSize.name);
            setCurrentPrice(defaultSize.price);
        } else {
            setCurrentPrice(selectedMug.price);
            setSelectedColor(null);
            setSelectedSize(null);
        }
        setSelectedImage(0);
    }, [id, navigate]);

    // Effect to update price when size changes
    useEffect(() => {
        if (mug && mug.variants && selectedSize) {
            const sizeInfo = mug.variants.sizes.find(s => s.name === selectedSize);
            if (sizeInfo) {
                setCurrentPrice(sizeInfo.price);
            }
        }
    }, [selectedSize, mug]);

    // Effect to update images when color changes
    useEffect(() => {
        if (mug && mug.variants && selectedColor) {
            setSelectedImage(0); // Reset to the first image of the new color
        }
    }, [selectedColor, mug]);


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
            const itemToAdd = {
                id: mug.id,
                name: mug.name,
                price: currentPrice,
                image: mug.images[0],
                quantity
            };

            if (mug.variants) {
                // Create a unique ID for the cart item based on variants
                itemToAdd.id = `${mug.id}-${selectedColor}-${selectedSize}`;
                itemToAdd.name = `${mug.name} - ${selectedColor} / ${selectedSize}`;
                const colorVariant = mug.variants.colors.find(c => c.name === selectedColor);
                if (colorVariant) {
                    itemToAdd.image = colorVariant.image;
                }
            }

            addToCart(itemToAdd);
        }
    };

    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                stars.push(<Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />);
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
                stars.push(<Star key={i} className="w-4 h-4 text-gray-300 fill-current" />);
            }
        }
        return stars;
    };

    const currentImages = (mug.variants && selectedColor)
        ? mug.variants.colors.find(c => c.name === selectedColor)?.allImages || mug.images
        : mug.images;

    return (
        <div className="container mx-auto px-4 py-8 pt-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Image Gallery */}
                <div className="space-y-4">
                    <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
                        <img
                            src={currentImages[selectedImage]}
                            alt={mug.name}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="grid grid-cols-5 gap-4">
                        {currentImages.map((image, index) => (
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
                        <h1 className="text-3xl font-bold text-gray-900 mb-1">{mug.name}</h1>
                        {mug.designer && (
                            <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                                <PenTool className="w-4 h-4 text-blue-500" />
                                <span>Thiết kế bởi <span className="font-semibold text-gray-700">{mug.designer}</span></span>
                            </div>
                        )}

                        {/* Rating Section */}
                        <div className="flex items-center gap-4 mb-4">
                            <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1">{renderStars(mug.rating)}</div>
                                <span className="text-lg font-semibold text-gray-700">{mug.rating}</span>
                            </div>
                            <div className="flex items-center gap-1 text-gray-500">
                                <Users className="w-4 h-4" />
                                <span className="text-sm">{mug.sellNumbers.toLocaleString()} khách hàng đã mua</span>
                            </div>
                        </div>

                        <div className="flex items-baseline gap-4">
                            <span className="text-3xl font-bold text-pink-500">{currentPrice.toLocaleString()} VND</span>
                            {mug.originalPrice && (
                                <div className="flex items-center gap-2">
                                    <span className="text-lg text-gray-500 line-through">{mug.originalPrice.toLocaleString()} VND</span>
                                    <span className="bg-pink-100 text-pink-600 px-2 py-1 rounded-full text-sm font-medium">
                                        -{Math.round((1 - mug.price / mug.originalPrice) * 100)}%
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Designer's Note */}
                    {mug.designerNote && (
                        <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-300">
                            <h4 className="font-semibold text-blue-800 mb-1">Ghi chú từ nhà thiết kế</h4>
                            <p className="text-sm text-blue-700 italic">"{mug.designerNote}"</p>
                        </div>
                    )}

                    {/* Variant Selectors */}
                    {mug.variants && (
                        <div className="space-y-4 pt-4 border-t">
                            {/* Color Selector */}
                            <div>
                                <h3 className="text-sm font-medium text-gray-900 mb-2">Màu sắc: <span className="font-bold">{selectedColor}</span></h3>
                                <div className="flex items-center gap-3">
                                    {mug.variants.colors.map(color => (
                                        <button
                                            key={color.name}
                                            onClick={() => setSelectedColor(color.name)}
                                            className={`w-8 h-8 rounded-full border-2 transition-all ${selectedColor === color.name ? 'border-pink-500 scale-110' : 'border-gray-200'}`}
                                            style={{ backgroundColor: color.value }}
                                            title={color.name}
                                        />
                                    ))}
                                </div>
                            </div>
                            {/* Size Selector */}
                            <div>
                                <h3 className="text-sm font-medium text-gray-900 mb-2">Kích cỡ: <span className="font-bold">{selectedSize}</span></h3>
                                <div className="flex items-center gap-2">
                                    {mug.variants.sizes.map(size => (
                                        <button
                                            key={size.name}
                                            onClick={() => setSelectedSize(size.name)}
                                            className={`px-4 py-2 border rounded-lg text-sm font-medium transition-colors ${
                                                selectedSize === size.name
                                                    ? 'bg-blue-600 text-white border-blue-600'
                                                    : 'bg-white text-gray-700 hover:bg-gray-100'
                                            }`}
                                        >
                                            {size.name}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    <p className="text-gray-600">{mug.description}</p>

                    {/* Quantity Selector */}
                    <div className="flex items-center gap-6 pt-4 border-t">
                        <div className="flex items-center border rounded-lg">
                            <button onClick={() => handleQuantityChange(-1)} disabled={!mug.available} className={`p-3 ${mug.available ? 'hover:bg-gray-100' : 'opacity-50 cursor-not-allowed'}`}>
                                <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-12 text-center font-medium">{quantity}</span>
                            <button onClick={() => handleQuantityChange(1)} disabled={!mug.available || quantity >= mug.stock} className={`p-3 ${mug.available && quantity < mug.stock ? 'hover:bg-gray-100' : 'opacity-50 cursor-not-allowed'}`}>
                                <Plus className="w-4 h-4" />
                            </button>
                        </div>
                        <button onClick={handleAddToCart} disabled={!mug.available} className={`flex-1 py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors ${mug.available ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}>
                            <ShoppingCart className="w-5 h-5" />
                            {mug.available ? 'Thêm vào giỏ hàng' : 'Hết hàng'}
                        </button>
                    </div>

                    {/* Trust Badges & Features */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t text-center">
                        <div className="flex flex-col items-center gap-2">
                            <Truck className="w-6 h-6 text-blue-600" />
                            <span className="text-sm text-gray-600">Miễn phí vận chuyển</span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <Shield className="w-6 h-6 text-blue-600" />
                            <span className="text-sm text-gray-600">Bảo hành 2 năm</span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <RefreshCw className="w-6 h-6 text-blue-600" />
                            <span className="text-sm text-gray-600">Đổi trả trong 30 ngày</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}