const { User } = require('../models');

const userController = {
    getAllUsers(req, res) {
        User.find({})
            .then(dbUser => res.json(dbUser))
            .catch(err => res.json(err));
    },

    getUserById(req, res) {
        User.findOne({  })
    }
}