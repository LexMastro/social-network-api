const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  // addReaction,
  // deleteReaction,
} = require('../../controllers/thoughtController.js');

// /api/Thoughts
router.route('/').get(getThoughts).post(createThought);

// /api/Thoughts/:ThoughtId
router
  .route('/:thoughtId')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

// router.route("/:thoughtId/reactions").post(addReaction).delete(deleteReaction);

module.exports = router;
