const Playlist = require("../models/Playlist");
const Song = require("../models/Song");

const createPlaylist = async (req, res) => {
  const { name, description } = req.body;
  try {
    const playlist = new Playlist({ name, description, user: req.user });
    await playlist.save();
    res.status(201).json(playlist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPlaylists = async (req, res) => {
  try {
    const playlists = await Playlist.find({ user: req.user }).populate("songs");
    res.json(playlists);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updatePlaylist = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  try {
    const playlist = await Playlist.findByIdAndUpdate(
      id,
      { name, description },
      { new: true }
    );
    res.json(playlist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deletePlaylist = async (req, res) => {
  const { id } = req.params;
  try {
    await Playlist.findByIdAndDelete(id);
    res.json({ message: "Playlist deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteSongFromPlaylist = async (req, res) => {
  try {
    const { playlistId, songId } = req.params;
    const playlist = await Playlist.findById(playlistId);

    if (!playlist) {
      return res.status(404).json({ error: "Playlist not found" });
    }

    const songIndex = playlist.songs.findIndex((song) => song == songId);

    if (songIndex === -1) {
      return res.status(404).json({ error: "Song not found in playlist" });
    }

    playlist.songs.splice(songIndex, 1);
    await playlist.save();

    res.json(playlist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createPlaylist,
  getPlaylists,
  updatePlaylist,
  deletePlaylist,
  deleteSongFromPlaylist,
};
