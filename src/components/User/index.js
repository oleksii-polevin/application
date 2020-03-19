const UserService = require('./service');
const UserValidation = require('./validation');
const ValidationError = require('../../error/ValidationError');
const UserAuth = require('../Auth/auth.js');


/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function findAll(req, res, next) {
    try {
        const users = await UserService.findAll();

        res.render('index', {
            data: users,
            csrfToken: req.csrfToken(),
        });
    } catch (error) {
        res.status(500).render('500', {
            error: error.message,
            details: null,
        });

        next(error);
    }
}

async function findUser(req, res, next) {
    try {
        // the same validation scheme as used for creation
        const { error } = UserValidation.create({
            email: req.body.email,
            fullName: req.body.fullName,
        });

        if (error) {
            throw new ValidationError(error.details);
        }

        const result = await UserService.findByEmail(req.body.email);
        const token = await UserAuth.getToken(result.id, req.body.email);
        return res.json({
            accessToken: token.accessToken,
            refreshToken: token.refreshToken,
        });
        // return res.redirect('/v1/users');
    } catch (error) {
        if (error instanceof ValidationError) {
            console.log('validation error');
            return res.status(422).render('422', {
                message: error.name,
                details: error.message[0].message,
            });
        }
        res.render('500', {
            message: error.name,
            details: error.message,
        });

        return next(error);
    }
}

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function findById(req, res, next) {
    const token = req.headers['x-access-token'] || req.headers.authorization;
    const result = UserAuth.verifyUser(token);
    if (typeof result.userId === 'undefined') {
        res.status(401).json({ error: result.error });
    }
    try {
        const { error } = UserValidation.findById({ id: result.userId });

        if (error) {
            throw new ValidationError(error);
        }

        const user = await UserService.findById(result.userId);

        return res.status(200).json({
            data: user,
        });
    } catch (error) {
        if (error instanceof ValidationError) {
            return res.status(422).json({
                error: error.name,
                details: error.message,
            });
        }

        res.status(500).json({
            message: error.name,
            details: error.message,
        });
        return next(error);
    }
}

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function create(req, res, next) {
    try {
        const { error } = UserValidation.create({
            email: req.body.email,
            fullName: req.body.fullName,
        });

        if (error) {
            throw new ValidationError(error.details);
        }

        const result = await UserService.create(req.body);
        const token = await UserAuth.getToken(result.id, req.body.email);

        return res.json({
            accessToken: token.accessToken,
            refreshToken: token.refreshToken,
        });
        // return res.redirect('/v1/users');
    } catch (error) {
        if (error instanceof ValidationError) {
            console.log('validation error');
            return res.status(422).render('422', {
                message: error.name,
                details: error.message[0].message,
            });
        }
        res.render('500', {
            message: error.name,
            details: error.message,
        });

        return next(error);
    }
}

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise<void>}
 */
async function updateById(req, res, next) {
    const token = req.headers['x-access-token'] || req.headers.authorization || req.body.accessToken;
    const result = UserAuth.verifyUser(token);
    if (typeof result.userId === 'undefined') {
        res.status(401).json({ error: result.error });
    }
    try {
        const { error } = UserValidation.updateById({
            id: result.userId,
            fullName: req.body.fullName,
        });

        if (error) {
            throw new ValidationError(error.details);
        }

        await UserService.updateById(result.userId, { fullName: req.body.fullName });


        return res.redirect('/v1/users');
    } catch (error) {
        if (error instanceof ValidationError) {
            return res.status(422).render('422', {
                message: error.name,
                details: error.message[0].message,
            });
        }

        res.render('500', {
            message: error.name,
            details: error.message,
        });

        return next(error);
    }
}

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise<void>}
 */
async function deleteById(req, res, next) {
    try {
        const { error } = UserValidation.deleteById({ id: req.body.id });

        if (error) {
            throw new ValidationError(error.details);
        }

        await UserService.deleteById({ _id: req.body.id });
        await UserAuth.deleteUser(req.body.id);
        return res.redirect('/v1/users');
    } catch (error) {
        if (error instanceof ValidationError) {
            return res.status(422).render('422', {
                message: error.name,
                details: error.message[0].message,
            });
        }

        res.status(500).json({
            message: error.name,
            details: error.message,
        });

        return next(error);
    }
}

/**
 * Shows form for new user
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 */
function newUser(req, res) {
    res.render('formCreateUser', { csrfToken: req.csrfToken() });
}

/**
 * Shows form for user update
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 */
async function updateForm(req, res) {
    const { id } = req.params;
    let token;
    try {
        token = await UserAuth.findToken(id);
    } catch (error) {
        console.error(error);
    }

    res.render('formUpdateUser', {
        userId: id,
        csrfToken: req.csrfToken(),
        accessToken: token.accessToken,
    });
}


module.exports = {
    findAll,
    findById,
    create,
    updateById,
    deleteById,
    newUser,
    updateForm,
    findUser,
};
