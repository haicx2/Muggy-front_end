// SuccessCheckout.jsx
import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, Package, Truck, Calendar, ArrowRight, Copy, ShoppingBag } from 'lucide-react';
import useCart from './CartContext.jsx';
import Notification from '../utils/Notification.jsx';
import { useState } from 'react';

export default function SuccessCheckout() {
    const location = useLocation();
    const navigate = useNavigate();
    const { clearCart } = useCart();
    const [notification, setNotification] = useState({
        visible: false,
        message: '',
        type: 'success'
    });

    // Get order details from location state or use default values
    const {
        orderId = '',
        paymentMethod = '',
        customerInfo = {},
        items = [],
        total = 0,
        subtotal = 0,
        packageCost = 0
    } = location.state || {};

    // Estimated delivery date (7 days from now)
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 7);

    const formattedDeliveryDate = deliveryDate.toLocaleDateString('vi-VN', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric'
    });

    useEffect(() => {
        // If no order data is passed, redirect to home
        if (!orderId) {
            navigate('/');
        }

        // Clear the cart after successful order
        clearCart();
    }, [orderId, navigate, clearCart]);

    const showNotification = (message, type) => {
        setNotification({
            visible: true,
            message,
            type
        });
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        showNotification("Đã sao chép mã đơn hàng", "success");
    };

    const getPaymentMethodText = () => {
        if (paymentMethod === 'bank-transfer') {
            return 'Chuyển khoản ngân hàng';
        } else if (paymentMethod === 'cod') {
            return 'Thanh toán khi nhận hàng (COD)';
        }
        return 'Không xác định';
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-12">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto">
                    {/* Success message section */}
                    <div className="bg-white rounded-lg shadow-sm p-8 mb-6 text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                            <CheckCircle className="w-10 h-10 text-green-500" />
                        </div>
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Đặt hàng thành công!</h1>
                        <p className="text-gray-600 mb-6">
                            Cảm ơn bạn đã đặt hàng. Chúng tôi sẽ xử lý đơn hàng của bạn sớm nhất có thể.
                        </p>
                        <div className="flex items-center justify-center mb-4">
                            <span className="text-gray-700 font-medium mr-2">Mã đơn hàng:</span>
                            <span className="font-bold text-blue-600 mr-2">{orderId}</span>
                            <button
                                onClick={() => copyToClipboard(orderId)}
                                className="text-blue-600 hover:text-blue-800"
                                title="Sao chép mã đơn hàng"
                            >
                                <Copy className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Order summary section */}
                    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                        <h2 className="text-xl font-semibold mb-4">Chi tiết đơn hàng</h2>

                        <div className="space-y-4">
                            <div className="flex flex-col md:flex-row md:justify-between md:items-center py-3 border-b">
                                <div className="flex items-center mb-2 md:mb-0">
                                    <Package className="w-5 h-5 text-gray-500 mr-2" />
                                    <span className="font-medium">Phương thức thanh toán</span>
                                </div>
                                <span className="text-gray-800">{getPaymentMethodText()}</span>
                            </div>

                            <div className="flex flex-col md:flex-row md:justify-between md:items-center py-3 border-b">
                                <div className="flex items-center mb-2 md:mb-0">
                                    <Truck className="w-5 h-5 text-gray-500 mr-2" />
                                    <span className="font-medium">Địa chỉ giao hàng</span>
                                </div>
                                <div className="text-gray-800 text-right">
                                    <div>{customerInfo.fullName}</div>
                                    <div>{customerInfo.phone}</div>
                                    <div>{customerInfo.address}</div>
                                    <div>{customerInfo.city}</div>
                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row md:justify-between md:items-center py-3 border-b">
                                <div className="flex items-center mb-2 md:mb-0">
                                    <Calendar className="w-5 h-5 text-gray-500 mr-2" />
                                    <span className="font-medium">Ngày giao hàng dự kiến</span>
                                </div>
                                <span className="text-gray-800">{formattedDeliveryDate}</span>
                            </div>
                        </div>

                        {/* Products summary */}
                        <div className="mt-6 mb-4">
                            <h3 className="font-medium mb-3">Sản phẩm đã đặt ({items.length})</h3>
                            <div className="space-y-3 max-h-80 overflow-y-auto">
                                {items.map((item) => (
                                    <div key={item.id} className="flex items-center border-b pb-3">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-16 h-16 object-cover rounded mr-3"
                                        />
                                        <div className="flex-1">
                                            <h4 className="text-sm font-medium">{item.name}</h4>
                                            <div className="flex justify-between mt-1">
                                                <span className="text-sm text-gray-500">SL: {item.quantity}</span>
                                                <span className="text-sm font-medium">{item.price.toLocaleString()} VND</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Payment summary */}
                        <div className="border-t pt-4 mt-4">
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Tổng tiền sản phẩm:</span>
                                    <span>{subtotal.toLocaleString()} VND</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Túi đựng:</span>
                                    {packageCost === 0 ? (
                                        <span className="text-green-600">Miễn phí</span>
                                    ) : (
                                        <span>{packageCost.toLocaleString()} VND</span>
                                    )}
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Phí vận chuyển:</span>
                                    <span className="text-green-600">Miễn phí</span>
                                </div>
                            </div>

                            <div className="border-t mt-3 pt-3">
                                <div className="flex justify-between">
                                    <span className="font-semibold">Tổng thanh toán:</span>
                                    <span className="text-lg font-bold text-blue-600">{total.toLocaleString()} VND</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tracking info */}
                    {paymentMethod === 'bank-transfer' && (
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                            <p className="text-yellow-800 text-sm">
                                Vui lòng hoàn tất thanh toán để đơn hàng của bạn được xử lý. Sau khi nhận được thanh toán, chúng tôi sẽ gửi email xác nhận và cập nhật trạng thái đơn hàng.
                            </p>
                        </div>
                    )}

                    {/* Next steps */}
                    <div className="flex flex-col sm:flex-row gap-4 mt-6">
                        <Link
                            to="/"
                            className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
                        >
                            <ShoppingBag className="w-5 h-5 mr-2" />
                            Tiếp tục mua sắm
                        </Link>
                        <Link
                            to="/orders"
                            className="flex-1 bg-white border border-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center"
                        >
                            Theo dõi đơn hàng
                            <ArrowRight className="w-5 h-5 ml-2" />
                        </Link>
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