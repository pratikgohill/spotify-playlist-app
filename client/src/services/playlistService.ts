import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const getToken = () => localStorage.getItem("token");

export const createPlaylist = async (name: string, description: string) => {
  const response = await axios.post(
    `${API_URL}/playlists`,
    { name, description },
    {
      headers: { Authorization: `Bearer ${getToken()}` },
    }
  );
  return response.data;
};

export const getPlaylists = async () => {
  const response = await axios.get(`${API_URL}/playlists`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return response.data;
};

export const updatePlaylist = async (
  id: string,
  name: string,
  description: string
) => {
  const response = await axios.put(
    `${API_URL}/playlists/${id}`,
    { name, description },
    {
      headers: { Authorization: `Bearer ${getToken()}` },
    }
  );
  return response.data;
};

export const deletePlaylist = async (id: string) => {
  const response = await axios.delete(`${API_URL}/playlists/${id}`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return response.data;
};

export const searchSongs = async (query: string) => {
  const response = await axios.get(`${API_URL}/spotify/search`, {
    headers: { Authorization: `Bearer ${getToken()}` },
    params: { query },
  });
  return response.data;
};

export const addSongToPlaylist = async (playlistId: string, song: any) => {
  const response = await axios.post(
    `${API_URL}/spotify/add`,
    { playlistId, song },
    {
      headers: { Authorization: `Bearer ${getToken()}` },
    }
  );
  return response.data;
};

export const deleteSongFromPlaylist = async (
  playlistId: string,
  songId: string
) => {
  const response = await axios.delete(
    `${API_URL}/playlists/${playlistId}/songs/${songId}`,
    {
      headers: { Authorization: `Bearer ${getToken()}` },
    }
  );
  return response.data;
};
