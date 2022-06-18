const { User, Thought } = require('../models');

const thoughtController = {
    getAllThoughts(req, res) {
        Thought.find({})
            .then(dbThought => res.json(dbThought))
            .catch(err => res.status(500).json(err));
    },

    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
            .then(dbThought => {
                if (!dbThought) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                res.json(dbThought);
            })
            .catch(err => res.status(500).json(err));
    },

    createThought({ body }, res) {
        Thought.create(body)
            .then(({ _id }) => {
                // push thought id to user collection
                return User.findOneAndUpdate(
                    { _id: body.userId },
                    { $push: { thoughts: _id } },
                    { new: true, runValidators: true }
                );
            })
            .then(dbUser => {
                if (!dbUser) {
                    res.status(404).json({ message: 'No user with this id!' });
                    return;
                }
                res.json(dbUser);
            })
            .catch(err => res.status(500).json(err));
    },

    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.id },
            body,
            { new: true }
        )
            .then(dbThought => {
                if (!dbThought) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                res.json(dbThought);
            })
            .catch(err => res.status(500).json(err));
    },

    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
            .then(dbThought => {
                if (!dbThought) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                res.json(dbThought);
            })
            .catch(err => res.status(500).json(err));
    },

    createReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body } },
            { new: true }
        )
            .then(dbThought => {
                if (!dbThought) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                res.json(dbThought);
            })
            .catch(err => res.status(500).json(err));
    },

    deleteReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new: true }
        )
            .then(dbThought => {
                if (!dbThought) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                res.json(dbThought);
            })
            .catch(err => res.status(500).json(err));
    }
}

module.exports = thoughtController;
