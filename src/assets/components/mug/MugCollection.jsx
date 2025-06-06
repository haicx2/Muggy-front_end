import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Gift, Sparkles, Tag, Check } from 'lucide-react';
import { mugs } from './MugList.jsx';
import useCart from '../cart/CartContext.jsx';
import Notification from '../utils/Notification.jsx';

// Define bundle collections with discount
const mugCollections = [
    {
        id: 'collection1',
        name: 'Bộ Sưu Tập Đôi Hoàn Hảo',
        description: 'Bộ cốc đôi hoàn hảo cho cặp đôi hoặc người yêu thích sự đa dạng.',
        mugs: [mugs[0], mugs[1]],
        regularPrice: mugs[0].price + mugs[1].price,
        discountedPrice: Math.round((mugs[0].price + mugs[1].price) * 0.85),
        discountPercentage: 15,
        image: mugs[0].images[0]
    },
    {
        id: 'collection2',
        name: 'Bộ Sưu Tập Ba Cốc Đặc Biệt',
        description: 'Bộ ba cốc hoàn hảo cho gia đình hoặc để làm quà tặng đặc biệt.',
        mugs: [mugs[0], mugs[1], mugs[2]],
        regularPrice: mugs[0].price + mugs[1].price + mugs[2].price,
        discountedPrice: Math.round((mugs[0].price + mugs[1].price + mugs[2].price) * 0.75),
        discountPercentage: 25,
        image: mugs[0].images[0]
    },
    {
        id: 'collection3',
        name: 'Bộ Sưu Tập Hai Cốc Đặc Biệt',
        description: 'Bộ đôi cốc hoàn hảo cho gia đình hoặc để làm quà tặng đặc biệt.',
        mugs: [mugs[0], mugs[2]],
        regularPrice: mugs[0].price + mugs[2].price,
        discountedPrice: Math.round((mugs[0].price + mugs[2].price) * 0.85),
        discountPercentage: 15,
        image: mugs[0].images[0]
    }
];

const MugCollection = () => {
    const { addToCart } = useCart();
    const [notification, setNotification] = useState({
        visible: false,
        message: '',
        type: 'success'
    });
    const [addedCollections, setAddedCollections] = useState({});

    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN').format(price) + ' VNĐ';
    };

    const showNotification = (message, type) => {
        setNotification({
            visible: true,
            message,
            type
        });
    };

    const handleAddToCart = (collection) => {
        try {
            // Create a collection bundle item with a special ID
            const collectionItem = {
                id: collection.id,
                name: collection.name,
                price: collection.discountedPrice,
                originalPrice: collection.regularPrice,
                quantity: 1,
                image: collection.image,
                isCollection: true,
                mugs: collection.mugs.map(mug => mug.id)
            };

            // Add to cart
            addToCart(collectionItem);

            // Visual feedback
            setAddedCollections(prev => ({
                ...prev,
                [collection.id]: true
            }));

            // Reset after delay
            setTimeout(() => {
                setAddedCollections(prev => ({
                    ...prev,
                    [collection.id]: false
                }));
            }, 2000);

            showNotification(`Đã thêm "${collection.name}" vào giỏ hàng`, "success");
        } catch (error) {
            console.error("Error adding collection to cart:", error);
            showNotification("Không thể thêm bộ sưu tập vào giỏ hàng", "error");
        }
    };

    return (
        <section className="py-16 bg-gradient-to-r from-pink-50 to-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-2">
                        <span className="text-pink-500">Bộ Sưu Tập</span> Tiết Kiệm
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Mua theo bộ sưu tập để được giá tốt hơn. Hoàn hảo cho quà tặng hoặc để làm mới bộ cốc của bạn!
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {mugCollections.map((collection) => (
                        <div
                            key={collection.id}
                            className="bg-white rounded-2xl shadow-lg overflow-hidden border border-pink-100 hover:shadow-xl transition-all"
                        >
                            <div className="relative">
                                <div className="absolute top-0 right-0 bg-pink-500 text-white px-4 py-2 rounded-bl-xl z-10">
                                    <div className="flex items-center">
                                        <Tag className="w-4 h-4 mr-1" />
                                        <span>Giảm {collection.discountPercentage}%</span>
                                    </div>
                                </div>

                                <div className="p-6 bg-gradient-to-r from-pink-100 to-pink-50">
                                    <div className="flex gap-4 justify-center">
                                        {collection.mugs.map((mug, index) => (
                                            <div key={index} className="relative">
                                                <img
                                                    src={mug.images[0]}
                                                    alt={mug.name}
                                                    className="w-24 h-24 object-cover rounded-full border-2 border-white shadow-md"
                                                />
                                                {index === 0 && (
                                                    <div className="absolute -top-2 -left-2 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                                        1
                                                    </div>
                                                )}
                                                {index === 1 && (
                                                    <div className="absolute -top-2 -left-2 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                                        2
                                                    </div>
                                                )}
                                                {index === 2 && (
                                                    <div className="absolute -top-2 -left-2 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                                        3
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center">
                                    {collection.name}
                                    <Sparkles className="w-5 h-5 text-yellow-400 ml-2" />
                                </h3>

                                <p className="text-gray-600 mb-4">
                                    {collection.description}
                                </p>

                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                                    <div>
                                        <div className="text-pink-600 font-bold text-2xl">
                                            {formatPrice(collection.discountedPrice)}
                                        </div>
                                        <div className="text-gray-500 text-sm line-through">
                                            {formatPrice(collection.regularPrice)}
                                        </div>
                                    </div>

                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => handleAddToCart(collection)}
                                            className={`${
                                                addedCollections[collection.id]
                                                    ? 'bg-green-500 hover:bg-green-600'
                                                    : 'bg-pink-500 hover:bg-pink-600'
                                            } text-white px-4 py-2 rounded-full transition-all flex items-center`}
                                            disabled={addedCollections[collection.id]}
                                        >
                                            {addedCollections[collection.id] ? (
                                                <>
                                                    <Check className="w-4 h-4 mr-2" />
                                                    Đã thêm
                                                </>
                                            ) : (
                                                <>
                                                    <ShoppingCart className="w-4 h-4 mr-2" />
                                                    Thêm vào giỏ
                                                </>
                                            )}
                                        </button>
                                        <Link
                                            to="/mugs"
                                            className="border border-pink-500 text-pink-500 px-4 py-2 rounded-full hover:bg-pink-50 transition-all"
                                        >
                                            Xem chi tiết
                                        </Link>
                                    </div>
                                </div>

                                <div className="bg-pink-50 p-3 rounded-lg">
                                    <div className="flex items-center text-sm text-pink-700">
                                        <Gift className="w-4 h-4 mr-2" />
                                        <span>Bao gồm túi quà tặng miễn phí và thẻ ghi chú</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Notification
                message={notification.message}
                type={notification.type}
                isVisible={notification.visible}
                onClose={() => setNotification(prev => ({ ...prev, visible: false }))}
                duration={3000}
            />
        </section>
    );
};

export default MugCollection;