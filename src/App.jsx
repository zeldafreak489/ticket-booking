import { useState } from 'react';

// style import
import './styles/main.css';

// router import
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// page imports
import HomePage from "./pages/HomePage";
import Header from "./pages/Header";
import Footer from "./pages/Footer";
import EventDetailsPage from "./pages/EventDetailsPage";
import CartPage from "./pages/CartPage";
import BookingConfirmationPage from "./pages/BookingConfirmationPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ProfilePage from "./pages/ProfilePage";
// import ProtectedRoute from "./routes/ProtectedRoute";

import { CartProvider } from './contexts/CartContext';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Header />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/event/:eventId" element={<EventDetailsPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/success" element={
                  <BookingConfirmationPage />
              } />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/profile" element={
                  <ProfilePage />
              } />
            </Routes>
          <Footer />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
