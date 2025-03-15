// CartPage.jsx
import useCart from "./CartContext.jsx";
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import Notification from "../utils/Notification.jsx";

export default function CartPage() {
    const { items, updateQuantity, removeFromCart, total } = useCart();
    const [notification, setNotification] = useState({
        visible: false,
        message: '',
        type: 'success'
    });

    // Add this for debugging
    useEffect(() => {
        console.log("Cart items:", items);
    }, [items]);

    const showNotification = (message, type) => {
        setNotification({
            visible: true,
            message,
            type
        });
    };

    const handleQuantityChange = (id, newQuantity) => {
        try {
            updateQuantity(id, newQuantity);
            if (newQuantity > 0) {
                showNotification("Quantity updated successfully", "success");
            }
        } catch (error) {
            showNotification("Failed to update quantity", "error");
        }
    };

    const handleRemoveItem = (id) => {
        try {
            removeFromCart(id);
            showNotification("Item removed from cart", "success");
        } catch (error) {
            showNotification("Failed to remove item", "error");
        }
    };

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 pt-24 pb-12">
                <div className="container mx-auto px-4">
                    <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your cart is empty</h2>
                        <p className="text-gray-600 mb-4">Add some beautiful mugs to your cart!</p>
                        <a href="/" className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                            Continue Shopping
                        </a>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-12">
            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg shadow-sm divide-y">
                            {items.map((item) => (
                                <div key={item.id} className="p-6 flex items-center gap-4">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-24 h-24 object-cover rounded-lg"
                                    />
                                    <div className="flex-1">
                                        <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                                        <p className="text-pink-500 font-semibold">${item.price.toFixed(2)}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                            className="p-1 hover:bg-gray-100 rounded"
                                        >
                                            <Minus className="w-4 h-4" />
                                        </button>
                                        <span className="w-8 text-center">{item.quantity}</span>
                                        <button
                                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                            className="p-1 hover:bg-gray-100 rounded"
                                        >
                                            <Plus className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <button
                                        onClick={() => handleRemoveItem(item.id)}
                                        className="p-2 text-gray-400 hover:text-red-500"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                            <div className="space-y-4">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Subtotal</span>
                                    <span className="font-semibold">${total.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Shipping</span>
                                    <span className="font-semibold">Free</span>
                                </div>
                                <div className="border-t pt-4">
                                    <div className="flex justify-between">
                                        <span className="text-lg font-semibold">Total</span>
                                        <span className="text-lg font-bold text-blue-600">
                                            ${total.toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => showNotification("Proceeding to checkout...", "success")}
                                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    Proceed to Checkout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Notification
                message={notification.message}
                type={notification.type}
                isVisible={notification.visible}
                onClose={() => setNotification(prev => ({ ...prev, visible: false }))}
                duration={3000}
            />
        </div>
    );
}