import React, { useState, useEffect } from 'react';
import { Minus, Plus, ShoppingCart, Heart, Share2, Truck, Shield, RefreshCw } from 'lucide-react';
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
            console.error("Mug not found with ID:", id);
            navigate('/'); // Redirect to home if mug not found
            return;
        }

        setMug(selectedMug);
        console.log("Selected mug:", selectedMug); // Add this for debugging
    }, [id, navigate]);

    if (!mug) {
        return <div className="container mx-auto px-4 py-8">Loading...</div>;
    }

    const handleQuantityChange = (delta) => {
        const newQuantity = quantity + delta;
        if (newQuantity >= 1) {
            setQuantity(newQuantity);
        }
    };

    const handleAddToCart = () => {
        addToCart({
            id: mug.id,
            name: mug.name,
            price: mug.price,
            image: mug.images[0],
            quantity // Add this to pass the quantity
        });
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
                                <img src={image} alt={`${mug.name} view ${index + 1}`} className="w-full h-full object-cover" />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Product Info */}
                <div className="space-y-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">{mug.name}</h1>
                        <div className="flex items-center gap-4">
                            <span className="text-2xl font-bold text-pink-500">${mug.price.toFixed(2)}</span>
                            {mug.originalPrice && (
                                <span className="text-lg text-gray-500 line-through">${mug.originalPrice.toFixed(2)}</span>
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
                                className="p-3 hover:bg-gray-100"
                            >
                                <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-12 text-center">{quantity}</span>
                            <button
                                onClick={() => handleQuantityChange(1)}
                                className="p-3 hover:bg-gray-100"
                            >
                                <Plus className="w-4 h-4" />
                            </button>
                        </div>
                        <button
                            onClick={handleAddToCart}
                            className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
                        >
                            <ShoppingCart className="w-5 h-5" />
                            Add to Cart
                        </button>
                        <button className="p-3 border rounded-lg hover:bg-gray-100">
                            <Heart className="w-5 h-5" />
                        </button>
                        <button className="p-3 border rounded-lg hover:bg-gray-100">
                            <Share2 className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Product Features */}
                    <div className="grid grid-cols-3 gap-4 pt-6 border-t">
                        <div className="flex flex-col items-center text-center gap-2">
                            <Truck className="w-6 h-6 text-blue-600" />
                            <span className="text-sm text-gray-600">Free Shipping</span>
                        </div>
                        <div className="flex flex-col items-center text-center gap-2">
                            <Shield className="w-6 h-6 text-blue-600" />
                            <span className="text-sm text-gray-600">2 Year Warranty</span>
                        </div>
                        <div className="flex flex-col items-center text-center gap-2">
                            <RefreshCw className="w-6 h-6 text-blue-600" />
                            <span className="text-sm text-gray-600">30-Day Returns</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}