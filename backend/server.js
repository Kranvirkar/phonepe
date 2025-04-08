const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const paymentRoutes = require("./routes/paymentRoutes");
const connectDB = require("./config/dbConfig");
const mongoose = require("mongoose");
const webhookRoutes = require("./routes/webhookRoutes");
const { port } = require("./config/phonepeConfig");

dotenv.config();
const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use("/webhook", webhookRoutes);

app.use("/api", paymentRoutes);

app.listen(port, () => {
    console.log(`✅ Server running on http://localhost:${port}`);
});
