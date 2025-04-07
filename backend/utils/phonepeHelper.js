const crypto = require("crypto");
const sha256 = require("sha256");
const { saltKey, saltIndex } = require("../config/phonepeConfig");

function createSignature(base64Payload, apiPath) {
    let str = base64Payload + apiPath + saltKey;
    let sha256_val = sha256(str);
    return sha256_val + "###" + saltIndex;
}

function encodePayload(payload) {
    let bufferObj = Buffer.from(JSON.stringify(payload), "utf8");
    return bufferObj.toString("base64");
}

module.exports = {
    createSignature,
    encodePayload,
};
