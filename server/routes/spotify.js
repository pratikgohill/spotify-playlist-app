const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  searchSongs,
  addSongToPlaylist,
} = require("../controllers/spotifyController");

const router = express.Router();

router.get("/search", authMiddleware, searchSongs);
router.post("/add", authMiddleware, addSongToPlaylist);

module.exports = router;
