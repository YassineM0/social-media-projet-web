const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middlewares/verifyToken");
const {
  sendMessage,
  fetchAllMessages,
} = require("../controllers/message-controller");

router.post("/", verifyToken, sendMessage);
router.get("/:chatId", verifyToken, fetchAllMessages);

module.exports = router;
