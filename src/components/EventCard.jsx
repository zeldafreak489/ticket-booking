import React from 'react';
import './EventCard.css';
import { Link } from 'react-router-dom';

const EventCard = ({ event }) => {
  return (
    <div className="event-card">
      <img src={event.thumbnail} alt={event.title} />
      <div className="event-card-body">
        <h2 className="event-title">{event.title}</h2>
        <p className="event-date">{event.date}</p>
        <p className="event-location">{event.location}</p>
        <p className="event-description">{event.description}</p>
        <p className="event-price">${event.price}</p>
        <Link to={`/event/${event.id}`}>
          <div className='event-button'>
            <button className="details-button">Event Details</button>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default EventCard;
