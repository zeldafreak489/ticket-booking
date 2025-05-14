import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import events from '../data/data';
import '../styles/EventDetailsPage.css';
import { useCart } from '../contexts/CartContext';

function EventDetailsPage() {
  const { eventId } = useParams(); // Get the event ID from the URL
  const [event, setEvent] = useState(null);

  const { addToCart } = useCart();

  useEffect(() => {
    // Find the event by ID from events data
    const foundEvent = events.find((e) => e.id === parseInt(eventId));
    setEvent(foundEvent);
  }, [eventId]);

  if (!event) return <p>Loading...</p>;

  return (
    <div className="event-details-container">

        {/* Event Information */}
        <div className='event-info'>
            <h2>{event.title}</h2>
            <img src={event.thumbnail} alt={event.title} className='event-thumbnail'/>
            <p>{event.description}</p>
            <p><strong>Date: {event.date}</strong></p>
            <p><strong>Location: {event.location}</strong></p>
            <p><strong>Price: ${event.price}</strong></p>
        </div>
      
        {/* Event Map Using Google Maps */}
        <div className='event-map'>
            <div style={{ marginTop: '1rem' }}>
                <iframe
                    title="Event Location"
                    src={`https://www.google.com/maps?q=${encodeURIComponent(event.location)}&output=embed`}
                    width="100%"
                    height="300"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                ></iframe>
            </div>
        </div>

        {/* Add to Cart Button */}
        <div className="add-to-cart-container">
            <button
              onClick={() => addToCart(event)}
              className="add-to-cart-button"
            >
              Add to Cart
            </button>
        </div>
    </div>
  );
};

export default EventDetailsPage;