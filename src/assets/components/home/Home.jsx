import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {ChevronRight, Phone, Mail, MapPin, Send, Coffee, Heart, Sparkles, Star} from 'lucide-react';
import home_mug from '../../images/Home_Mug.jpg'
import './HomeStyles.css'
import MugCollection from '../mug/MugCollection';


export default function Home() {
    const [messageSent, setMessageSent] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setMessageSent(true);
        setTimeout(() => setMessageSent(false), 2000);
    };
    return (
        <main>
            {/* Hero Section */}
            <section className="pt-20 bg-gradient-to-br from-pink-50 via-white to-purple-50 relative overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-20 left-10 w-20 h-20 bg-pink-200 rounded-full opacity-20 animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-32 h-32 bg-purple-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/4 w-6 h-6 bg-pink-400 rounded-full opacity-30 animate-bounce"></div>

                <div className="container mx-auto px-4 py-16">
                    <div className="flex flex-col lg:flex-row items-center gap-12">
                        {/* Left Content */}
                        <div className="lg:w-3/5 text-center lg:text-left">
                            <div className="mb-6">
                                <span className="inline-flex items-center gap-2 bg-pink-100 text-pink-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
                                    <Sparkles className="w-4 h-4" />
                                    Sản phầm mới về !
                                </span>
                            </div>

                            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                                Unique Mugs for{' '}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
                                    Unique People
                                </span>
                            </h1>

                            <p className="text-lg lg:text-xl text-gray-600 mb-8 max-w-2xl">
                                Hãy khám phá những sản phẩm cốc sứ độc đáo của Muggie ✨
                                Mỗi chiếc cốc đều mang trong mình một câu chuyện riêng biệt.
                            </p>

                            {/* Stats */}
                            <div className="flex flex-wrap justify-center lg:justify-start gap-8 mb-8">
                                {[
                                    { number: '5+', label: 'Khách hàng' },
                                    { number: '5+', label: 'Thiết kế độc đáo' },
                                    { number: '4.9', label: 'Đánh giá', icon: Star }
                                ].map(({ number, label, icon: Icon }, index) => (
                                    <div key={index} className="text-center">
                                        <div className="flex items-center justify-center gap-1 mb-1">
                                            <span className="text-2xl font-bold text-gray-900">{number}</span>
                                            {Icon && <Icon className="w-5 h-5 text-yellow-400 fill-current" />}
                                        </div>
                                        <p className="text-sm text-gray-500">{label}</p>
                                    </div>
                                ))}
                            </div>

                            {/* CTA Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                <Link
                                    to="/mugs"
                                    className="group bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-full flex items-center justify-center hover:shadow-lg transition-all duration-300 hover:scale-105"
                                >
                                    <span className="mr-2">Mua ngay</span>
                                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </div>

                        {/* Right Image - Made Smaller */}
                        <div className="lg:w-2/5 flex justify-center">
                            <div className="relative">
                                {/* Main image container - reduced size */}
                                <div className="w-80 h-80 lg:w-96 lg:h-96 relative">
                                    <div className="absolute inset-0 bg-gradient-to-br from-pink-200 to-purple-200 rounded-3xl transform rotate-6 opacity-50"></div>
                                    <div className="absolute inset-0 bg-gradient-to-br from-pink-300 to-purple-300 rounded-3xl transform -rotate-3 opacity-30"></div>
                                    <div className="relative bg-gradient-to-br from-pink-100 to-purple-100 p-4 rounded-3xl shadow-2xl">
                                        <img
                                            src={home_mug}
                                            alt="Beautiful Ceramic Mug"
                                            className="w-full h-full object-cover rounded-2xl shadow-inner floating-image"
                                        />
                                    </div>
                                </div>

                                {/* Floating elements around image */}
                                <div className="absolute -top-4 -right-4 bg-white p-3 rounded-full shadow-lg animate-bounce">
                                    <Heart className="w-6 h-6 text-pink-500 fill-current" />
                                </div>
                                <div className="absolute -bottom-4 -left-4 bg-white p-3 rounded-full shadow-lg animate-bounce delay-500">
                                    <Star className="w-6 h-6 text-yellow-400 fill-current" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { icon: Coffee, title: 'Premium Quality', desc: 'Chất liệu gốm sứ cao cấp' },
                            { icon: Heart, title: 'Handcrafted', desc: 'Được chế tác thủ công tỉ mỉ' },
                            { icon: Sparkles, title: 'Unique Design', desc: 'Thiết kế độc đáo, không trùng lặp' }
                        ].map(({ icon: Icon, title, desc }, index) => (
                            <div key={index} className="text-center group hover:transform hover:scale-105 transition-all duration-300">
                                <div className="w-16 h-16 bg-gradient-to-br from-pink-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg">
                                    <Icon className="w-8 h-8 text-pink-500 group-hover:scale-110 transition-transform" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2 text-gray-900">{title}</h3>
                                <p className="text-gray-600">{desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Collection Bundles Section */}
            <MugCollection />

            {/* Contact Section */}
            <section id="contact" className="bg-gradient-to-br from-pink-50 to-purple-50 py-20">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                            Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">Touch</span>
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Có câu hỏi về sản phẩm hoặc muốn đặt hàng? Hãy liên hệ với chúng tôi ngay!
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                        {/* Contact Info */}
                        <div className="space-y-6">
                            {[
                                { Icon: Phone, text: '0966947393', label: 'Số điện thoại', color: 'text-green-500' },
                                { Icon: Mail, text: 'hellomuggy@gmail.com', label: 'Email', color: 'text-blue-500' },
                                { Icon: MapPin, text: 'Số nhà 21, liền kề 8, KĐT Xa La, Hà Đông, Hà Nội', label: 'Địa chỉ', color: 'text-red-500' }
                            ].map(({ Icon, text, label, color }, index) => (
                                <div key={index} className="contact-item group bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300">
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0">
                                            <div className="w-12 h-12 bg-gradient-to-br from-pink-100 to-purple-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                                <Icon className={`w-6 h-6 ${color}`} />
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900 mb-1">{label}</h3>
                                            <p className="text-gray-600 leading-relaxed">{text}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {/* Social proof */}
                        </div>

                        {/* Contact Form */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm">
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="input-wrapper">
                                        <input
                                            type="text"
                                            placeholder="Tên của bạn"
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100 transition-all"
                                        />
                                    </div>
                                    <div className="input-wrapper">
                                        <input
                                            type="email"
                                            placeholder="Email của bạn"
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100 transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="input-wrapper">
                                    <input
                                        type="tel"
                                        placeholder="Số điện thoại"
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100 transition-all"
                                    />
                                </div>

                                <div className="input-wrapper">
                                    <textarea
                                        placeholder="Tin nhắn của bạn..."
                                        rows={4}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100 transition-all resize-none"
                                    ></textarea>
                                </div>

                                <button
                                    onClick={handleSubmit}
                                    className={`w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-4 rounded-xl hover:shadow-lg 
                                              transition-all duration-300 flex items-center justify-center gap-2 group hover:scale-[1.02]
                                              ${messageSent ? 'send-animation' : ''}`}
                                >
                                    <span>{messageSent ? 'Đã gửi!' : 'Gửi tin nhắn'}</span>
                                    <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}