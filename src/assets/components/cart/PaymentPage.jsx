import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Clock, Copy, Check, ShieldCheck, ArrowRight } from 'lucide-react';
import { QRCodeSVG as QRCode } from 'qrcode.react';
import Notification from '../utils/Notification.jsx';
import useCart from "./CartContext.jsx";

function crc16(data) {
    let crc = 0xFFFF;
    for (let i = 0; i < data.length; i++) {
        crc ^= data.charCodeAt(i) << 8;
        for (let j = 0; j < 8; j++) {
            crc = (crc & 0x8000) ? (crc << 1) ^ 0x1021 : crc << 1;
        }
    }
    return (crc & 0xFFFF).toString(16).toUpperCase().padStart(4, '0');
}

// Move bankDetails outside component to prevent recreation on each render
const bankDetails = {
    bin: '970407', // Techcombank
    accountNumber: '7728032004',
    accountName: 'TO MINH NGOC ANH',
};

export default function PaymentPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const { clearCart } = useCart();
    const { order, notification: initialNotification } = location.state || {};

    const [qrValue, setQrValue] = useState('');
    const [copied, setCopied] = useState(false);
    const [notification, setNotification] = useState({ visible: false, message: '', type: 'success' });

    useEffect(() => {
        if (!order) {
            navigate('/');
            return;
        }

        clearCart();

        if (initialNotification) {
            showNotification(initialNotification.message, initialNotification.type);
        }

        const amountStr = order.total.toString();
        const memo = order.orderId;

        const payloadFormat = '000201';
        const pointOfInitiation = '010212';
        const guid = 'A000000727';
        const bankInfo = `00${bankDetails.bin.length.toString().padStart(2, '0')}${bankDetails.bin}01${bankDetails.accountNumber.length.toString().padStart(2, '0')}${bankDetails.accountNumber}`;
        const merchantAccountInfo = `38${(guid.length + 4 + bankInfo.length).toString().padStart(2, '0')}00${guid.length.toString().padStart(2, '0')}${guid}01${bankInfo.length.toString().padStart(2, '0')}${bankInfo}`;
        const transactionCurrency = '5303704';
        const transactionAmount = `54${amountStr.length.toString().padStart(2, '0')}${amountStr}`;
        const countryCode = '5802VN';
        const purposeOfTransaction = `08${memo.length.toString().padStart(2, '0')}${memo}`;
        const additionalData = `62${(purposeOfTransaction.length).toString().padStart(2, '0')}${purposeOfTransaction}`;
        const payload = `${payloadFormat}${pointOfInitiation}${merchantAccountInfo}${transactionCurrency}${transactionAmount}${countryCode}${additionalData}6304`;
        const crc = crc16(payload);

        setQrValue(`${payload}${crc}`);

    }, [order, navigate, clearCart, initialNotification]); // Removed bankDetails references

    const showNotification = (message, type) => {
        setNotification({ visible: true, message, type });
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        showNotification("Đã sao chép vào bộ nhớ", "success");
    };

    if (!order) return null;

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-12 flex items-center justify-center">
            <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-8">
                <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                        <Check className="w-10 h-10 text-green-500" />
                    </div>
                    <h1 className="text-2xl font-bold mb-2">Đơn hàng đã được tạo!</h1>
                    <p className="text-gray-600 mb-6">Vui lòng hoàn tất thanh toán cho đơn hàng <span className="font-semibold text-blue-600">{order.orderId}</span>.</p>
                </div>

                <div className="border rounded-lg p-5 bg-blue-50">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-medium text-lg">Thông tin chuyển khoản</h3>
                        <div className="text-sm px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            Đơn hàng được giữ trong 24 giờ
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="md:w-1/3 flex flex-col items-center">
                            <div className="bg-white p-3 rounded-lg shadow-sm mb-2">
                                {qrValue ? <QRCode value={qrValue} size={150} level={"H"} /> : <div className="w-[150px] h-[150px] bg-gray-200 animate-pulse rounded-lg"></div>}
                            </div>
                            <p className="text-sm text-center text-gray-600">Quét mã để thanh toán</p>
                        </div>

                        <div className="md:w-2/3 space-y-3">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Ngân hàng:</span>
                                <span className="font-medium">Techcombank</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Số tài khoản:</span>
                                <div className="flex items-center">
                                    <span className="font-medium mr-2">{bankDetails.accountNumber}</span>
                                    <button onClick={() => copyToClipboard(bankDetails.accountNumber)} className="text-blue-600 hover:text-blue-800">
                                        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Số tiền:</span>
                                <span className="font-bold text-lg text-blue-600">{order.total.toLocaleString()} VND</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Nội dung:</span>
                                <div className="flex items-center">
                                    <span className="font-medium mr-2">{order.orderId}</span>
                                    <button onClick={() => copyToClipboard(order.orderId)} className="text-blue-600 hover:text-blue-800">
                                        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="pt-4 mt-4 border-t border-gray-200 text-sm text-gray-600">
                        <p className="flex items-start">
                            <ShieldCheck className="w-4 h-4 text-green-600 mr-2 mt-0.5" />
                            Vui lòng ghi đúng nội dung chuyển khoản để chúng tôi xác nhận nhanh chóng.
                        </p>
                    </div>
                </div>

                <div className="mt-6">
                    <Link
                        to="/"
                        className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700"
                    >
                        Tiếp tục mua sắm
                        <ArrowRight className="w-5 h-5 ml-2" />
                    </Link>
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