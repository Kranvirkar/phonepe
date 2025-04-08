import React from 'react';
import { useLocation } from 'react-router-dom';

const CheckoutPage = () => {
  const { state } = useLocation();
  return (
    <div className="container text-center mt-5">
      <h3>Scan QR to Pay</h3>
      <img src={state.qrUrl} alt="QR Code" width={200} />
      <p>Amount: ₹{state.amount / 100}</p>
      <p>Mobile No: {state.mobileNumber}</p>
    </div>
  );
};

export default CheckoutPage;
