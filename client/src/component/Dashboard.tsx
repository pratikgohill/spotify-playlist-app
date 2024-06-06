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
import { Alert } from "@mui/material";

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
  console.log("playlists: ", playlists, selectedPlaylist);

  const handleDelete = async (id: string) => {
    await deletePlaylist(id);
    await fetchPlaylists();
  };

  return (
    <div>
      <h2>My Playlists</h2>
      <Alert severity="info">
        Click on manage playlist after creating it to add songs
      </Alert>

      {playlists.map((playlist) => (
        <PlaylistCard
          key={playlist._id}
          playlist={playlist}
          onEdit={() => setSelectedPlaylist(playlist)}
          onDelete={() => handleDelete(playlist._id)}
          fetchPlaylists={fetchPlaylists}
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
      {selectedPlaylist ? (
        <>
          <hr />
          <h2>Search Songs</h2>
          <SearchBar onResults={setSearchResults} />
          <hr />
          <br />
          <SearchResults results={searchResults} onAdd={handleAddSong} />
        </>
      ) : null}
    </div>
  );
};

export default Dashboard;
