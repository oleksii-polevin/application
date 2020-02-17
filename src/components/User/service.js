const UserModel = require('./model');

module.exports = {
    /**
     * @exports
     * @method findAll
     * @method findUser
     * @param {}
     * @param email user email
     * @summary get list of all users
     * @returns Promise<UserModel[]>
     */
    async findAll() {
        return await UserModel.find({});
    },

    async findUser(email) {
        return await UserModel.find(email);
    },

    async createUser(user) {
        const newUser = new UserModel(user);
        await newUser.save(user);
    },

    async deleteUser(email) {
        return await UserModel.findOneAndDelete(email);
    },

    async updateUser(newUserData) {
        const filter = { email: newUserData.email };
        const update = { fullName: newUserData.fullName };
        return await UserModel.findOneAndUpdate(filter, update, { new: true });
    }
};
