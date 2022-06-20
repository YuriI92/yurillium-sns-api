const { User, Thought } = require('../models');

const userController = {
    // get all the users
    getAllUsers(req, res) {
        User.find({})
            .then(dbUser => res.json(dbUser))
            .catch(err => res.status(500).json(err));
    },

    // get single user by its id
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
            // show details of the user's thoughts and friends instead of their ids
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
            // replace __v property to thoughts
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
            // return updated version and validate information
            { new: true, runValidators: true }
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
                
                // delete thoughts associated with the user
                return Thought.deleteMany({ username: dbUser.username });
            })
            .then(dbThought => res.json(dbThought))
            .catch(err => res.status(500).json(err));
    },

    // add friend to the user's friends list
    addFriend({ params }, res) {
        // find the friend's information
        User.findOne({ _id: params.friendId })
            .then(dbFriend => {
                if (!dbFriend) {
                    res.status(404).json({ message: 'No user found with this id.' });
                    return;
                }

                // update the user's friends list by pushing friend's info into user's friends property
                return User.findOneAndUpdate(
                    { _id: params.userId },
                    { $push: { friends: dbFriend } },
                    // return updated version
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

    // delete friend
    deleteFriend({ params }, res) {
        // update the user by pulling friend's info by its id from the user's friends array
        User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { friends: params.friendId } },
            // return updated version
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
