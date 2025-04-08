import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PaymentPage from './pages/PaymentPage';
import CheckoutPage from './pages/CheckoutPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PaymentPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Routes>
    </Router>
  );
}

export default App;
