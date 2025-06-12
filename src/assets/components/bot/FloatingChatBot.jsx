import React, {useState, useEffect, useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, X, Coffee, Minimize2, Maximize2, Eye, ShoppingCart, Sparkles, Send } from 'lucide-react';
import { mugs } from '../mug/MugList.jsx';

const FloatingChatbot = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, text: '👋 Chào bạn! Tôi là Muggie - trợ lý AI của shop. Hãy thử gõ "gợi ý" để xem cốc hot nhất!', isBot: true, hasActions: true }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [shouldRedirect, setShouldRedirect] = useState(false);
    const [redirectPath, setRedirectPath] = useState('');
    const [recommendedMug, setRecommendedMug] = useState(null);
    const [unreadCount, setUnreadCount] = useState(0);
    const messagesEndRef = useRef(null);
    const [showEmojis, setShowEmojis] = useState(false);

    const emojis = ['😊', '👍', '❤️', '🔥', '✨', '🎉', '☕', '💫'];

    // Auto-scroll to bottom
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Auto-open with delay
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsOpen(true);
            setUnreadCount(1);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    // Handle redirection
    useEffect(() => {
        if (shouldRedirect) {
            const timer = setTimeout(() => {
                console.log('Redirecting to:', redirectPath);
                navigate(redirectPath);
                setIsOpen(false);
                setRecommendedMug(null);
                setShouldRedirect(false);
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, [shouldRedirect, redirectPath, navigate]);

    // Clear unread count when opened
    useEffect(() => {
        if (isOpen) {
            setUnreadCount(0);
        }
    }, [isOpen]);

    const getRandomMug = () => {
        const randomIndex = Math.floor(Math.random() * mugs.length);
        return mugs[randomIndex];
    };

    const formatMugRecommendation = (mug) => {
        setRecommendedMug(mug);
        return `✨ **${mug.name}** - ${mug.price}VNĐ\n\n${mug.description}`;
    };

    const quickSuggestions = [
        { text: '🎯 Gợi ý cốc', icon: '🎯' },
        { text: '👀 Xem tất cả', icon: '👀' },
        { text: '🛒 Giỏ hàng', icon: '🛒' },
        { text: '🎁 Khuyến mãi', icon: '🎁' }
    ];

    const getResponse = (question) => {
        const lowerQuestion = question.toLowerCase();

        if (lowerQuestion.includes('gợi ý') || lowerQuestion.includes('đề xuất')) {
            const randomMug = getRandomMug();
            return formatMugRecommendation(randomMug);
        } else if (lowerQuestion === 'xem' && recommendedMug) {
            setShouldRedirect(true);
            setRedirectPath(`/mug/${recommendedMug.id}`);
            return `🚀 Đang chuyển đến "${recommendedMug.name}"...`;
        } else if (lowerQuestion.includes('gợi ý khác')) {
            const randomMug = getRandomMug();
            return formatMugRecommendation(randomMug);
        } else if (lowerQuestion.includes('xem tất cả') || lowerQuestion.includes('tất cả')) {
            setShouldRedirect(true);
            setRedirectPath('/mugs');
            return '🏪 Đang mở cửa hàng...';
        } else if (lowerQuestion.includes('giỏ hàng') || lowerQuestion.includes('thanh toán')) {
            setShouldRedirect(true);
            setRedirectPath('/cart');
            return '🛒 Đang mở giỏ hàng...';
        } else if (lowerQuestion.includes('khuyến mãi') || lowerQuestion.includes('giảm giá')) {
            return '🎉 **Flash Sale hôm nay!**\n\n🏷️ Giảm 15% tất cả cốc ceramic\n🎫 Mã: **MUGGY15**\n⏰ Còn lại: 23h 45p';
        } else if (lowerQuestion.includes('chào')) {
            return '👋 Chào bạn! Tôi có thể giúp bạn tìm cốc ưng ý. Bạn thích loại nào?';
        } else if (lowerQuestion.includes('cảm ơn')) {
            return '🥰 Không có gì! Tôi luôn sẵn sàng giúp bạn tìm cốc đẹp nhất!';
        } else if (lowerQuestion.includes('mua') && recommendedMug) {
            setShouldRedirect(true);
            setRedirectPath(`/mug/${recommendedMug.id}`);
            return `💳 Đang thêm "${recommendedMug.name}" vào giỏ...`;
        } else {
            return '🤔 Hmm, tôi chưa hiểu lắm. Thử hỏi về cốc, khuyến mãi, hoặc gõ "gợi ý" nhé!';
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = { id: Date.now(), text: input, isBot: false };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsTyping(true);

        setTimeout(() => {
            const response = getResponse(input);
            const botMessage = {
                id: Date.now() + 1,
                text: response,
                isBot: true,
                hasActions: recommendedMug !== null
            };
            setMessages(prev => [...prev, botMessage]);
            setIsTyping(false);
        }, 800);
    };

    const handleSuggestionClick = (suggestion) => {
        const cleanText = suggestion.text.replace(/[🎯👀🛒🎁]/gu, '').trim();
        setInput(cleanText);
        handleSubmit({ preventDefault: () => {} });
    };

    const handleEmojiClick = (emoji) => {
        setInput(prev => prev + emoji);
        setShowEmojis(false);
    };

    const ActionButtons = ({ mug }) => (
        <div className="flex gap-2 mt-2">
            <button
                onClick={() => {
                    navigate(`/mug/${mug.id}`);
                    setIsOpen(false);
                }}
                className="flex items-center gap-1 text-xs bg-blue-500 text-white px-2 py-1 rounded-full hover:bg-blue-600 transition-colors"
            >
                <Eye className="w-3 h-3" />
                Xem
            </button>
            <button
                onClick={() => {
                    // Add to cart logic here if you have it, then navigate to cart
                    navigate('/cart');
                    setIsOpen(false);
                }}
                className="flex items-center gap-1 text-xs bg-green-500 text-white px-2 py-1 rounded-full hover:bg-green-600 transition-colors"
            >
                <ShoppingCart className="w-3 h-3" />
                Mua
            </button>
            <button
                onClick={() => {
                    const newMug = getRandomMug();
                    setRecommendedMug(newMug);
                    const newMessage = {
                        id: Date.now(),
                        text: formatMugRecommendation(newMug),
                        isBot: true,
                        hasActions: true
                    };
                    setMessages(prev => [...prev, newMessage]);
                }}
                className="flex items-center gap-1 text-xs bg-purple-500 text-white px-2 py-1 rounded-full hover:bg-purple-600 transition-colors"
            >
                <Sparkles className="w-3 h-3" />
                Khác
            </button>
        </div>
    );

    return (
        <div className="fixed bottom-4 right-4 z-50">
            {/* Chat bubble with notification */}
            {!isOpen && (
                <div className="relative">
                    <button
                        onClick={() => setIsOpen(true)}
                        className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-full p-3 shadow-lg transition-all duration-300 transform hover:scale-110"
                    >
                        <MessageSquare className="w-5 h-5" />
                    </button>
                    {unreadCount > 0 && (
                        <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                            {unreadCount}
                        </div>
                    )}
                </div>
            )}

            {/* Compact Chat window */}
            {isOpen && (
                <div className={`flex flex-col bg-white rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 ${
                    isMinimized ? 'w-64 h-12' : 'w-72 h-96'
                }`}>
                    {/* Header */}
                    <div className="p-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white flex justify-between items-center">
                        <div className="flex items-center">
                            <div className="relative">
                                <Coffee className="w-4 h-4 mr-2" />
                                <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full"></div>
                            </div>
                            <span className="text-sm font-medium">Muggie AI</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <button
                                onClick={() => setIsMinimized(!isMinimized)}
                                className="text-white hover:text-pink-100 p-1"
                            >
                                {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                            </button>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-white hover:text-pink-100 p-1"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {!isMinimized && (
                        <>
                            {/* Messages */}
                            <div className="flex-1 p-3 overflow-y-auto bg-gradient-to-b from-pink-50 to-purple-50 text-sm">
                                {messages.map(message => (
                                    <div key={message.id} className={`mb-3 ${message.isBot ? 'flex justify-start' : 'flex justify-end'}`}>
                                        <div className={`max-w-[85%] p-2 rounded-2xl ${
                                            message.isBot
                                                ? 'bg-white shadow-sm text-gray-800 rounded-bl-sm'
                                                : 'bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-br-sm'
                                        }`}>
                                            <div className="whitespace-pre-line">{message.text}</div>
                                            {message.hasActions && recommendedMug && (
                                                <ActionButtons mug={recommendedMug} />
                                            )}
                                        </div>
                                    </div>
                                ))}
                                {isTyping && (
                                    <div className="flex justify-start mb-3">
                                        <div className="bg-white p-2 rounded-2xl rounded-bl-sm shadow-sm">
                                            <div className="flex space-x-1">
                                                <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce"></div>
                                                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-100"></div>
                                                <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce delay-200"></div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Quick suggestions */}
                            <div className="px-3 py-2 bg-white border-t">
                                <div className="flex flex-wrap gap-1">
                                    {quickSuggestions.map((suggestion, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handleSuggestionClick(suggestion)}
                                            className="text-xs bg-gradient-to-r from-pink-100 to-purple-100 border border-pink-200 text-pink-700 px-2 py-1 rounded-full hover:from-pink-200 hover:to-purple-200 transition-all duration-200 transform hover:scale-105"
                                        >
                                            {suggestion.text}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Input */}
                            <div className="p-2 flex items-center gap-2">
                                <div className="flex-1 relative">
                                    <input
                                        type="text"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && handleSubmit(e)}
                                        placeholder="Aa..."
                                        className="w-full border rounded-full px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400 pr-8"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowEmojis(!showEmojis)}
                                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-pink-500"
                                    >
                                        😊
                                    </button>
                                </div>
                                <button
                                    onClick={handleSubmit}
                                    className="bg-gradient-to-r from-pink-500 to-purple-600 text-white p-2 rounded-full hover:from-pink-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
                                >
                                    <Send className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Emoji picker */}
                            {showEmojis && (
                                <div className="absolute bottom-16 left-2 right-2 bg-white border rounded-lg p-2 shadow-lg">
                                    <div className="flex flex-wrap gap-1">
                                        {emojis.map((emoji, index) => (
                                            <button
                                                key={index}
                                                onClick={() => handleEmojiClick(emoji)}
                                                className="text-lg hover:bg-gray-100 p-1 rounded"
                                            >
                                                {emoji}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default FloatingChatbot;