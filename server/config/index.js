require("dotenv").config();

export default {
    jwt_details: {
        secret: process.env.JWT_SECRET
    }
};