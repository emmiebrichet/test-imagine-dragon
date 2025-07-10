const Playlist = require('./playlist'); 



test("ajouter une chanson sans erreur", () => {
    const playlist = new Playlist();    
    const song = {
        title: "Demons",
        artist: "Imagine Dragons",
        album: "Night Visions",
        type: "song",
    };  
    
    expect(() => playlist.addSong(song)).not.toThrow();
});
