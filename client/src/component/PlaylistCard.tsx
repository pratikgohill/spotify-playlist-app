import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { deleteSongFromPlaylist } from "../services/playlistService";

interface PlaylistCardProps {
  playlist: any;
  onEdit: (playlist: any) => void;
  onDelete: () => void;
}

const PlaylistCard: React.FC<PlaylistCardProps> = ({
  playlist,
  onEdit,
  onDelete,
}) => {
  const handleDeleteSong = async (songId: string) => {
    try {
      await deleteSongFromPlaylist(playlist._id, songId);
      onEdit({
        ...playlist,
        songs: playlist.songs.filter((song: any) => song.id !== songId),
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5">{playlist.name}</Typography>
        <Typography variant="body2">{playlist.description}</Typography>
        <List>
          {playlist.songs.map((song: any) => (
            <ListItem key={song.id}>
              <ListItemText
                primary={song.title}
                secondary={`${song.artist} - ${song.album}`}
              />
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleDeleteSong(song._id)}
              >
                <Delete />
              </IconButton>
            </ListItem>
          ))}
        </List>
        <Button onClick={onEdit} variant="contained" color="primary">
          Edit
        </Button>
        <Button onClick={onDelete} variant="contained" color="secondary">
          Delete
        </Button>
      </CardContent>
    </Card>
  );
};

export default PlaylistCard;
