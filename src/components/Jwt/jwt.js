require('dotenv').config();
const jwt = require('jsonwebtoken');
const JwtServices = require('./service');

/**
 * Creates jwt tokens for users
 * @function
 * @param {String} userId User's _id from users database
 */
function createTokens(userId) {
    const accessToken = jwt.sign({
        userId,
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
 * Obtains new tokens for both new users and re-logined users
 * @param {String} userId
 * @param {String} email
 * @param {Boolean} newUser false for re-logined users
 */
async function getToken(userId, newUser = true) {
    const { accessToken, refreshToken } = createTokens(userId);
    try {
        if (newUser) { // creating new db document
            await JwtServices.create({
                userId, refreshToken,
            });
        } else { // updating db document
            await JwtServices.updateById(userId, { refreshToken });
        }
    } catch (error) {
        return error;
    }
    return { accessToken, refreshToken };
}

/**
 * Obtain information from jwt token
 * @function
 * @param {String} token Json web token
 */
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

/**
 * Obtaining refresh token by user's id
 * @function
 * @param {String} userId User's id
 */
async function findToken(userId) {
    const refresh = await JwtServices.findToken(userId);
    return refresh;
}

/**
 * Update user's tokens
 * Each user has own refresh token, stored in database along with user's Id
 * @param {Express.request} req
 * @param {Express.response} res
 * @param {Express.NextFunction} next
 */
async function updateToken(req, res, next) {
    try {
        const token = req.headers.authorization;

        const { error, userId } = await verifyUser(token);
        if (error) throw error;

        const dbRefreshToken = await findToken(userId);

        if (dbRefreshToken.refreshToken !== token || dbRefreshToken.refreshToken === 'null') {
            return res.status(403).json({
                message: 'Autentification needed',
                details: null,
            });
        }
        const newTokens = createTokens(userId);
        const result = await JwtServices.updateById(userId,
            { refreshToken: newTokens.refreshToken });

        if (result.nModified === 1) {
            return res.status(200).json(newTokens);
        } return res.status(500).json({ message: 'Something went wrong' });
    } catch (error) {
        res.status(401).json({
            message: error.name,
            details: error.message,
        });
        return next(error);
    }
}

/**
 * Deletes user's tokens
 * @param {Express.request} req
 * @param {Express.response} res
 * @param {Express.NextFunction} next
 */
async function deleteToken(req, res, next) {
    try {
        const token = req.headers.authorization;

        const { error, userId } = verifyUser(token);
        if (error) throw error;
        const result = await JwtServices.updateById(userId, { refreshToken: null });
        return res.json(result);
    } catch (error) {
        res.status(401).json({
            message: error.name,
            details: error.message,
        });
        return next(error);
    }
}

/**
 * Deletes user from database
 * @param {String} userId
 */
async function deleteUser(userId) {
    const result = await JwtServices.deleteById(userId);
    return result;
}

module.exports = {
    getToken,
    verifyUser,
    updateToken,
    findToken,
    deleteToken,
    deleteUser,
};
