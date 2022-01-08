const { User, Thought } = require('../models');

module.exports = {
  // Get all thoughts
  getThoughts(req, res) {
    Thought.find()
      .then(async (thought) => {
        const thoughtObj = {
          thought,
        };
        return res.json(thoughtObj);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Get a thought
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.id })
      .select('-__v')
      .then(async (thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json({
            thought,
          })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Create a thought
  createThought(req, res) {
    Thought.create({
      username: req.body.username,
      thoughtText: req.body.thoughtText,
      // thoughtName: req.body.thoughtName,
    })
      .then((thought) => res.json(thought))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  // Delete a thought
  deleteThought(req, res) {
    Thought.findOneAndUpdate(
      { $pull: { thoughts: req.params.id } },
      { new: true, }
    )
      .select('-__v')
      .then(thought =>
        !thought
          ? res.status(404).json({ message: "I can't find a thought with that id." })
          : res.json({ message: `Thought has successfully been removed`, thought })
      )
      .catch(err => res.status(400).json(err));

  },

  // Update a thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.id },
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

  // Add Friend
  addReaction(req, res) {
    User.findOneAndUpdate(
      { $addToSet: { reactionBody: req.params.id } },
      { new: true, upsert: true, }
    )
      .select('-__v')

      .then(reaction =>
        !reaction
          ? res.status(404).json({ message: "I can't find a reaction with that id." })
          : res.json({ message: `Successfully added a Reaction`, reaction })
      )

      .catch(err => res.json(err));

  },

  // delete a Friend
  deleteReaction(req, res) {
    User.findOneAndUpdate(
      { $pull: { reactionBody: req.params.id } },
      { new: true, }
    )
      .select('-__v')
      .then(reaction =>
        !reaction
          ? res.status(404).json({ message: "I can't find a reaction with that id." })
          : res.json({ message: `Successfully deleted a Reaction`, reaction })
      )
      .catch(err => res.status(400).json(err));

  },

};
