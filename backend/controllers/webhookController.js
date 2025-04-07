const Payment = require("../models/paymentModel");

const handlePhonePeWebhook = async (req, res) => {
    try {
        const data = req.body;

        // Save webhook data to MongoDB
        await Payment.create({
            transactionId: data.transactionId,
            status: data.code,
            payload: data,
            source: "webhook",
        });

        res.status(200).send("Webhook received");
    } catch (err) {
        console.error("Webhook error:", err.message);
        res.status(500).send("Error processing webhook");
    }
};

module.exports = { handlePhonePeWebhook };
