const { Schema } = require('mongoose');
const connections = require('../../config/connection')('token_db');

const AuthSchema = new Schema(
    {
        userId: {
            type: String,
            trim: true,
            requred: true,
        },
        email: {
            type: String,
            requred: true,
        },
        accessToken: {
            type: String,
            required: true,
        },
        refreshToken: {
            type: String,
            required: true,
        },
    },
    {
        collection: 'authmodel',
        versionKey: false,
    },
);

module.exports = connections.model('AuthModel', AuthSchema);
