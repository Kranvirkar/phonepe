const axios = require("axios");
const sha256 = require("sha256");
const { merchantId, baseUrl, saltKey, appBeUrl, saltIndex} = require("../config/phonepeConfig");
const uniqid = require("uniqid");
const { encodePayload, createSignature } = require("../utils/phonepeHelper");

const apiPath = "/pg/v1/pay";

const createPayment = async (req, res) => {
    const { amount, mobileNumber = "9999999999" } = req.body;

    let userId = "MUID123";

    // Generate a unique merchant transaction ID for each transaction
    let merchantTransactionId = uniqid();

    // redirect url => phonePe will redirect the user to this url once payment is completed. It will be a GET request, since redirectMode is "REDIRECT"
    let normalPayLoad = {
        merchantId: merchantId, //* PHONEPE_MERCHANT_ID . Unique for each account (private)
        merchantTransactionId: merchantTransactionId,
        merchantUserId: userId,
        amount: amount * 100, // converting to paise
        redirectUrl: `${appBeUrl}/payment/validate/${merchantTransactionId}`,
        redirectMode: "REDIRECT",
        mobileNumber: mobileNumber,
        paymentInstrument: {
            type: "PAY_PAGE",
        },
    };

    // make base64 encoded payload
    let bufferObj = Buffer.from(JSON.stringify(normalPayLoad), "utf8");
    let base64EncodedPayload = bufferObj.toString("base64");

    //console.log("base64EncodedPayload "+base64EncodedPayload)

    // X-VERIFY => SHA256(base64EncodedPayload + "/pg/v1/pay" + SALT_KEY) + ### + SALT_INDEX
    let string = base64EncodedPayload + "/pg/v1/pay" + saltKey;
    let sha256_val = sha256(string);
    let xVerifyChecksum = sha256_val + "###" + saltIndex;
    //console.log("xVerifyChecksum "+xVerifyChecksum);
    axios
        .post(
            `${baseUrl}/pg/v1/pay`,
            {
                request: base64EncodedPayload,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "X-VERIFY": xVerifyChecksum,
                    accept: "application/json",
                },
            }
        )
        .then(function (response) {
            console.log("response->", JSON.stringify(response.data));
            res.redirect(response.data.data.instrumentResponse.redirectInfo.url);
        })
        .catch(function (error) {
            console.error("Payment Error:", error.response?.data || error.message);
            res.status(500).json({
                success: false,
                message: "Payment creation failed",
                error: error.response?.data || error.message,
            });
        });
};

module.exports = { createPayment };
