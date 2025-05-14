import React from 'react';
import './CartItemCard.css';

const CartItemCard = ({ item, onAdd, onRemove, onDelete }) => {
  return (
    <div className="cart-item-card">
      <img
        src={item.thumbnail}
        alt={item.title}
        className="cart-item-image"
      />
      <div className="cart-item-content">
        <h3>{item.title}</h3>
        <p>Quantity: {item.quantity}</p>
        <p>Price: ${item.price * item.quantity}</p>
        <div className="cart-item-actions">
          <button onClick={onAdd}>+</button>
          <button onClick={onRemove}>-</button>
          <button onClick={onDelete}>Remove</button>
        </div>
      </div>
    </div>
  );
};

export default CartItemCard;
