const express = require("express");
const router = express.Router();
const { handlePhonePeWebhook } = require("../controllers/webhookController");

router.post("/phonepe", handlePhonePeWebhook);

module.exports = router;
