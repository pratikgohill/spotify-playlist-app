import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResult";
import {
  addSongToPlaylist,
  deletePlaylist,
  getPlaylists,
} from "../services/playlistService";
import PlaylistCard from "./PlaylistCard";
import PlaylistForm from "./PlaylistForm";

const Dashboard = () => {
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState<any | null>(null);
  const [playlists, setPlaylists] = useState<any[]>([]);

  useEffect(() => {
    fetchPlaylists();
  }, []);

  const fetchPlaylists = async () => {
    const data = await getPlaylists();
    setPlaylists(data);
  };

  const handleAddSong = async (song: any) => {
    if (selectedPlaylist) {
      const updatedPlaylist = await addSongToPlaylist(
        selectedPlaylist._id,
        song
      );
      setPlaylists(
        playlists.map((p) =>
          p._id === updatedPlaylist._id ? updatedPlaylist : p
        )
      );
    }
  };
  console.log("playlists: ", playlists);

  const handleDelete = async (id: string) => {
    await deletePlaylist(id);
    setPlaylists(playlists.filter((p) => p._id !== id));
  };

  return (
    <div>
      <h2>My Playlists</h2>
      {playlists.map((playlist) => (
        <PlaylistCard
          key={playlist._id}
          playlist={playlist}
          onEdit={() => setSelectedPlaylist(playlist)}
          onDelete={() => handleDelete(playlist._id)}
        />
      ))}
      <br />
      <h2>{selectedPlaylist ? "Edit Playlist" : "Create Playlist"}</h2>
      <PlaylistForm
        playlist={selectedPlaylist}
        onSuccess={() => {
          fetchPlaylists();
          setSelectedPlaylist(null);
        }}
      />
      <hr />
      <br />
      <SearchBar onResults={setSearchResults} />
      <hr />
      <br />

      <SearchResults results={searchResults} onAdd={handleAddSong} />
    </div>
  );
};

export default Dashboard;
