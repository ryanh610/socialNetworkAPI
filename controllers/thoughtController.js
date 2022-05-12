const {User, Thought} = require('../models')

module.exports = {
    getThoughts(req, res) {
        Thought.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .select('-__v')
            .then((thought) =>
                !thought
                    ? res.json(404).json({ message: 'No thought with that ID' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    createThought(req, res) {
        Thought.create(req.body)
            .then((thought) => {
                return User.findOneAndUpdate(
                    { username: req.body.username  },
                    { $addToSet: { thoughts: thought._id } },
                    { new: true }
                );
            })
            .then((user) =>
                !user
                    ? res.status(404).json({
                        message: 'This thought exists, but there is no user to think it.'
                    })
                    : res.json('Your thought has been brought into existence.')
            )
            .catch((err) => res.status(500).json(err));
    },
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
        .then((thought) =>
            !thought
                ? res.status(404).json({ message: 'No thought with this id!' })
                : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
            .then((thought) => 
                !thought
                    ? res.status(404).json({ message: 'No thought with this id!' })
                    : User.findOneAndUpdate(
                        { thoughts: req.params.thoughtId },
                        { $pull: { thought: req.params.thoughtId } },
                        { new: true }
                    )
            )
            .then((user) => 
                !user
                    ? res.status(404).json({ message: 'No user associated with this thought.' })
                    : res.json({ message: 'Thought successfully unthunk.' })
            )
            .catch((err) => res.status(500).json(err));      
    },
    createReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with this id!' })
                    : res.json({ message: 'Your reaction has been recorded.' })
            )
            .catch((err) => res.status(500).json(err));
    },
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { _id: req.params.reactionId} } },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with this id!' })
                    : res.json(thought) 
                        
            )
            .catch((err) => res.status(500).json(err));
    },
};