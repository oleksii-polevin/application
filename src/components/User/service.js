const UserModel = require('./model');

module.exports = {
    /**
     * @exports
     * @method findAll
     * @method findUser
     * @param {}
     * @param email user email
     * @param user user data (email and full name)
     * @param newUserData updated user data (email - key for fullName update)
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
        return await newUser.save(user);
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
