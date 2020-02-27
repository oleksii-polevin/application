const UserService = require('./service');
const UserValidation = require('./validation');
const ValidationError = require('../../error/ValidationError');

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

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function findById(req, res, next) {
    try {
        const { error } = UserValidation.findById(req.params);

        if (error) {
            throw new ValidationError(error.details);
        }

        const user = await UserService.findById(req.params.id);

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

        await UserService.create(req.body);
        return res.redirect('/v1/users');
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
    try {
        const { error } = UserValidation.updateById({
            id: req.body.id,
            fullName: req.body.fullName,
        });


        if (error) {
            throw new ValidationError(error.details);
        }

        await UserService.updateById(req.body.id, req.body);

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
function updateForm(req, res) {
    const { id } = req.params;

    res.render('formUpdateUser', {
        userId: id,
        csrfToken: req.csrfToken(),
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
};
