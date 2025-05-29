import React, { useEffect, useState } from 'react';
import { Flower2, Heart, Cloud } from 'lucide-react';
import './CuteBackground.css';

const CuteBackground = () => {
    const [elements, setElements] = useState([]);

    useEffect(() => {
        const createElements = () => {
            const newElements = [];
            const icons = [
                { Icon: Flower2, color: 'text-pink-400' },
                { Icon: Heart, color: 'text-pink-300' },
                { Icon: Cloud, color: 'text-pink-200' }
            ];

            for (let i = 0; i < 12; i++) {
                const { Icon, color } = icons[Math.floor(Math.random() * icons.length)];
                newElements.push({
                    Icon,
                    style: {
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        transform: `scale(${0.5 + Math.random()})`,
                        animationDelay: `-${Math.random() * 20}s`,
                    },
                    color,
                    key: `element-${i}`
                });
            }
            setElements(newElements);
        };

        createElements();
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-0">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-50/50 via-white/50 to-pink-50/50" />
            <div className="absolute inset-0 pattern-grid" />
            {elements.map((element, index) => (
                <element.Icon
                    key={element.key}
                    className={`floating-element ${element.color}`}
                    style={element.style}
                />
            ))}
        </div>
    );
};

export default CuteBackground;