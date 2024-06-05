import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { searchSongs } from "../services/playlistService";

interface SearchBarProps {
  onResults: (results: any[]) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onResults }) => {
  const [query, setQuery] = useState("");

  const handleSearch = async () => {
    const results = await searchSongs(query);
    onResults(results);
  };

  return (
    <div>
      <TextField
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        label="Search Songs"
        variant="outlined"
      />
      <Button onClick={handleSearch} variant="contained" color="primary">
        Search
      </Button>
    </div>
  );
};

export default SearchBar;
