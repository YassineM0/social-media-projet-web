const express = require("express");
const router = express.Router();
const {
  accessChat,
  fetchChats,
  createGroup,
  renameGroup,
  addUserToGroup,
  removeFromGroup,
} = require("../controllers/chat-controller");
const {verifyToken} = require("../middlewares/verifyToken");

router.post("/", verifyToken, accessChat);
router.get("/", verifyToken, fetchChats);
router.post("/group", verifyToken, createGroup);
router.put("/rename", verifyToken, renameGroup);
router.put("/groupAdd", verifyToken, addUserToGroup);
router.put("/groupRemove", verifyToken, removeFromGroup);

module.exports = router;
