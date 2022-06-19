const { User, Thought } = require('../models');

const thoughtController = {
    // get all the thoughts
    getAllThoughts(req, res) {
        Thought.find({})
            .then(dbThought => res.json(dbThought))
            .catch(err => res.status(500).json(err));
    },

    // get single thought by its id
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

    // create thought
    createThought({ body }, res) {
        Thought.create(body)
            .then(({ _id }) => {
                // push thought id to user collection
                return User.findOneAndUpdate(
                    { _id: body.userId },
                    { $push: { thoughts: _id } },
                    // return updated version and validate information
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

    // update the thought
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.id },
            body,
            // return updated version and validate information
            { new: true, runValidators: true }
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

    // delete the thought
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

    // create reaction and add it to the thought
    createReaction({ params, body }, res) {
        // update the thought to push the reaction to reactions array
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body } },
            // return updated version and validate information
            { new: true, runValidators: true }
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

    // delete reaction from the thought
    deleteReaction({ params }, res) {
        // update the thought by pulling out the reaction from the reactions array
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            // return updated version
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
