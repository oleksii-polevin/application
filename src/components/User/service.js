const UserModel = require('./model');

/**
 * @exports
 * @method findAll
 * @param {}
 * @summary get list of all users
 * @returns {Promise<UserModel[]>}
 */
function findAll() {
    return UserModel.find({}).exec();
}

/**
 * @exports
 * @method findById
 * @param {string} id
 * @summary get a user
 * @returns {Promise<UserModel>}
 */
function findById(userId) {
    return UserModel.findOne({ _id: userId }).exec();
}


/**
 * @exports
 * @method create
 * @param {object} profile
 * @summary create a new user
 * @returns {Promise<UserModel>}
 */
function create(profile) {
    return UserModel.create(profile);
}

/**
 * Find a user by id and update his profile
 * @exports
 * @method updateById
 * @param {string} _id
 * @param {object} newProfile
 * @summary update a user's profile via _id key
 * @returns {Promise<void>}
 */
function updateById(_id, newProfile) {
    return UserModel.updateOne({ _id }, newProfile).exec();
}

/**
 * Find a user by id and update his profile
 * @exports
 * @method findByEmail
 * @param {string} email User's email
 * @summary update a user's profile using email as a key
 * @returns {Promise<void>}
 */
function findByEmail(email) {
    return UserModel.findOne({ email });
}

/**
 * @exports
 * @method deleteById
 * @param {string} _id
 * @summary delete a user from database
 * @returns {Promise<void>}
 */
function deleteById(userId) {
    return UserModel.deleteOne({ _id: userId }).exec();
}

module.exports = {
    findAll,
    findById,
    findByEmail,
    create,
    updateById,
    deleteById,
};
