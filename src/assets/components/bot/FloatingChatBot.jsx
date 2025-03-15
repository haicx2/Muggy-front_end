// FloatingChatbot.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, X } from 'lucide-react';

const FloatingChatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, text: 'Xin chào! Tôi có thể giúp gì cho bạn?', isBot: true }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [shouldRedirect, setShouldRedirect] = useState(false);
    const navigate = useNavigate();

    // Handle redirection
    useEffect(() => {
        if (shouldRedirect) {
            const timer = setTimeout(() => {
                navigate('/mugs');
                setIsOpen(false); // Close the chatbot after redirecting
            }, 1500); // Redirect after 1.5 seconds
            return () => clearTimeout(timer);
        }
    }, [shouldRedirect, navigate]);

    // Simple Vietnamese responses to common questions
    const getResponse = (question) => {
        const lowerQuestion = question.toLowerCase();

        if (lowerQuestion.includes('cốc')) {
            setShouldRedirect(true);
            return 'Tôi đang chuyển bạn đến trang cốc của chúng tôi...';
        } else if (lowerQuestion.includes('xin chào') || lowerQuestion.includes('chào')) {
            return 'Xin chào! Rất vui được gặp bạn.';
        } else if (lowerQuestion.includes('tên') && lowerQuestion.includes('bạn')) {
            return 'Tôi là Trợ lý Muggy. Rất vui được phục vụ bạn!';
        } else if (lowerQuestion.includes('thời tiết')) {
            return 'Tôi không có thông tin thời tiết cập nhật. Bạn có thể kiểm tra trên ứng dụng thời tiết để biết thông tin chính xác.';
        } else if (lowerQuestion.includes('giờ') || lowerQuestion.includes('ngày')) {
            return `Hôm nay là ${new Date().toLocaleDateString('vi-VN')}. Chúc bạn một ngày tốt lành!`;
        } else if (lowerQuestion.includes('cảm ơn')) {
            return 'Không có gì! Tôi luôn sẵn sàng giúp đỡ bạn.';
        } else if (lowerQuestion.includes('tạm biệt')) {
            return 'Tạm biệt! Hẹn gặp lại bạn sau.';
        } else if (lowerQuestion.includes('việt nam')) {
            return 'Việt Nam là một quốc gia xinh đẹp nằm ở khu vực Đông Nam Á, nổi tiếng với văn hóa phong phú và ẩm thực tuyệt vời.';
        } else if (lowerQuestion.includes('tiếng việt')) {
            return 'Tiếng Việt là ngôn ngữ chính thức của Việt Nam, được khoảng 95 triệu người sử dụng.';
        } else if (lowerQuestion.includes('ăn') || lowerQuestion.includes('món')) {
            return 'Ẩm thực Việt Nam rất đa dạng và phong phú, nổi tiếng với các món như phở, bánh mì, bún chả và nhiều món khác nữa!';
        } else {
            return 'Xin lỗi, tôi không hiểu câu hỏi. Bạn có thể hỏi điều gì khác không?';
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
                <div className="flex flex-col w-80 h-96 bg-white rounded-lg shadow-xl overflow-hidden">
                    <div className="p-4 bg-pink-500 text-white font-medium flex justify-between items-center">
                        <span>Trợ Lý Tiếng Việt</span>
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

                    <form onSubmit={handleSubmit} className="border-t p-3 flex">
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