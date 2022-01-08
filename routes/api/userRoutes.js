const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require('../../controllers/userController');

// Set up GET all and POST at /api/users
router.route("/").get(getUsers).post(createUser);

// Set up GET one, PUT, and DELETE at /api/users/:id
router.route("/:id").get(getSingleUser).put(updateUser).delete(deleteUser);

// Add and delete a friend
router.route("/:id/friends/:friendsId").post(addFriend).delete(deleteFriend);

module.exports = router;
