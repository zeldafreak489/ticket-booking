import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase/firebase';
import { collection, query, where, getDocs, Timestamp } from 'firebase/firestore';
// import '../styles/ProfilePage.css';

function ProfilePage() {
  const user = auth.currentUser;
  const [accountAge, setAccountAge] = useState('');
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (user?.metadata?.creationTime) {
      const createdAt = new Date(user.metadata.creationTime);
      const now = new Date();
      const diffYears = now.getFullYear() - createdAt.getFullYear();
      const diffMonths = now.getMonth() - createdAt.getMonth();

      let ageText = '';
      if (diffYears > 0) {
        ageText = `${diffYears} year${diffYears > 1 ? 's' : ''}`;
        if (diffMonths > 0) {
          ageText += ` and ${diffMonths} month${diffMonths > 1 ? 's' : ''}`;
        }
      } else {
        ageText = `${diffMonths} month${diffMonths !== 1 ? 's' : ''}`;
      }

      setAccountAge(ageText);
    }
  }, [user]);

  useEffect(() => {
    const fetchBookings = async () => {
      if (!user) return;

      const bookingsRef = collection(db, 'bookings');
      const q = query(bookingsRef, where('userId', '==', user.uid));
      const querySnapshot = await getDocs(q);

      const bookingsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setBookings(bookingsList);
    };

    fetchBookings();
  }, [user]);

  return (
    <div className="profile-container">
      <h2>Your Profile</h2>
      <div className="profile-card">
        <p><strong>Name:</strong> {user?.displayName || 'Anonymous'}</p>
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>Member Since:</strong> {accountAge}</p>

        <h3>Your Bookings</h3>
        {bookings.length === 0 ? (
          <p>No bookings yet.</p>
        ) : (
          <ul className="booking-list">
            {bookings.map((booking) => (
              <li key={booking.id} className="booking-item">
                <p><strong>Event:</strong> {booking.eventTitle}</p>
                <p><strong>Tickets:</strong> {booking.items?.reduce((acc, item) => acc + item.quantity, 0)}</p>
                <p><strong>Total Paid:</strong> ${booking.totalPrice}</p>
                <p><strong>Date:</strong> {booking.createdAt?.toDate().toLocaleDateString()}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;
