const UserService = require('./service');
const UserValidation = require('./validation');

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >} list of all users
 */
async function findAll(req, res, next) {
    try {
        const users = await UserService.findAll();

        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
}
/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >} selected user data
 */
async function findUser(req, res, next) {
    let { email } = req.query;
    try {
        const validation = await UserValidation.emailValidation(email);
        if (validation.error) {
            res.status(422).send(validation.error.message);
        } else {
            const user = await UserService.findUser({ email });
            if (user.length > 0) {
                res.status(200).json(user);
            } else {
                res.status(404).send(`user ${email} not found`);
            }
        }
    } catch (error) {
        next(error);
    }
}

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >} created user's data or error message
 */
async function createUser(req, res, next) {
    let user = req.body;
    try {
        const validation = await UserValidation.fullValidation(user);
        if (validation.error) {
            res.status(422).send(validation.error.message);
        } else {
            const search = await UserService.findUser({ email: req.body.email });
            if (search.length === 0) {
                const result = await UserService.createUser(user);

                res.status(201).send(`created: ${result}`);
            } else {
                res.send(`email ${req.body.email} has taken, choose another one`);
            }
        }
    } catch (error) {
        next(error);
    }
}

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >} deleted user's data or error message
 */
async function deleteUser(req, res, next) {
    let email = req.body;
    try {
        const validation = await UserValidation.emailValidation(email.email);
        if (validation.error) {
            res.status(422).send(validation.error.message);
        } else {
            const result = await UserService.deleteUser(email);
            if (result) {
                res.status(200).send(`deleted: ${result}`);
            } else {
                res.status(200).send('undefined user');
            }
        }
    } catch (error) {
        next(error);
    }
}

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >} updated user's data or error message
 */
async function updateUser(req, res, next) {
    let newFullName = req.body;
    try {
        const validation = await UserValidation.fullValidation(newFullName);
        if (validation.error) {
            res.status(422).send(validation.error.message);
        } else {
            const result = await UserService.updateUser(newFullName);
            if (result) {
                res.status(200).send(`updated: ${result}`);
            } else {
                res.status(404).send(`can not find user ${newFullName.email}`);
            }
        }
    } catch (error) {
        next(error);
    }
}


module.exports = {
    findAll,
    findUser,
    createUser,
    deleteUser,
    updateUser
};
