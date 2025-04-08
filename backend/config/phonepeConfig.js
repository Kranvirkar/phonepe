require("dotenv").config();

module.exports = {
    port: process.env.PORT || 3001,
    merchantId: process.env.PHONEPe_MERCHANT_ID,
    saltKey: process.env.PHONEPe_SALT_KEY ,
    saltIndex: process.env.PHONEPe_SALT_INDEX ,
    baseUrl: process.env.PHONEPe_BASE_URL ,
    appBeUrl: process.env.APP_BE_URL,
    //peEndPath: process.env.PE_END_POINT,
};
