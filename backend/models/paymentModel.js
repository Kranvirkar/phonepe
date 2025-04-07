const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
    transactionId: String,
    status: String,
    payload: Object,
    source: String, // "client" or "webhook"
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Payment", paymentSchema);
