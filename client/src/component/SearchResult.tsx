import React from "react";
import { Button, List, ListItem, ListItemText } from "@mui/material";

interface SearchResultsProps {
  results: any[];
  onAdd: (song: any) => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({ results, onAdd }) => {
  return (
    <List>
      {results.map((song) => (
        <ListItem key={song.spotifyId}>
          <ListItemText
            primary={song.title}
            secondary={`${song.artist} - ${song.album}`}
          />
          <Button
            onClick={() => onAdd(song)}
            variant="contained"
            color="primary"
          >
            Add to Playlist
          </Button>
        </ListItem>
      ))}
    </List>
  );
};

export default SearchResults;
