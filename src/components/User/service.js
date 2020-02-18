const UserModel = require('./model');

module.exports = {
    /**
     * @exports
     * @method findAll
     * @param {}
     * @summary get list of all users
     * @returns Promise<UserModel[]>
     */
    async findAll() {
        const result = await UserModel.find({});
        return result;
    },
    /**
     * @exports
     * @method findUser
     * @param email user email
     * @summary get data of selected user
     * @returns Promise<UserModel[]>
     */
    async findUser(email) {
        const result = await UserModel.find(email);
        return result;
    },

    /**
     * @exports
     * @method createUser
     * @param user user data (email and full name)
     * @summary creates new user with provided data
     * @returns Promise<UserModel[]>
     */
    async createUser(user) {
        const newUser = new UserModel(user);
        const result = await newUser.save(user);
        return result;
    },

    /**
     * @exports
     * @method deleteUser
     * @param email user email
     * @summary deletes selected user
     * @returns Promise<UserModel[]>
     */
    async deleteUser(email) {
        const result = await UserModel.findOneAndDelete(email);
        return result;
    },

    /**
     * @exports
     * @method updateUser
     * @param newName updated user's data (email(used as key) and new full name)
     * @summary updates user's full name
     * @returns Promise<UserModel[]>
     */
    async updateUser(newName) {
        const filter = { email: newName.email };
        const update = { fullName: newName.fullName };
        const result = await UserModel.findOneAndUpdate(filter, update, { new: true });
        return result;
    }
};
