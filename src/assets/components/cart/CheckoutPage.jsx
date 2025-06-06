// CheckoutPage.jsx
import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {ArrowLeft, Building, Check, Clock, Copy, CreditCard, HelpCircle, ShieldCheck} from 'lucide-react';
import useCart from "./CartContext.jsx";
import Notification from "../utils/Notification.jsx";
import qr from "../../images/qrcode.png"

const bankQrCode = qr; // Replace with your QR code URL

// Random order ID generator
const generateOrderId = () => {
    return 'ORD-' + Math.floor(100000 + Math.random() * 900000);
};

export default function CheckoutPage() {
    const navigate = useNavigate();
    const {items, subtotal, total, selectedPackage, packageCost} = useCart();
    const [orderId, setOrderId] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('bank-transfer');
    const [customerInfo, setCustomerInfo] = useState({
        fullName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        note: ''
    });
    const [copied, setCopied] = useState(false);
    const [notification, setNotification] = useState({
        visible: false,
        message: '',
        type: 'success'
    });

    // Bank account details
    const bankDetails = {
        bankName: 'TpBank',
        accountNumber: '19036789065016',
        accountName: 'NGUYEN VAN A',
        branch: 'Hà Nội',
        transferContent: orderId
    };

    useEffect(() => {
        // Generate an order ID when the component mounts
        setOrderId(generateOrderId());

        // Check if cart is empty
        if (items.length === 0) {
            navigate('/cart');
        }
    }, [items, navigate]);

    const showNotification = (message, type) => {
        setNotification({
            visible: true,
            message,
            type
        });
    };

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setCustomerInfo(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        showNotification("Đã sao chép vào bộ nhớ", "success");
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate form
        if (!customerInfo.fullName || !customerInfo.phone || !customerInfo.address || !customerInfo.city) {
            showNotification("Vui lòng điền đầy đủ thông tin", "error");
            return;
        }

        // Here you would normally submit the order to your backend

        // Navigate to success page with order details
        navigate('/checkout/success', {
            state: {
                orderId,
                paymentMethod,
                customerInfo,
                items,
                total,
                subtotal,
                packageCost
            }
        });

    // Here you would normally submit the order to your backend
    showNotification("Đơn hàng đã được tạo thành công!", "success");

    // In a real app, you might redirect to a confirmation page
    // For now, we'll just show a notification
};

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
                {/* Left column - Order details and customer form */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Customer information form */}
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <h2 className="text-xl font-semibold mb-4">Thông tin giao hàng</h2>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                                        Họ và tên <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="fullName"
                                        name="fullName"
                                        value={customerInfo.fullName}
                                        onChange={handleInputChange}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={customerInfo.email}
                                        onChange={handleInputChange}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
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
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                                    Địa chỉ <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="address"
                                    name="address"
                                    value={customerInfo.address}
                                    onChange={handleInputChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                                    Tỉnh/Thành phố <span className="text-red-500">*</span>
                                </label>
                                <select
                                    id="city"
                                    name="city"
                                    value={customerInfo.city}
                                    onChange={handleInputChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                    required
                                >
                                    <option value="">Chọn tỉnh/thành phố</option>
                                    <option value="hanoi">Hà Nội</option>
                                    <option value="hcm">TP. Hồ Chí Minh</option>
                                    <option value="danang">Đà Nẵng</option>
                                    <option value="other">Khác</option>
                                </select>
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
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Ghi chú thêm cho đơn hàng của bạn (nếu có)"
                                ></textarea>
                            </div>
                        </form>
                    </div>

                    {/* Payment methods */}
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <h2 className="text-xl font-semibold mb-4">Phương thức thanh toán</h2>

                        <div className="space-y-3">
                            <label
                                className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                                    paymentMethod === 'bank-transfer' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                                }`}>
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
                                            <p className="text-sm text-gray-500">Chuyển khoản qua QR Code hoặc STK ngân
                                                hàng</p>
                                        </div>
                                    </div>
                                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                                        paymentMethod === 'bank-transfer' ? 'bg-blue-600' : 'border border-gray-300'
                                    }`}>
                                        {paymentMethod === 'bank-transfer' && <Check className="w-4 h-4 text-white"/>}
                                    </div>
                                </div>
                            </label>

                            <label
                                className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                                    paymentMethod === 'cod' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                                }`}>
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
                                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                                        paymentMethod === 'cod' ? 'bg-blue-600' : 'border border-gray-300'
                                    }`}>
                                        {paymentMethod === 'cod' && <Check className="w-4 h-4 text-white"/>}
                                    </div>
                                </div>
                            </label>
                        </div>

                        {/* Bank transfer details */}
                        {paymentMethod === 'bank-transfer' && (
                            <div className="mt-6 border rounded-lg p-5 bg-blue-50">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-medium text-lg">Thông tin chuyển khoản</h3>
                                    <div
                                        className="text-sm px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full flex items-center">
                                        <Clock className="w-4 h-4 mr-1"/>
                                        Đơn hàng được giữ trong 24 giờ
                                    </div>
                                </div>

                                <div className="flex flex-col md:flex-row gap-6">
                                    {/* QR Code */}
                                    <div className="md:w-1/3 flex flex-col items-center">
                                        <div className="bg-white p-3 rounded-lg shadow-sm mb-2">
                                            <img
                                                src={bankQrCode}
                                                alt="QR Code thanh toán"
                                                className="w-full h-auto max-w-[200px]"
                                            />
                                        </div>
                                        <p className="text-sm text-center text-gray-600">
                                            Quét mã QR để thanh toán
                                        </p>
                                    </div>

                                    {/* Bank details */}
                                    <div className="md:w-2/3 space-y-3">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Ngân hàng:</span>
                                            <span className="font-medium">{bankDetails.bankName}</span>
                                        </div>

                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-600">Số tài khoản:</span>
                                            <div className="flex items-center">
                                                <span className="font-medium mr-2">{bankDetails.accountNumber}</span>
                                                <button
                                                    onClick={() => copyToClipboard(bankDetails.accountNumber)}
                                                    className="text-blue-600 hover:text-blue-800"
                                                >
                                                    {copied ? <Check className="w-4 h-4"/> :
                                                        <Copy className="w-4 h-4"/>}
                                                </button>
                                            </div>
                                        </div>

                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Chủ tài khoản:</span>
                                            <span className="font-medium">{bankDetails.accountName}</span>
                                        </div>

                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Chi nhánh:</span>
                                            <span className="font-medium">{bankDetails.branch}</span>
                                        </div>

                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-600">Nội dung chuyển khoản:</span>
                                            <div className="flex items-center">
                                                <span className="font-medium mr-2">{orderId}</span>
                                                <button
                                                    onClick={() => copyToClipboard(orderId)}
                                                    className="text-blue-600 hover:text-blue-800"
                                                >
                                                    {copied ? <Check className="w-4 h-4"/> :
                                                        <Copy className="w-4 h-4"/>}
                                                </button>
                                            </div>
                                        </div>

                                        <div className="pt-3 mt-3 border-t border-gray-200 text-sm text-gray-600">
                                            <p className="flex items-start">
                                                <ShieldCheck className="w-4 h-4 text-green-600 mr-2 mt-0.5"/>
                                                Vui lòng ghi đúng nội dung chuyển khoản là mã đơn hàng {orderId} để
                                                chúng tôi xác nhận thanh toán nhanh chóng.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right column - Order summary */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-lg shadow-sm p-6 sticky top-28">
                        <h2 className="text-xl font-semibold mb-4">Tóm tắt đơn hàng</h2>
                        <div className="mb-4">
                            <div className="text-sm text-gray-500 mb-2">Mã đơn hàng: {orderId}</div>
                            <div className="space-y-3 max-h-60 overflow-y-auto mb-3">
                                {items.map((item) => (
                                    <div key={item.id} className="flex items-center gap-3">
                                        <div className="relative">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-16 h-16 object-cover rounded"
                                            />
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
                        </div>

                        <div className="space-y-3 mb-4">
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

                            {selectedPackage && (
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Loại túi:</span>
                                    <span>{selectedPackage.name}</span>
                                </div>
                            )}
                        </div>

                        <div className="border-t pt-3 mb-6">
                            <div className="flex justify-between">
                                <span className="font-semibold">Tổng thanh toán:</span>
                                <span className="text-lg font-bold text-blue-600">{total.toLocaleString()} VND</span>
                            </div>
                        </div>

                        <button
                            onClick={handleSubmit}
                            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors mb-4"
                        >
                            Xác nhận đặt hàng
                        </button>

                        <div className="text-xs text-gray-500 flex items-start">
                            <HelpCircle className="w-4 h-4 mr-1 flex-shrink-0 mt-0.5"/>
                            <p>Bằng cách nhấn "Xác nhận đặt hàng", bạn đồng ý với các điều khoản và điều kiện của chúng
                                tôi.</p>
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