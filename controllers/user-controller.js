const { User, Thought } = require('../models');

const userController = {
    getAllUsers(req, res) {
        User.find({})
            .then(dbUser => res.json(dbUser))
            .catch(err => res.status(500).json(err));
    },

    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
            .populate([
                {
                    path: 'thoughts',
                    select: '-__v'
                },
                {
                    path: 'friends',
                    model: User
                }
            ])
            .select('-__v')
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

    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then(dbUser => {
                if (!dbUser) {
                    res.status(404).json({ message: 'No user found with this id.' });
                    return;
                }
                
                return Thought.deleteMany({ username: dbUser.username });
            })
            .then(dbThought => res.json(dbThought))
            .catch(err => res.status(500).json(err));
    },

    addFriend({ params }, res) {
        User.findOne({ _id: params.friendId })
            .then(dbFriend => {
                if (!dbFriend) {
                    res.status(404).json({ message: 'No user found with this id.' });
                    return;
                }

                return User.findOneAndUpdate(
                    { _id: params.userId },
                    { $push: { friends: dbFriend } },
                    { new: true }
                );
            })
            .then(dbUser => {
                if (!dbUser) {
                    res.status(404).json({ message: 'No user found with this id.' });
                    return;
                }
                res.json(dbUser);
            })
            .catch(err => res.status(500).json(err));
    },

    deleteFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { friends: params.friendId } },
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
    }
}

module.exports = userController;
