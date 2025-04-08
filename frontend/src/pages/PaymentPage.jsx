import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const PaymentPage = () => {
  const navigate = useNavigate();
  const [mobile, setMobile] = useState('');
  const [amount, setAmount] = useState('');

  const handlePayment = async () => {
    try {
      const res = await api.post("/create-payment", {
        userId: "user123", // You can customize this if needed
        mobile,
        amount: parseInt(amount)
      });
      //navigate("/checkout", { state: res.data });
      console.log(res)
      window.location.href = res.data.qrUrl;
    } catch (error) {
      console.error("Payment initiation failed:", error);
      alert("Failed to initiate payment. Please try again.");
    }
  };

  return (
    <div className="container text-center mt-5">
      <h2>Pay with PhonePe</h2>
      
      <div className="mb-3">
        <input
          type="text"
          className="form-control text-center"
          placeholder="Enter Mobile Number"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <input
          type="number"
          className="form-control text-center"
          placeholder="Enter Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      <button
        className="btn btn-primary"
        onClick={handlePayment}
        disabled={!mobile || !amount}
      >
        Pay ₹{amount || '___'}
      </button>
    </div>
  );
};

export default PaymentPage;
