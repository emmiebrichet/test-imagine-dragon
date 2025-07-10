const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, "playlist.json");

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname)); // Sert index.html et les fichiers statiques

app.get("/songs", (req, res) => {
  const data = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
  res.json(data.songs || []);
});

app.post("/songs", (req, res) => {
  const { title, artist, url } = req.body;
  if (!title || !url) return res.status(400).json({ error: "Champs requis manquants" });

  const data = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
  const songs = data.songs || [];

  const newSong = {
    id: Date.now(),
    title,
    artist,
    url
  };

  songs.push(newSong);
  fs.writeFileSync(DATA_FILE, JSON.stringify({ songs }, null, 2));
  res.status(201).json(newSong);
});

app.delete("/songs/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const data = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
  const songs = data.songs || [];

  const updatedSongs = songs.filter(song => song.id !== id);
  if (songs.length === updatedSongs.length) return res.status(404).json({ error: "Non trouvé" });

  fs.writeFileSync(DATA_FILE, JSON.stringify({ songs: updatedSongs }, null, 2));
  res.status(204).end();
});

app.listen(PORT, () => {
  console.log(`🎶 Serveur actif sur http://localhost:${PORT}`);
});
