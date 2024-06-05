const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  createPlaylist,
  getPlaylists,
  updatePlaylist,
  deletePlaylist,
  deleteSongFromPlaylist,
} = require("../controllers/playlistController");

const router = express.Router();

router.post("/", authMiddleware, createPlaylist);
router.get("/", authMiddleware, getPlaylists);
router.put("/:id", authMiddleware, updatePlaylist);
router.delete("/:id", authMiddleware, deletePlaylist);
router.delete(
  "/:playlistId/songs/:songId",
  authMiddleware,
  deleteSongFromPlaylist
);

module.exports = router;
