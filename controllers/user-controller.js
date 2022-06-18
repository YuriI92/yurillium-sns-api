const { User } = require('../models');

const userController = {
    getAllUsers(req, res) {
        User.find({})
            .then(dbUser => res.json(dbUser))
            .catch(err => res.status(500).json(err));
    },

    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
            .then(dbUser => {
                if (!dbUser) {
                    res.status(404).json({ message: 'No user found with this id.' });
                    return;
                }
                res.json(dbUser);
            })
            .catch(err => res.status(500).json(err));
    },

    createUser({ body }, res) {
        User.create(body)
            .then(dbUser => res.json(dbUser))
            .catch(err => res.status(500).json(err));
    },

    updateUser({ params, body }, res) {
        User.findOneAndUpdate(
            { _id: params.id },
            body,
            { new: true }
        )
            .then(dbUser => {
                if (!dbUser) {
                    res.status(404).json({ message: 'No user found with this id.' });
                    return;
                }
                res.json(dbUser);
            })
            .catch(err => res.status(500).json(err));
    },

    removeUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then(dbUser => {
                if (!dbUser) {
                    res.status(404).json({ message: 'No user found with this id.' });
                    return;
                }
                res.json(dbUser);
            })
            .catch(err => res.status(500).json(err));
    }
}

module.exports = userController;
