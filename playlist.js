class Playlist {
  constructor() {
    this.playlist = [];
    this. validAlbums = ["Evolve", "Night Visions", "Smoke + Mirrors", "Origins", "Mercury", "Loom"];
    this.allowedTypes = ["song"];
    this.allowedArtists = ["Imagine Dragons"];  
  }

  addSong(song) {
  const validSongs = ["Believer", "Demons", "Radioactive", "Thunder"];

  if (!song || typeof song !== "object" || song === null) {
    throw new Error("Invalid song object");
  }

  if (!song.title || !song.artist || !song.album || !song.type) {
    throw new Error("Invalid song object");
  }

  if (song.type.toLowerCase() === "podcast") {
    throw new Error("Only song are allowed");
  }
  if( !song.type.toLowerCase() === "movie"){
    throw new Error("Only song are allowed");
  }

  if (!this.allowedTypes.includes(song.type.toLowerCase())) {
    throw new Error("Only song are allowed");
  }

  const albumIsValid = this.validAlbums.includes(song.album);
  const artistIsValid = this.allowedArtists.includes(song.artist);

  // ❌ Cas combiné
  if (!artistIsValid && !albumIsValid) {
    throw new Error("Artiste et album non autorisés");
  }

  // ❌ Cas séparés
  if (!artistIsValid) {
    throw new Error("Only songs by Imagine Dragons are allowed");
  }

  if (!albumIsValid) {
    throw new Error("Invalid album name");
  }

  if (!validSongs.includes(song.title)) {
    throw new Error("Unknown song by Imagine Dragons");
  }

  const exists = this.playlist.some(
    s => s.title === song.title && s.album === song.album
  );
  if (exists) {
    throw new Error("This song is already in the playlist");
  }

  this.playlist.push(song);
}


  getSong(albumName) {
    return this.playlist.filter(song => song.album === albumName);
  }

  removeSong(song) {
    const index = this.playlist.indexOf(song);
    if (index > -1) {
      this.playlist.splice(index, 1);
    }
  }

  getPlaylist() {
    return this.playlist;
  }
}

module.exports = Playlist;
