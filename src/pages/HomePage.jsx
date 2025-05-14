import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import events from '../data/data';
import EventCard from '../components/EventCard';

function HomePage() {
  const [event, setEvent] = useState(events);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSort = (direction) => {
    const sorted = [...event].sort((a, b) => {
      return direction === 'asc' ? a.price - b.price : b.price - a.price;
    });
    setEvent(sorted);
  };

  const filteredEvents = event.filter((event2) => 
    event2.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="events-container">
      <div className='search-sort'>
        {/* Search Bar for Events */}
        <div className='search-bar'>
          <input 
            type="text"
            placeholder='Search by title...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{padding: '0.5rem', fontSize: '1rem', flexGrow: 1}}
          />
        </div>

        {/* Sort Buttons by Price */}
        <div className='sort-buttons'>
          <button onClick={() => handleSort('asc')}>Sort by Price: Low to High</button>
          <button onClick={() => handleSort('desc')}>Sort by Price: High to Low</button>
        </div>
      </div>

      {/* List of Events */}
      <div className='event-list'>
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event1) => (
            <EventCard key={event1.id} event={event1} />
          ))
        ) : (
          <p>No events found.</p>
        )}
      </div>
    </div>
  );
}

export default HomePage;
