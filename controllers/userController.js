const { User, Thought } = require('../models');

module.exports = {
  // Get all users
  getUsers(req, res) {
    User.find()
      .then(async (users) => {
        const userObj = {
          users,
        };
        return res.json(userObj);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Get a single user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.id })
      .select('-__v')
      .then(async (user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json({
            user,
          })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // create a new user
  createUser(req, res) {
    User.create({ username: req.body.username, email: req.body.email })
      .then((user) => res.json(user))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.id })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No such user exists' })
          : Thought.deleteMany(
            { _id: { $in: user.thoughts } },
          )
      )
      .then(() => res.json({ message: "User and thoughts deleted!" }))
      .catch((err) => res.status(500).json(err));
  },

  // Update User
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with this id!" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Add Friend
  addFriend(req, res) {
    User.findOneAndUpdate(
      { $addToSet: { friends: req.params.id } },
      { new: true, upsert: true, }
    )
      .select('-__v')

      .then(user =>
        !user
          ? res.status(404).json({ message: "I can't find a user with that id." })
          : res.json({ message: `${user.username} has successfully added a friend:`, user })
      )

      .catch(err => res.json(err));

  },

  // delete a Friend
  deleteFriend(req, res) {
    User.findOneAndUpdate(
      { $pull: { friends: req.params.id } },
      { new: true, }
    )
      .select('-__v')
      .then(user =>
        !user
          ? res.status(404).json({ message: "I can't find a user with that id." })
          : res.json({ message: `${user.username} has successfully removed a friend:`, user })
      )
      .catch(err => res.status(400).json(err));

  },

};


