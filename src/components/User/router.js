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
router.get('/find', UserComponent.findUser);
router.post('/create', UserComponent.createUser);
router.delete('/delete', UserComponent.deleteUser);
router.put('/update', UserComponent.updateUser);

module.exports = router;
