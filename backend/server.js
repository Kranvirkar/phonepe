const express = require("express");
const cors = require("cors");
const paymentRoutes = require("./routes/paymentRoutes");
const mongoose = require("mongoose");
const webhookRoutes = require("./routes/webhookRoutes");
const { port } = require("./config/phonepeConfig");

const app = express();
app.use(cors());
app.use(express.json());

mongoose
    .connect("mongodb+srv://kiranranvirkar:jS36af1XhhhmnOgl@cluster0.1lciipc.mongodb.net/phonepe-payments", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("✅ MongoDB connected"))
    .catch((err) => console.error("MongoDB error:", err));

app.use("/webhook", webhookRoutes);

app.use("/api", paymentRoutes);

app.listen(port, () => {
    console.log(`✅ Server running on http://localhost:${port}`);
});
