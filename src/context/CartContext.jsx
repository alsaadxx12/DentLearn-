import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
    const [items, setItems] = useState([]);

    const addToCart = (course) => {
        setItems(prev => {
            const exists = prev.find(item => item.id === course.id);
            if (exists) return prev;
            return [...prev, { ...course, quantity: 1 }];
        });
    };

    const removeFromCart = (courseId) => {
        setItems(prev => prev.filter(item => item.id !== courseId));
    };

    const isInCart = (courseId) => items.some(item => item.id === courseId);

    const getTotal = () => items.reduce((sum, item) => sum + item.price, 0);

    const clearCart = () => setItems([]);

    const cartCount = items.length;

    return (
        <CartContext.Provider value={{ items, addToCart, removeFromCart, isInCart, getTotal, clearCart, cartCount }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => useContext(CartContext);
