import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Load cart from localStorage or initialize as empty
  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  });

  // Whenever the cartItems change, update localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (event, quantity = 1) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === event.id);
      if (existing) {
        return prev.map(item =>
          item.id === event.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        return [...prev, { ...event, quantity }];
      }
    });
  };

  const updateQuantity = (eventId, newQty) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === eventId ? { ...item, quantity: newQty } : item
      )
    );
  };

  const removeFromCart = (eventId) => {
    setCartItems(prev => prev.filter(item => item.id !== eventId));
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity, 0
  );

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cart');
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, updateQuantity, removeFromCart, totalPrice, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
