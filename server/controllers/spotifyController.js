const axios = require("axios");
const Song = require("../models/Song");
const Playlist = require("../models/Playlist");

// token for making API calls
const getSpotifyToken = async () => {
  const tokenResponse = await axios.post(
    "https://accounts.spotify.com/api/token",
    null,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(
          `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
        ).toString("base64")}`,
      },
      params: {
        grant_type: "client_credentials",
      },
    }
  );
  return tokenResponse.data.access_token;
};

const searchSongs = async (req, res) => {
  const { query } = req.query;
  try {
    const token = await getSpotifyToken();
    const response = await axios.get(`https://api.spotify.com/v1/search`, {
      headers: { Authorization: `Bearer ${token}` },
      params: { q: query, type: "track" },
    });

    const songs = response.data.tracks.items.map((item) => ({
      title: item.name,
      artist: item.artists[0].name,
      album: item.album.name,
      spotifyId: item.id,
    }));

    res.json(songs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addSongToPlaylist = async (req, res) => {
  const { playlistId, song } = req.body;
  try {
    let existingSong = await Song.findOne({ spotifyId: song.spotifyId });
    if (!existingSong) {
      existingSong = new Song(song);
      await existingSong.save();
    }
    const playlist = await Playlist.findByIdAndUpdate(
      playlistId,
      { $addToSet: { songs: existingSong._id } },
      { new: true }
    ).populate("songs");
    res.json(playlist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { searchSongs, addSongToPlaylist };
