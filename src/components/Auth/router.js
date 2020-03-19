const { Router } = require('express');
const AuthComponent = require('./auth');

/**
 * Express router to mount user related functions on.
 * @type {Express.Router}
 * @const
 */
const router = Router();

router.get('/token', AuthComponent.updateToken);

router.get('/logout', AuthComponent.deleteToken);

router.get('/login/:email', AuthComponent.getNewToken);


module.exports = router;
