import React from 'react';
import { Heart, Star, Coffee, Users, MessageCircle, Gift, Sparkles, Award, Clock, Shield } from 'lucide-react';

export default function AboutUs() {
    const values = [
        {
            icon: Heart,
            title: 'Passion',
            description: 'Đam mê tạo ra những sản phẩm mang đậm cá tính cho giới trẻ',
            color: 'text-pink-500',
            bgColor: 'from-pink-100 to-pink-50'
        },
        {
            icon: Sparkles,
            title: 'Creativity',
            description: 'Sáng tạo không ngừng trong thiết kế và trải nghiệm khách hàng',
            color: 'text-purple-500',
            bgColor: 'from-purple-100 to-purple-50'
        },
        {
            icon: Users,
            title: 'Community',
            description: 'Xây dựng cộng đồng yêu thích những sản phẩm độc đáo',
            color: 'text-blue-500',
            bgColor: 'from-blue-100 to-blue-50'
        },
        {
            icon: Award,
            title: 'Quality',
            description: 'Cam kết chất lượng cao trong từng sản phẩm và dịch vụ',
            color: 'text-green-500',
            bgColor: 'from-green-100 to-green-50'
        }
    ];

    const features = [
        {
            icon: MessageCircle,
            title: 'Chatbot Thông Minh',
            description: 'Hỗ trợ tư vấn 24/7 với AI chatbot hiện đại',
            color: 'text-blue-500'
        },
        {
            icon: Shield,
            title: 'Chăm Sóc Tận Tâm',
            description: 'Dịch vụ khách hàng chuyên nghiệp và tận tình',
            color: 'text-green-500'
        },
        {
            icon: Gift,
            title: 'Ưu Đãi Hấp Dẫn',
            description: 'Chương trình khuyến mãi và quà tặng đặc biệt',
            color: 'text-purple-500'
        },
        {
            icon: Clock,
            title: 'Mua Sắm Tiện Lợi',
            description: 'Nền tảng online dễ sử dụng, giao hàng nhanh',
            color: 'text-pink-500'
        }
    ];

    const stats = [
        { number: '20+', label: 'Khách hàng hài lòng', icon: Heart },
        { number: '1', label: 'Thiết kế độc đáo', icon: Coffee },
        { number: '4.9/5', label: 'Đánh giá trung bình', icon: Star },
        { number: '24/7', label: 'Hỗ trợ trực tuyến', icon: MessageCircle }
    ];

    return (
        <main className="pt-20">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-pink-50 via-white to-purple-50 relative overflow-hidden py-20">
                {/* Decorative elements */}
                <div className="absolute top-20 left-10 w-20 h-20 bg-pink-200 rounded-full opacity-20 animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-32 h-32 bg-purple-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
                <div className="absolute top-1/3 right-1/4 w-8 h-8 bg-purple-300 rounded-full opacity-30 animate-bounce delay-500"></div>
                <div className="absolute bottom-1/3 left-1/3 w-6 h-6 bg-pink-400 rounded-full opacity-40 animate-pulse delay-700"></div>

                <div className="container mx-auto px-4">
                    <div className="text-center max-w-4xl mx-auto">
                        <div className="mb-6">
                            <span className="inline-flex items-center gap-2 bg-pink-100 text-pink-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
                                <Sparkles className="w-4 h-4" />
                                Về Muggie
                            </span>
                        </div>

                        <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                            Chúng tôi là{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
                                Muggie
                            </span>
                        </h1>

                        <p className="text-lg lg:text-xl text-gray-600 mb-8 leading-relaxed">
                            Muggie là startup chuyên kinh doanh cốc sứ dành cho giới trẻ, với thiết kế đáng yêu,
                            sáng tạo và mang đậm cá tính. Sản phẩm không chỉ là vật dụng hàng ngày mà còn là
                            món quà thể hiện phong cách riêng.
                        </p>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
                            {stats.map(({ number, label, icon: Icon }, index) => (
                                <div
                                    key={index}
                                    className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 hover:transform hover:scale-105 group"
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    <div className="flex flex-col items-center">
                                        <div className="w-12 h-12 bg-gradient-to-br from-pink-100 to-purple-100 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                            <Icon className="w-6 h-6 text-pink-500" />
                                        </div>
                                        <div className="text-2xl font-bold text-gray-900 mb-1">{number}</div>
                                        <div className="text-sm text-gray-600 text-center">{label}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Values Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                            Giá trị cốt lõi của{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
                                chúng tôi
                            </span>
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Những giá trị định hướng mọi hoạt động và phát triển của Muggie
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map(({ icon: Icon, title, description, color, bgColor }, index) => (
                            <div
                                key={index}
                                className="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 hover:transform hover:-translate-y-2 relative overflow-hidden"
                            >
                                {/* Background gradient overlay */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>

                                <div className="relative">
                                    <div className="w-16 h-16 bg-gradient-to-br from-pink-100 to-purple-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                        <Icon className={`w-8 h-8 ${color}`} />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-3 text-gray-900">{title}</h3>
                                    <p className="text-gray-600 leading-relaxed">{description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-gradient-to-br from-gray-50 to-purple-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                            Tại sao chọn{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
                                Muggie?
                            </span>
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Chúng tôi không chỉ bán sản phẩm, mà còn mang đến trải nghiệm mua sắm tuyệt vời
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map(({ icon: Icon, title, description, color }, index) => (
                            <div
                                key={index}
                                className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 hover:transform hover:scale-105 group text-center"
                            >
                                <div className="w-16 h-16 bg-gradient-to-br from-pink-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                    <Icon className={`w-8 h-8 ${color}`} />
                                </div>
                                <h3 className="text-lg font-semibold mb-3 text-gray-900">{title}</h3>
                                <p className="text-gray-600 leading-relaxed">{description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mission Statement */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="relative">
                            {/* Background decoration */}
                            <div className="absolute -top-8 -left-8 w-16 h-16 bg-pink-200 rounded-full opacity-20"></div>
                            <div className="absolute -bottom-8 -right-8 w-20 h-20 bg-purple-200 rounded-full opacity-20"></div>

                            <div className="bg-gradient-to-br from-pink-50 to-purple-50 p-12 rounded-3xl relative">
                                <div className="mb-6">
                                    <Coffee className="w-16 h-16 text-pink-500 mx-auto mb-4" />
                                </div>
                                <h2 className="text-2xl lg:text-3xl font-bold mb-6 text-gray-900">
                                    Sứ mệnh của chúng tôi
                                </h2>
                                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                                    Tại Muggie, chúng tôi tin rằng mỗi chiếc cốc đều có thể kể một câu chuyện.
                                    Sứ mệnh của chúng tôi là mang đến cho giới trẻ những sản phẩm không chỉ
                                    đẹp mắt mà còn thể hiện được cá tính riêng của từng người.
                                </p>
                                <p className="text-lg text-gray-700 leading-relaxed">
                                    Với công nghệ hiện đại và dịch vụ tận tâm, chúng tôi cam kết tạo ra
                                    trải nghiệm mua sắm tuyệt vời và xây dựng cộng đồng yêu thích
                                    những điều độc đáo, sáng tạo.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-16 bg-gradient-to-r from-pink-500 to-purple-600">
                <div className="container mx-auto px-4 text-center">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                            Sẵn sàng khám phá bộ sưu tập của chúng tôi?
                        </h2>
                        <p className="text-pink-100 text-lg mb-8">
                            Hãy tìm chiếc cốc hoàn hảo thể hiện phong cách riêng của bạn
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button className="bg-white text-pink-600 px-8 py-4 rounded-full font-semibold hover:transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                                <a href="/mugs">Xem bộ sưu tập</a>
                            </button>
                            <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-pink-600 transition-all duration-300">
                                Liên hệ ngay
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}