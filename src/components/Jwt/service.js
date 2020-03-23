const JwtModel = require('./model');

/**
 * @exports
 * @method create
 * @param {object} profile
 * @summary create a new user
 * @returns {Promise<UserModel>}
 */
function create(profile) {
    return JwtModel.create(profile);
}

/**
 * Find a user by id and update his profile
 * @exports
 * @method updateById
 * @param {string} userId
 * @param {object} newTokens
 * @summary update a user's tokens
 * @returns {Promise<void>}
 */
function updateById(userId, newToken) {
    return JwtModel.updateOne({ userId }, newToken).exec();
}

/**
 * @exports
 * @method deleteById
 * @param {string} userId
 * @summary delete a user from database
 * @returns {Promise<void>}
 */
function deleteById(userId) {
    return JwtModel.deleteOne({ userId }).exec();
}

function findToken(userId) {
    return JwtModel.findOne({ userId });
}

module.exports = {
    create,
    updateById,
    deleteById,
    findToken,
};
