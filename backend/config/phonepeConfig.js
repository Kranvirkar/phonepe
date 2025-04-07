require("dotenv").config();

module.exports = {
    port: process.env.PORT || 3001,
    merchantId: process.env.MERCHANT_ID,
    saltKey: process.env.SALT_KEY ,
    saltIndex: process.env.SALT_INDEX ,
    baseUrl: process.env.BASE_URL ,
    appBeUrl: process.env.APP_BE_URL,
    peEndPath: process.env.PE_END_POINT,
};
