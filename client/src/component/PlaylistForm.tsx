import React, { useEffect, useState } from "react";
import { TextField, Button } from "@mui/material";
import { createPlaylist, updatePlaylist } from "../services/playlistService";

interface PlaylistFormProps {
  playlist?: any;
  onSuccess: () => void;
}

const PlaylistForm: React.FC<PlaylistFormProps> = ({ playlist, onSuccess }) => {
  const [name, setName] = useState(playlist?.name || "");
  const [description, setDescription] = useState(playlist?.description || "");

  useEffect(() => {
    setName("");
    setDescription("");
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (playlist) {
      await updatePlaylist(playlist._id, name, description);
    } else {
      await createPlaylist(name, description);
    }
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        value={name}
        onChange={(e) => setName(e.target.value)}
        label="Playlist Name"
        variant="outlined"
        fullWidth
        margin="normal"
      />
      <TextField
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        label="Description"
        variant="outlined"
        fullWidth
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary">
        Save
      </Button>
    </form>
  );
};

export default PlaylistForm;
