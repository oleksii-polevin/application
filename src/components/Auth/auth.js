require('dotenv').config();
const jwt = require('jsonwebtoken');
const AuthService = require('./service');

/**
 * Creates jwt tokens for users
 * @function
 * @param {String} userId User's _id from users database
 * @param {String} email  User's email
 */
function createTokens(userId, email) {
    const accessToken = jwt.sign({
        userId,
        email,
    }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRE });
    const refreshToken = jwt.sign({
        userId,
    }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRE });
    return {
        accessToken,
        refreshToken,
    };
}
/**
 * Obtain new tokens
 * @param {*} userId
 * @param {*} email
 * @param {*} newUser
 */
async function getToken(userId, email) {
    let result;
    try {
        const { accessToken, refreshToken } = createTokens(userId, email);
        result = await AuthService.create({
            userId, email, accessToken, refreshToken,
        });
    } catch (error) {
        return error;
    }
    return result;
}

async function getNewToken(req, res, next) {
    let result;
    try {
        const { email } = req.params;
        const search = await AuthService.findByEmail(email);
        if (search === null) {
            throw new Error('user not found');
        }
        const { userId } = search;
        const { accessToken, refreshToken } = createTokens(userId, email);
        await AuthService.updateById(userId, { accessToken, refreshToken });
        result = { accessToken, refreshToken };
        return res.status(200).json(result);
    } catch (error) {
        res.status(401).json({
            message: error.name,
            details: error.message,
        });
        return next(error);
    }
}

function verifyUser(token) {
    let error;
    let userId;
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            error = err;
        } else {
            userId = decoded.userId;
        }
    });
    return {
        error,
        userId,
    };
}

// just for testing purposes
async function findToken(userId) {
    const access = await AuthService.findToken(userId);
    return access;
}

async function updateToken(req, res, next) {
    try {
        const token = req.headers.authorization;

        const { error, userId, email } = verifyUser(token);
        if (error) throw error;

        const dbRefreshToken = await findToken(userId);
        if (dbRefreshToken.refreshToken !== token && dbRefreshToken.refreshToken !== 'null') {
            return res.status(401).json({
                message: 'Autentification needed',
                details: dbRefreshToken,
            });
        }

        const newTokens = createTokens(userId, email);
        await AuthService.updateById(userId, newTokens);

        return res.status(200).send(newTokens);
    } catch (error) {
        res.status(401).json({
            message: error.name,
            details: error.message,
        });
        return next(error);
    }
}

async function deleteToken(req, res, next) {
    try {
        const token = req.headers.authorization;

        const { error, userId } = verifyUser(token);
        console.log(userId);
        if (error) throw error;
        const result = await AuthService.updateById(userId, { refreshToken: null });
        return res.json(result);
    } catch (error) {
        res.status(401).json({
            message: error.name,
            details: error.message,
        });
        return next(error);
    }
}

async function deleteUser(userId) {
    const result = await AuthService.deleteById(userId);
    return result;
}

module.exports = {
    getToken,
    verifyUser,
    updateToken,
    findToken,
    deleteToken,
    deleteUser,
    getNewToken,
};
