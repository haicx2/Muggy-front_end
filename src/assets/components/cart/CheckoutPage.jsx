import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {ArrowLeft, Building, Check, CreditCard, HelpCircle} from 'lucide-react';
import useCart from "./CartContext.jsx";
import Notification from "../utils/Notification.jsx";
import emailjs from '@emailjs/browser';

const generateOrderId = () => {
    return 'ORD-' + Math.floor(100000 + Math.random() * 900000);
};

export default function CheckoutPage() {
    const navigate = useNavigate();
    const {items, subtotal, total, packageCost, clearCart} = useCart();
    const [paymentMethod, setPaymentMethod] = useState('bank-transfer');

    const [customerInfo, setCustomerInfo] = useState({
        fullName: '',
        email: '',
        phone: '',
        address: '',
        note: ''
    });

    const [notification, setNotification] = useState({
        visible: false,
        message: '',
        type: 'success'
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (items.length === 0 && !isSubmitting) {
            navigate('/cart');
        }
    }, [items, navigate, isSubmitting]);

    const showNotification = (message, type) => {
        setNotification({visible: true, message, type});
    };

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setCustomerInfo(prev => ({...prev, [name]: value}));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isSubmitting) return;

        if (!customerInfo.fullName || !customerInfo.phone || !customerInfo.address) {
            showNotification("Vui lòng điền đầy đủ thông tin bắt buộc (*)", "error");
            return;
        }

        setIsSubmitting(true);

        const orderId = generateOrderId();
        const orderData = {
            orderId,
            paymentMethod,
            customerInfo,
            items,
            total,
            subtotal,
            packageCost,
            date: new Date().toISOString(),
            status: paymentMethod === 'bank-transfer' ? 'Pending Payment' : 'Processing'
        };

        // Prepare email parameters
        const generateItemsHtml = (orderItems) => {
            let html = '<table style="width: 100%; border-collapse: collapse;">';
            html += '<tr><th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Sản phẩm</th><th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Số lượng</th><th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Giá</th></tr>';
            orderItems.forEach(item => {
                html += `<tr><td style="border: 1px solid #ddd; padding: 8px;">${item.name}</td><td style="border: 1px solid #ddd; padding: 8px;">${item.quantity}</td><td style="border: 1px solid #ddd; padding: 8px;">${item.price.toLocaleString()} VND</td></tr>`;
            });
            html += '</table>';
            return html;
        };

        const templateParams = {
            order_id: orderData.orderId,
            order_date: new Date(orderData.date).toLocaleString('vi-VN'),
            customer_name: orderData.customerInfo.fullName,
            customer_phone: orderData.customerInfo.phone,
            customer_address: orderData.customerInfo.address,
            customer_email: orderData.customerInfo.email || 'N/A',
            customer_note: orderData.customerInfo.note || 'Không có',
            items_html: generateItemsHtml(orderData.items),
            subtotal: orderData.subtotal.toLocaleString(),
            package_cost: orderData.packageCost.toLocaleString(),
            total_amount: orderData.total.toLocaleString(),
            payment_method: orderData.paymentMethod
        };
        emailjs.send(
            import.meta.env.VITE_EMAILJS_SERVICE_ID,
            import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
            templateParams,
            import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        )
            .then((result) => {
                console.log('Email sent successfully:', result.text);
                const existingOrders = JSON.parse(localStorage.getItem('all_orders')) || [];
                localStorage.setItem('all_orders', JSON.stringify([...existingOrders, orderData]));

                const notificationDetails = {
                    message: "Đơn hàng đã được tạo thành công!",
                    type: "success"
                };

                if (paymentMethod === 'bank-transfer') {
                    navigate('/payment', {
                        state: {
                            order: orderData,
                            notification: notificationDetails
                        }
                    });
                } else {
                    // For COD - pass data in the format SuccessCheckout expects
                    navigate('/checkout/success', {
                        state: {
                            orderId: orderData.orderId,
                            paymentMethod: orderData.paymentMethod,
                            customerInfo: orderData.customerInfo,
                            items: orderData.items,
                            total: orderData.total,
                            subtotal: orderData.subtotal,
                            packageCost: orderData.packageCost,
                            notification: notificationDetails
                        }
                    });
                }
            })
            .catch((error) => {
                console.error('Failed to send email:', error);
                showNotification("Có lỗi xảy ra khi gửi đơn hàng. Vui lòng thử lại.", "error");
                setIsSubmitting(false);
            });
    }
        return (
            <div className="min-h-screen bg-gray-50 pt-24 pb-12">
                <div className="container mx-auto px-4">
                    <button
                        onClick={() => navigate('/cart')}
                        className="flex items-center text-gray-600 hover:text-blue-600 mb-6"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2"/>
                        Quay lại giỏ hàng
                    </button>

                    <h1 className="text-3xl font-bold text-gray-900 mb-8">Thanh toán</h1>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left column - Forms */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Customer information form */}
                            <div className="bg-white rounded-lg shadow-sm p-6">
                                <h2 className="text-xl font-semibold mb-4">Thông tin giao hàng</h2>
                                <form className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="fullName"
                                                   className="block text-sm font-medium text-gray-700 mb-1">
                                                Họ và tên <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                id="fullName"
                                                name="fullName"
                                                value={customerInfo.fullName}
                                                onChange={handleInputChange}
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="email"
                                                   className="block text-sm font-medium text-gray-700 mb-1">
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={customerInfo.email}
                                                onChange={handleInputChange}
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                                            Số điện thoại <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={customerInfo.phone}
                                            onChange={handleInputChange}
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="address"
                                               className="block text-sm font-medium text-gray-700 mb-1">
                                            Địa chỉ <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            id="address"
                                            name="address"
                                            value={customerInfo.address}
                                            onChange={handleInputChange}
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="note" className="block text-sm font-medium text-gray-700 mb-1">
                                            Ghi chú đơn hàng
                                        </label>
                                        <textarea
                                            id="note"
                                            name="note"
                                            value={customerInfo.note}
                                            onChange={handleInputChange}
                                            rows="3"
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Ghi chú thêm cho đơn hàng của bạn (nếu có)"
                                        />
                                    </div>
                                </form>
                            </div>

                            {/* Payment method section */}
                            <div className="bg-white rounded-lg shadow-sm p-6">
                                <h2 className="text-xl font-semibold mb-4">Phương thức thanh toán</h2>
                                <div className="space-y-3">
                                    <label
                                        className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${paymentMethod === 'bank-transfer' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}>
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="bank-transfer"
                                            checked={paymentMethod === 'bank-transfer'}
                                            onChange={() => setPaymentMethod('bank-transfer')}
                                            className="hidden"
                                        />
                                        <div className="flex items-center justify-between w-full">
                                            <div className="flex items-center">
                                                <Building className="w-6 h-6 text-blue-600 mr-3"/>
                                                <div>
                                                    <h4 className="font-medium">Chuyển khoản ngân hàng</h4>
                                                    <p className="text-sm text-gray-500">Thanh toán sau khi xác nhận đơn
                                                        hàng</p>
                                                </div>
                                            </div>
                                            <div
                                                className={`w-6 h-6 rounded-full flex items-center justify-center ${paymentMethod === 'bank-transfer' ? 'bg-blue-600' : 'border border-gray-300'}`}>
                                                {paymentMethod === 'bank-transfer' &&
                                                    <Check className="w-4 h-4 text-white"/>}
                                            </div>
                                        </div>
                                    </label>

                                    <label
                                        className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${paymentMethod === 'cod' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}>
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="cod"
                                            checked={paymentMethod === 'cod'}
                                            onChange={() => setPaymentMethod('cod')}
                                            className="hidden"
                                        />
                                        <div className="flex items-center justify-between w-full">
                                            <div className="flex items-center">
                                                <CreditCard className="w-6 h-6 text-blue-600 mr-3"/>
                                                <div>
                                                    <h4 className="font-medium">Thanh toán khi nhận hàng (COD)</h4>
                                                    <p className="text-sm text-gray-500">Trả tiền mặt khi nhận hàng</p>
                                                </div>
                                            </div>
                                            <div
                                                className={`w-6 h-6 rounded-full flex items-center justify-center ${paymentMethod === 'cod' ? 'bg-blue-600' : 'border border-gray-300'}`}>
                                                {paymentMethod === 'cod' && <Check className="w-4 h-4 text-white"/>}
                                            </div>
                                        </div>
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Right column - Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-28">
                                <h2 className="text-xl font-semibold mb-4">Tóm tắt đơn hàng</h2>
                                <div className="space-y-3 max-h-60 overflow-y-auto mb-4">
                                    {items.map((item) => (
                                        <div key={item.id} className="flex items-center gap-3">
                                            <div className="relative">
                                                <img src={item.image} alt={item.name}
                                                     className="w-16 h-16 object-cover rounded"/>
                                                <span
                                                    className="absolute -top-2 -right-2 w-5 h-5 bg-gray-600 text-white text-xs rounded-full flex items-center justify-center">
                                                {item.quantity}
                                            </span>
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="text-sm font-medium line-clamp-1">{item.name}</h4>
                                                <p className="text-sm text-pink-500">{item.price.toLocaleString()} VND</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="space-y-3 border-t pt-4 mb-4">
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

                                <div className="border-t pt-4 mb-6">
                                    <div className="flex justify-between">
                                        <span className="font-semibold">Tổng thanh toán:</span>
                                        <span
                                            className="text-lg font-bold text-blue-600">{total.toLocaleString()} VND</span>
                                    </div>
                                </div>

                                <button
                                    onClick={handleSubmit}
                                    disabled={isSubmitting}
                                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors mb-4 disabled:bg-blue-400 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? 'Đang xử lý...' : 'Xác nhận đặt hàng'}
                                </button>

                                <div className="text-xs text-gray-500 flex items-start">
                                    <HelpCircle className="w-4 h-4 mr-1 flex-shrink-0 mt-0.5"/>
                                    <p>Bằng cách nhấn "Xác nhận đặt hàng", bạn đồng ý với các điều khoản và điều kiện
                                        của
                                        chúng tôi.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <Notification
                    message={notification.message}
                    type={notification.type}
                    isVisible={notification.visible}
                    onClose={() => setNotification(prev => ({...prev, visible: false}))}
                    duration={3000}
                />
            </div>
        );
    }