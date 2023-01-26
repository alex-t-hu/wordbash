const User = require("./models/user");

const idToUser = (id) => {
    return User.findById(id).then((user) => {
        return user;
    });
};

module.exports = {
    idToUser,
};