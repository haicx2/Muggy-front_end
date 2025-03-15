import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, X } from 'lucide-react';

export default function Notification({
                                         message,
                                         type = 'success', // 'success' or 'error'
                                         duration = 3000,
                                         onClose = () => {},
                                         isVisible = false
                                     }) {
    const [visible, setVisible] = useState(isVisible);

    useEffect(() => {
        setVisible(isVisible);

        let timer;
        if (isVisible && duration) {
            timer = setTimeout(() => {
                setVisible(false);
                onClose();
            }, duration);
        }

        return () => {
            if (timer) clearTimeout(timer);
        };
    }, [isVisible, duration, onClose]);

    const handleClose = () => {
        setVisible(false);
        onClose();
    };

    if (!visible) return null;

    return (
        <div className="fixed top-4 right-4 z-50 animate-fade-in">
            <div
                className={`
          flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg
          ${type === 'success' ? 'bg-green-100 text-green-800 border-l-4 border-green-500' :
                    'bg-red-100 text-red-800 border-l-4 border-red-500'}
        `}
            >
                {type === 'success' ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                ) : (
                    <XCircle className="w-5 h-5 text-red-500" />
                )}

                <p className="flex-1 text-sm font-medium">{message}</p>

                <button
                    onClick={handleClose}
                    className="text-gray-500 hover:text-gray-700"
                >
                    <X className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}