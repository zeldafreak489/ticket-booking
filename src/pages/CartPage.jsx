import React from 'react';
import { useCart } from '../contexts/CartContext';
import CartItemCard from '../components/CartItemCard';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase/firebase';
import { db } from '../firebase/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import '../styles/CartPage.css';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const handleCheckout = async () => {
    const user = auth.currentUser;

    // User is not logged in, reroute to login page
    if (!user) {
        alert("Please log in to complete your booking.");
        navigate("/login");
        return;
    }

    // Add cart info to bookings in firebase
    try {
        await addDoc(collection(db, "bookings"), {
            userId: user.uid,
            items: cartItems,
            total: totalPrice,
            createdAt: serverTimestamp()
        });

        clearCart();
        navigate("/success");
    } catch (error) {
        console.error("Error during checkout: ", error);
        alert("Something went wrong during checkout.");
    }
  };

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-list">
            {cartItems.map((item) => (
              <CartItemCard
                key={item.id}
                item={item}
                onAdd={() => updateQuantity(item.id, item.quantity + 1)}
                onRemove={() =>
                  item.quantity > 1
                    ? updateQuantity(item.id, item.quantity - 1)
                    : removeFromCart(item.id)
                }
                onDelete={() => removeFromCart(item.id)}
              />
            ))}
          </div>
          <h3>Total Price: ${totalPrice.toFixed(2)}</h3>

          {/* Checkout Button */}
          <button className="checkout-button" onClick={handleCheckout}>
            Checkout
          </button>
        </>
      )}
    </div>
  );
};

export default CartPage;
