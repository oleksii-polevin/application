const { Router } = require('express');
const JwtComponent = require('./jwt');

/**
 * Express router to mount user related functions on.
 * @type {Express.Router}
 * @const
 */
const router = Router();

router.get('/token', JwtComponent.updateToken);

router.get('/logout', JwtComponent.deleteToken);

module.exports = router;
