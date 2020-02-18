const { Router } = require('express');
const UserComponent = require('../User');

/**
 * Express router to mount user related functions on.
 * @type {Express.Router}
 * @const
 */
const router = Router();

/**
 * Route serving list of users.
 * @name /v1/users
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get('/', UserComponent.findAll);

/**
 * Route serve search of selected user.
 * @name /v1/users/find
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get('/find', UserComponent.findUser);

/**
 * Route serving new users.
 * @name /v1/users/create
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.post('/create', UserComponent.createUser);

/**
 * Route for deleting user.
 * @name /v1/users/delete
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.delete('/delete', UserComponent.deleteUser);

/**
 * Route for updating user.
 * @name /v1/users
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.put('/update', UserComponent.updateUser);

module.exports = router;
