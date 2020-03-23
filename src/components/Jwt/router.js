const { Router } = require('express');
const JwtComponent = require('./jwt');

/**
 * Express router to mount user related functions on.
 * @type {Express.Router}
 * @const
 */
const router = Router();

/**
 * Route for obtaining new tokens
 * @name /v1/jwt
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
router.get('/token', JwtComponent.updateToken);

/**
 * Route for logout
 * @name /v1/jwt
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
router.get('/logout', JwtComponent.deleteToken);

module.exports = router;
