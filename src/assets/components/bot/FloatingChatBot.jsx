import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, X, Coffee } from 'lucide-react';
import { mugs } from '../mug/MugList.jsx';

const FloatingChatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, text: 'Xin chào! Tôi có thể giúp gì cho bạn? Bạn có thể hỏi tôi về cốc, cửa hàng của chúng tôi, hoặc gõ "gợi ý" để xem một cốc ngẫu nhiên!', isBot: true }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [shouldRedirect, setShouldRedirect] = useState(false);
    const [redirectPath, setRedirectPath] = useState('');
    const navigate = useNavigate();
    const [recommendedMug, setRecommendedMug] = useState(null);

    // Handle redirection
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsOpen(true);
        }, 1500); // Delay of 1.5 seconds before opening

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (shouldRedirect) {
            const timer = setTimeout(() => {
                navigate(redirectPath);
                setIsOpen(false); // Close the chatbot after redirecting
                setRecommendedMug(null); // Reset recommended mug after navigation
            }, 1500); // Redirect after 1.5 seconds
            return () => clearTimeout(timer);
        }
    }, [shouldRedirect, navigate, redirectPath]);

    // Function to get a random mug
    const getRandomMug = () => {
        const randomIndex = Math.floor(Math.random() * mugs.length);
        return mugs[randomIndex];
    };

    // Function to format mug recommendation
    const formatMugRecommendation = (mug) => {
        setRecommendedMug(mug); // Store the recommended mug
        return `Tôi đề xuất: "${mug.name}" - ${mug.price}$\n\n${mug.description}\n\nGõ "xem" để xem chi tiết về cốc này hoặc "gợi ý khác" để xem cốc khác.`;
    };

    // Predefined suggestions for quick replies
    const quickSuggestions = [
        'Gợi ý cốc cho tôi',
        'Xem tất cả cốc',
        'Thanh toán',
        'Có khuyến mãi không?'
    ];

    // Simple Vietnamese responses to common questions
    const getResponse = (question) => {
        const lowerQuestion = question.toLowerCase();

        if (lowerQuestion.includes('gợi ý') || lowerQuestion.includes('đề xuất') || lowerQuestion.includes('random')) {
            const randomMug = getRandomMug();
            return formatMugRecommendation(randomMug);
        } else if (lowerQuestion === 'xem' && recommendedMug) {
            setShouldRedirect(true);
            setRedirectPath(`/mug/${recommendedMug.id}`);
            return `Đang chuyển bạn đến trang chi tiết của cốc "${recommendedMug.name}"...`;
        } else if (lowerQuestion.includes('gợi ý khác')) {
            const randomMug = getRandomMug();
            return formatMugRecommendation(randomMug);
        } else if (lowerQuestion.includes('cốc')) {
            setShouldRedirect(true);
            setRedirectPath('/mugs');
            return 'Tôi đang chuyển bạn đến trang cốc của chúng tôi...';
        } else if (lowerQuestion.includes('chi tiết') || lowerQuestion.includes('thêm thông tin')) {
            if (recommendedMug) {
                setShouldRedirect(true);
                setRedirectPath(`/mug/${recommendedMug.id}`);
                return `Đang chuyển bạn đến trang chi tiết của cốc "${recommendedMug.name}"...`;
            } else {
                setShouldRedirect(true);
                setRedirectPath('/mugs');
                return 'Bạn có thể xem chi tiết tất cả các cốc tại trang sản phẩm. Đang chuyển hướng...';
            }
        } else if (lowerQuestion.includes('thanh toán')) {
            setShouldRedirect(true);
            setRedirectPath('/cart');
            return 'Tôi đang chuyển bạn đến trang thanh toán...';
        } else if (lowerQuestion.includes('khuyến mãi') || lowerQuestion.includes('giảm giá')) {
            return 'Hiện tại chúng tôi đang có chương trình giảm giá 10% cho tất cả cốc ceramic. Nhập mã "MUGGY10" khi thanh toán.';
        } else if (lowerQuestion.includes('xin chào') || lowerQuestion.includes('chào')) {
            return 'Xin chào! Rất vui được gặp bạn. Bạn muốn tìm hiểu về sản phẩm nào của chúng tôi?';
        } else if (lowerQuestion.includes('tên') && lowerQuestion.includes('bạn')) {
            return 'Tôi là Trợ lý Muggy. Rất vui được phục vụ bạn!';
        } else if (lowerQuestion.includes('thời tiết')) {
            return 'Tôi không có thông tin thời tiết cập nhật. Bạn có thể kiểm tra trên ứng dụng thời tiết để biết thông tin chính xác.';
        } else if (lowerQuestion.includes('giờ') || lowerQuestion.includes('ngày')) {
            return `Hôm nay là ${new Date().toLocaleDateString('vi-VN')}. Chúc bạn một ngày tốt lành!`;
        } else if (lowerQuestion.includes('cảm ơn')) {
            return 'Không có gì! Tôi luôn sẵn sàng giúp đỡ bạn. Bạn có muốn xem gợi ý cốc đẹp không?';
        } else if (lowerQuestion.includes('tạm biệt')) {
            return 'Tạm biệt! Hẹn gặp lại bạn sau.';
        } else if (lowerQuestion.includes('đặc điểm') || lowerQuestion.includes('tính năng')) {
            return 'Các cốc của chúng tôi được làm từ chất liệu cao cấp, an toàn với thực phẩm và đa dạng về mẫu mã. Hầu hết đều có thể dùng trong lò vi sóng và máy rửa chén.';
        } else if (lowerQuestion.includes('việt nam')) {
            return 'Việt Nam là một quốc gia xinh đẹp nằm ở khu vực Đông Nam Á, nổi tiếng với văn hóa phong phú và ẩm thực tuyệt vời.';
        } else if (lowerQuestion.includes('tiếng việt')) {
            return 'Tiếng Việt là ngôn ngữ chính thức của Việt Nam, được khoảng 95 triệu người sử dụng.';
        } else if (lowerQuestion.includes('ăn') || lowerQuestion.includes('món')) {
            return 'Ẩm thực Việt Nam rất đa dạng và phong phú, nổi tiếng với các món như phở, bánh mì, bún chả và nhiều món khác nữa!';
        } else if (lowerQuestion.includes('mua') || lowerQuestion.includes('thêm vào giỏ')) {
            if (recommendedMug) {
                setShouldRedirect(true);
                setRedirectPath(`/mug/${recommendedMug.id}`);
                return `Tôi sẽ đưa bạn đến trang sản phẩm để thêm "${recommendedMug.name}" vào giỏ hàng...`;
            } else {
                return 'Bạn có thể gõ "gợi ý" để xem một cốc ngẫu nhiên, hoặc truy cập trang sản phẩm để xem tất cả các cốc của chúng tôi.';
            }
        } else {
            return 'Xin lỗi, tôi không hiểu câu hỏi. Bạn có thể hỏi về các sản phẩm cốc, khuyến mãi, hoặc gõ "gợi ý" để xem một cốc ngẫu nhiên!';
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        // Add user message
        const userMessage = { id: messages.length + 1, text: input, isBot: false };
        setMessages(prev => [...prev, userMessage]);
        setInput('');

        // Simulate bot thinking
        setIsTyping(true);

        // Simulate bot response delay
        setTimeout(() => {
            const botResponse = { id: messages.length + 2, text: getResponse(input), isBot: true };
            setMessages(prev => [...prev, botResponse]);
            setIsTyping(false);
        }, 1000);
    };

    // Add new quick suggestions when a mug is recommended
    const getDynamicSuggestions = () => {
        if (recommendedMug) {
            return [
                'Xem',
                'Gợi ý khác',
                'Thêm vào giỏ',
                'Xem tất cả cốc'
            ];
        }
        return quickSuggestions;
    };

    // Handle quick suggestion click
    const handleSuggestionClick = (suggestion) => {
        setInput(suggestion);

        // Automatically submit the form with the selected suggestion
        const userMessage = { id: messages.length + 1, text: suggestion, isBot: false };
        setMessages(prev => [...prev, userMessage]);

        // Simulate bot thinking
        setIsTyping(true);

        // Simulate bot response delay
        setTimeout(() => {
            const botResponse = { id: messages.length + 2, text: getResponse(suggestion), isBot: true };
            setMessages(prev => [...prev, botResponse]);
            setIsTyping(false);
        }, 1000);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {/* Chat bubble button */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-pink-500 hover:bg-pink-600 text-white rounded-full p-4 shadow-lg transition-all duration-300"
                >
                    <MessageSquare className="w-6 h-6" />
                </button>
            )}

            {/* Chat window */}
            {isOpen && (
                <div className="flex flex-col w-80 h-[450px] bg-white rounded-lg shadow-xl overflow-hidden">
                    <div className="p-4 bg-pink-500 text-white font-medium flex justify-between items-center">
                        <div className="flex items-center">
                            <Coffee className="w-5 h-5 mr-2" />
                            <span>Trợ Lý Muggy</span>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-white hover:text-pink-100"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="flex-1 p-4 overflow-y-auto bg-pink-50">
                        {messages.map(message => (
                            <div
                                key={message.id}
                                className={`mb-4 ${message.isBot ? 'flex justify-start' : 'flex justify-end'}`}
                            >
                                <div
                                    className={`max-w-xs p-3 rounded-lg ${
                                        message.isBot
                                            ? 'bg-pink-100 text-gray-800'
                                            : 'bg-pink-500 text-white'
                                    }`}
                                >
                                    {message.text}
                                </div>
                            </div>
                        ))}
                        {isTyping && (
                            <div className="flex justify-start mb-4">
                                <div className="bg-pink-100 p-3 rounded-lg">
                                    <div className="flex space-x-1">
                                        <div className="w-2 h-2 bg-pink-300 rounded-full animate-bounce"></div>
                                        <div className="w-2 h-2 bg-pink-300 rounded-full animate-bounce delay-100"></div>
                                        <div className="w-2 h-2 bg-pink-300 rounded-full animate-bounce delay-200"></div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Dynamic quick suggestions */}
                    <div className="border-t border-b px-3 py-2 bg-pink-50">
                        <div className="flex flex-wrap gap-2">
                            {getDynamicSuggestions().map((suggestion, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleSuggestionClick(suggestion)}
                                    className="text-xs bg-white border border-pink-300 text-pink-700 px-2 py-1 rounded-full hover:bg-pink-100 transition-colors"
                                >
                                    {suggestion}
                                </button>
                            ))}
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="p-3 flex">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Gõ câu hỏi của bạn..."
                            className="flex-1 border rounded-l-lg p-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
                        />
                        <button
                            type="submit"
                            className="bg-pink-500 text-white px-4 py-2 rounded-r-lg hover:bg-pink-600"
                        >
                            Gửi
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default FloatingChatbot;