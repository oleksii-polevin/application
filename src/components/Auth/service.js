const AuthModel = require('./model');

/**
 * @exports
 * @method create
 * @param {object} profile
 * @summary create a new user
 * @returns {Promise<UserModel>}
 */
function create(profile) {
    return AuthModel.create(profile);
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
function updateById(userId, newTokens) {
    return AuthModel.updateOne({ userId }, newTokens).exec();
}

function updateByEmail(email, newTokens) {
    return AuthModel.updateOne({ email }, newTokens).exec();
}

function findByEmail(email) {
    return AuthModel.findOne({ email });
}

/**
 * @exports
 * @method deleteById
 * @param {string} userId
 * @summary delete a user from database
 * @returns {Promise<void>}
 */
function deleteById(userId) {
    return AuthModel.deleteOne({ userId }).exec();
}

function findToken(userId) {
    return AuthModel.findOne({ userId });
}

module.exports = {
    create,
    updateById,
    deleteById,
    findToken,
    updateByEmail,
    findByEmail,
};
