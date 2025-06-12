import React, { useState } from 'react';
import { X, Star, MessageSquare } from 'lucide-react';

export default function RatingModal({ product, isOpen, onClose, onSubmit }) {
    const [rating, setRating] = useState(0);
    const [hoveredRating, setHoveredRating] = useState(0);
    const [comment, setComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (rating === 0) return;

        setIsSubmitting(true);
        try {
            await onSubmit({
                productId: product.id,
                rating,
                comment: comment.trim(),
                productName: product.name
            });

            // Reset form
            setRating(0);
            setHoveredRating(0);
            setComment('');
            onClose();
        } catch (error) {
            console.error('Error submitting rating:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const renderStars = () => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <button
                    key={i}
                    type="button"
                    className={`w-8 h-8 transition-colors ${
                        i <= (hoveredRating || rating)
                            ? 'text-yellow-400'
                            : 'text-gray-300'
                    }`}
                    onMouseEnter={() => setHoveredRating(i)}
                    onMouseLeave={() => setHoveredRating(0)}
                    onClick={() => setRating(i)}
                >
                    <Star className="w-8 h-8 fill-current" />
                </button>
            );
        }
        return stars;
    };

    const getRatingText = (rating) => {
        const texts = {
            1: 'Rất tệ',
            2: 'Tệ',
            3: 'Bình thường',
            4: 'Tốt',
            5: 'Rất tốt'
        };
        return texts[rating] || '';
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold text-gray-900">Đánh giá sản phẩm</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    <div className="flex items-center gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                            <h3 className="font-medium text-gray-900">{product.name}</h3>
                            <p className="text-sm text-gray-500">
                                {product.price.toLocaleString()} VND
                            </p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-3">
                                Đánh giá của bạn *
                            </label>
                            <div className="flex items-center gap-1 mb-2">
                                {renderStars()}
                            </div>
                            {(hoveredRating || rating) > 0 && (
                                <p className="text-sm text-gray-600">
                                    {getRatingText(hoveredRating || rating)}
                                </p>
                            )}
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                <MessageSquare className="w-4 h-4 inline mr-1" />
                                Nhận xét (tùy chọn)
                            </label>
                            <textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder="Chia sẻ trải nghiệm của bạn về sản phẩm này..."
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                rows={4}
                                maxLength={500}
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                {comment.length}/500 ký tự
                            </p>
                        </div>

                        <div className="flex gap-3">
                            <button
                                type="button"
                                onClick={onClose}
                                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Hủy
                            </button>
                            <button
                                type="submit"
                                disabled={rating === 0 || isSubmitting}
                                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                            >
                                {isSubmitting ? 'Đang gửi...' : 'Gửi đánh giá'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}