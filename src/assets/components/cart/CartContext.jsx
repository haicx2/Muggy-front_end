import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext(undefined);

export function CartProvider({ children }) {
    const [items, setItems] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    const [selectedPackage, setSelectedPackage] = useState(() => {
        const savedPackage = localStorage.getItem('package');
        return savedPackage ? JSON.parse(savedPackage) : null;
    });

    const clearCart = () => {
        setItems([]);
        setSelectedPackage(null);
    };

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(items));
    }, [items]);

    useEffect(() => {
        localStorage.setItem('package', JSON.stringify(selectedPackage));
    }, [selectedPackage]);

    const addToCart = (item) => {
        setItems(currentItems => {
            const existingItem = currentItems.find(i => i.id === item.id);
            if (existingItem) {
                return currentItems.map(i =>
                    i.id === item.id ? { ...i, quantity: i.quantity + (item.quantity || 1) } : i
                );
            }
            return [...currentItems, { ...item, quantity: item.quantity || 1 }];
        });
    };

    const removeFromCart = (id) => {
        setItems(items => items.filter(item => item.id !== id));
    };

    const updateQuantity = (id, quantity) => {
        if (quantity < 1) return;
        setItems(items =>
            items.map(item =>
                item.id === id ? { ...item, quantity } : item
            )
        );
    };

    const selectPackage = (packageOption) => {
        setSelectedPackage(packageOption);
    };

    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const packageCost = selectedPackage ? selectedPackage.price : 0;
    const total = subtotal + packageCost;
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <CartContext.Provider value={{
            items,
            addToCart,
            removeFromCart,
            updateQuantity,
            subtotal,
            total,
            itemCount,
            selectedPackage,
            selectPackage,
            packageCost,
            clearCart,
        }}>
            {children}
        </CartContext.Provider>
    );
}

export default function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}