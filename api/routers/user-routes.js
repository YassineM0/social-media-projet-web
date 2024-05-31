const express = require("express");
const { addRemoveFriend, deleteUserByID, getAllUsers, getUserByID, getUserFriendsByID, updateUserByID, updateUserBackgroundByID} = require("../controllers/user-controller.js" );
const { verifyToken, isAdmin, authorization } = require("../middlewares/verifyToken.js");
const upload = require("./uploadImages.js");

const router = express.Router();


// /api/users/
router.get("/", /*verifyToken, authorization, isAdmin,*/ getAllUsers);

// /api/users/:id
router
  .route("/:id")
  .put(upload.single("profilePicture"), /*verifyToken, authorization,*/ updateUserByID)
  .get(/*verifyToken, authorization,*/ getUserByID)
  .delete(/*verifyToken, authorization,*/ deleteUserByID);

// /api/users/:id/backgroundPicture
router
  .route("/:id/backgroundPicture")
  .put(upload.single("backgroundPicture"), /*verifyToken, authorization,*/ updateUserBackgroundByID)

// /api/users/:id/friends
router.get("/:id/friends", /*verifyToken, authorization,*/ getUserFriendsByID);

// /api/users/:id/friendId
router.post("/:id/:friendId", /*verifyToken, authorization,*/ addRemoveFriend);

//search user using its name
router.get("", verifyToken, async (req, res) => {
  try {
    const keyword = req.query.search
      ? {
          $or: [
            { firstName: { $regex: req.query.search, $options: "i" } },
            { lastName: { $regex: req.query.search, $options: "i" } },
          ],
        }
      : {};

    const usersList = await User.find(keyword).select({
      email: 1,
      firstName: 1,
      lastName: 1,
      picturePath: 1,
    });

    res.status(200).send(usersList);
  } catch (err) {
    res.status(404).send(err);
  }
});

module.exports = router;

