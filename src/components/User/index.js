const UserService = require('./service');

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

        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
}
async function findUser(req, res, next) {
    let { email } = req.query;
    try {
        const user = await UserService.findUser({ email });
        if (user.length > 0) {
            res.status(200).json(user);
        } else {
            res.status(404).send(`user ${email} not found`);
        }
    } catch (error) {
        next(error);
    }
}

async function createUser(req, res, next) {
    let user = req.body;
    try {
        const search = await UserService.findUser({ email: req.body.email });
        if (search.length === 0) {
            const result = await UserService.createUser(user);

            res.status(201).send(`created: ${result}`);
        } else {
            res.send(`email ${req.body.email} has taken, choose another one`);
        }
    } catch (error) {
        next(error);
    }
}

async function deleteUser(req, res, next) {
    let email = req.body;
    try {
        const result = await UserService.deleteUser(email);
        if (result) {
            res.status(200).send(`deleted: ${result}`);
        } else {
            res.status(200).send('undefined user');
        }
    } catch (error) {
        next(error);
    }
}

async function updateUser(req, res, next) {
    let newUserData = req.body;
    try {
        const result = await UserService.updateUser(newUserData);
        if (result) {
            res.status(200).send(`updated: ${result}`);
        } else {
            res.status(404).send(`can not find user ${newUserData.email}`);
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
