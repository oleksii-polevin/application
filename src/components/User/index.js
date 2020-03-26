const UserService = require('./service');
const UserValidation = require('./validation');
const ValidationError = require('../../error/ValidationError');
const JwtUser = require('../Jwt/jwt.js');


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
        });
    } catch (error) {
        res.status(500).render('500', {
            error: error.message,
            details: null,
        });

        next(error);
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
    const decodedToken = JwtUser.verifyUser(req.headers.authorization);
    const { userId } = decodedToken;
    try {
        const { error } = UserValidation.findById({ id: userId });

        if (error) {
            throw new ValidationError(error);
        }

        const user = await UserService.findById({ _id: userId });
        if (!user) {
            return res.status(404);
        }

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
 * find user by email after logout
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function findUser(req, res, next) {
    try {
        const { error } = UserValidation.findByEmail({
            email: req.body.email,
        });

        if (error) {
            throw new ValidationError(error.details);
        }

        const result = await UserService.findByEmail(req.body.email);
        const token = await JwtUser.getToken(result[0].id, false);
        return res.json({
            accessToken: token.accessToken,
            refreshToken: token.refreshToken,
        });
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
        const token = await JwtUser.getToken(result.id);

        return res.json({
            accessToken: token.accessToken,
            refreshToken: token.refreshToken,
        });
    } catch (error) {
        if (error instanceof ValidationError) {
            console.log('validation error');
            return res.status(422).render('422', {
                message: error.name,
                details: error.message[0].message,
            });
        }
        res.status(500).render('500', {
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
    const decodedToken = JwtUser.verifyUser(req.headers.authorization);
    const { userId } = decodedToken;
    try {
        const { error } = UserValidation.updateById({
            id: userId,
            fullName: req.body.fullName,
        });

        if (error) {
            throw new ValidationError(error.details);
        }

        const result = await UserService.updateById(userId, { fullName: req.body.fullName });
        return res.json(result);
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
    const decodedToken = JwtUser.verifyUser(req.headers.authorization);
    const { userId } = decodedToken;
    try {
        const { error } = UserValidation.deleteById({ id: userId });

        if (error) {
            throw new ValidationError(error.details);
        }

        const result = await UserService.deleteById(userId);
        await JwtUser.deleteUser(userId);
        return res.json(result);
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
    res.render('formCreateUser');
}

/**
 * Shows form for user update
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 */
async function updateForm(req, res) {
    const { id } = req.params;

    res.render('formUpdateUser', {
        userId: id,
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
