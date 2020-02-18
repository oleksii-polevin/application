const Joi = require('@hapi/joi');

/**
 * Joi schema for email validation
 * @type {Joi.object}
 * @const
 */
const emailSchema = Joi.string().email();

/**
 * Joi schema for user validation
 * @type {Joi.object}
 * @const
 */
const fullSchema = Joi.object({
    email: Joi.string().email(),
    fullName: Joi.string().pattern(new RegExp(/\w{2,20}\s\w{2,20}/))
});

/**
 * @function
 * @param {object} user - Json object with user email and full name
 * @returns user validation result
 */
const fullValidation = (user) => {
    return fullSchema.validate(user);
};

/**
 * @function
 * @param {string} email - User email
 * @returns email validation result
 */
const emailValidation = (email) => {
    return emailSchema.validate(email);
};

module.exports = {
    emailValidation,
    fullValidation
};
