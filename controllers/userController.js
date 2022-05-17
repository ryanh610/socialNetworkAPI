const { User, Thought } = require('../models');

module.exports = {
    getUsers(req, res) {
        User.find()
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err))
    },
    getOneUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .select('-_v')
            .then((user) => !user
                ? res.status(400).json({ message: 'ID does not match any users' })
                : res.json(user)
            ).catch((err) => res.status(500).json(err));
    },
    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        ).then((user) => !user
            ? res.status(400).json({ message: 'ID does not match any users' })
            : res.json(user)
        )
            .catch((err) => res.status(500).json(err));
    },
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
            .then((user) => !user
                ? res.status(400).json({ message: 'ID does not match any users' })
                : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    createFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        ).then((user) => !user
            ? res.status(400).json({ message: 'ID does not match any users' })
            : res.json(user)
        )
            .catch((err) => res.status(500).json(err));
    },
    deleteFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'ID does not match any users' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    }
}