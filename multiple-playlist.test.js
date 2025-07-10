const Playlist = require('./playlist');

describe("test sur la playlist avec succès", () => {
  let playlist;

  beforeEach(() => {
    playlist = new Playlist();
  });

  test("initialise une playlist vide", () => {
    expect(playlist.getPlaylist()).toEqual([]);
  });

  test("ajouter une chanson avec succès", () => {
    const song = {
      title: "Demons",
      artist: "Imagine Dragons",
      album: "Night Visions",
      type: "song",
    };

    expect(() => playlist.addSong(song)).not.toThrow();
    expect(playlist.getPlaylist()).toEqual(
      expect.arrayContaining([expect.objectContaining(song)])
    );
  });

  test("supprimer une chanson de la playlist", () => {
    const song = {
      title: "Believer",
      artist: "Imagine Dragons",
      album: "Evolve",
      type: "song",
    };

    playlist.addSong(song);
    playlist.removeSong(song);

    expect(playlist.getPlaylist()).not.toEqual(
      expect.arrayContaining([expect.objectContaining(song)])
    );
  });

  test("récupérer des chansons d'un album existant", () => {
    const song1 = {
      title: "Demons",
      artist: "Imagine Dragons",
      album: "Night Visions",
      type: "song",
    };
    const song2 = {
      title: "Radioactive",
      artist: "Imagine Dragons",
      album: "Night Visions",
      type: "song",
    };

    playlist.addSong(song1);
    playlist.addSong(song2);

    // Album existant
    expect(playlist.getSong("Night Visions")).toEqual(
      expect.arrayContaining([
        expect.objectContaining(song1),
        expect.objectContaining(song2),
      ])
    );
    // Album vide
    expect(playlist.getSong("Evolve")).toEqual([]);
  });

  test("récupérer une chanson par son titre", () => {
    const song = {
      title: "Thunder",
      artist: "Imagine Dragons",
      album: "Evolve",
      type: "song",
    };
    playlist.addSong(song);

    expect(playlist.getSong("Evolve")).toEqual([
      expect.objectContaining(song),
    ]);
  });
});

describe("test sur la playlist avec échec", () => {
  let playlist;

  beforeEach(() => {
    playlist = new Playlist();
  });

  test("ajouter une chanson invalide (artiste)", () => {
    const invalidSong = {
      title: "Demons",
      artist: "Unknown Artist",
      album: "Night Visions",
      type: "song",
    };
    expect(() => playlist.addSong(invalidSong))
      .toThrow("Only songs by Imagine Dragons are allowed");
  });

  test("ajouter une chanson déjà présente", () => {
    const song = {
      title: "Demons",
      artist: "Imagine Dragons",
      album: "Night Visions",
      type: "song",
    };
    playlist.addSong(song);
    expect(() => playlist.addSong(song))
      .toThrow("This song is already in the playlist");
  });

  test("supprimer une chanson inexistante", () => {
    const song = {
      title: "Thunder",
      artist: "Imagine Dragons",
      album: "Evolve",
      type: "song",
    };
    // ne doit pas planter
    expect(() => playlist.removeSong(song)).not.toThrow();
    expect(playlist.getPlaylist()).not.toEqual(
      expect.arrayContaining([expect.objectContaining(song)])
    );
  });

  test("récupérer des chansons d'un album inexistant", () => {
    expect(playlist.getSong("Nonexistent Album")).toEqual([]);
  });

  test("ajouter une chanson de OneRepublic", () => {
    const song = {
      title: "Counting Stars",
      artist: "OneRepublic",
      album: "Evolve",
      type: "song",
    };
    expect(() => playlist.addSong(song))
      .toThrow("Only songs by Imagine Dragons are allowed");
  });

  test("ajouter une chanson sans titre", () => {
    const song = {
      artist: "Imagine Dragons",
      album: "Night Visions",
      type: "song",
    };
    expect(() => playlist.addSong(song)).toThrow("Invalid song object");
  });

  test("ajouter une chanson sans artiste", () => {
    const song = {
      title: "Demons",
      album: "Night Visions",
      type: "song",
    };
    expect(() => playlist.addSong(song)).toThrow("Invalid song object");
  });

  test("ajouter une chanson sans album", () => {
    const song = {
      title: "Demons",
      artist: "Imagine Dragons",
      type: "song",
    };
    expect(() => playlist.addSong(song)).toThrow("Invalid song object");
  });

  test("ajouter une chanson avec un titre vide", () => {
    const song = {
      title: "",
      artist: "Imagine Dragons",
      album: "Night Visions",
      type: "song",
    };
    expect(() => playlist.addSong(song)).toThrow("Invalid song object");
  });

  test("ajouter une chanson avec un artiste vide", () => {
    const song = {
      title: "Demons",
      artist: "",
      album: "Night Visions",
      type: "song",
    };
    expect(() => playlist.addSong(song)).toThrow("Invalid song object");
  });

  test("ajouter une chanson avec un album vide", () => {
    const song = {
      title: "Demons",
      artist: "Imagine Dragons",
      album: "",
      type: "song",
    };
    expect(() => playlist.addSong(song)).toThrow("Invalid song object");
  });

  test("ajouter une chanson avec un titre null", () => {
    const song = {
      title: null,
      artist: "Imagine Dragons",
      album: "Night Visions",
      type: "song",
    };
    expect(() => playlist.addSong(song)).toThrow("Invalid song object");
  });

  test("ajouter une chanson avec un artiste null", () => {
    const song = {
      title: "Demons",
      artist: null,
      album: "Night Visions",
      type: "song",
    };
    expect(() => playlist.addSong(song)).toThrow("Invalid song object");
  });

  test("ajouter une chanson avec un album null", () => {
    const song = {
      title: "Demons",
      artist: "Imagine Dragons",
      album: null,
      type: "song",
    };
    expect(() => playlist.addSong(song)).toThrow("Invalid song object");
  });

  test("ajouter une chanson avec un titre inconnu", () => {
    const song = {
      title: "stella",
      artist: "Imagine Dragons",
      album: "Evolve",
      type: "song",
    };
    expect(() => playlist.addSong(song))
      .toThrow("Unknown song by Imagine Dragons");
  });

  test("ajouter une chanson avec un type podcast", () => {
    const song = {
      title: "Podcast Episode",
      artist: "Imagine Dragons",
      album: "Evolve",
      type: "podcast",
    };
    expect(() => playlist.addSong(song))
      .toThrow("Only song are allowed");
  });

  test("ajouter un film", () => {
    const song = {
      title: "Imagine Dragons Movie",
      artist: "Imagine Dragons",
      album: "Evolve",
      type: "movie",
    };
    expect(() => playlist.addSong(song))
      .toThrow("Only song are allowed");
  });

  test("ajouter une chanson avec un artiste et un album inconnu", () => {
    const invalidsong = {
      title: "Uprising",
      artist: "muse",
      album: "Resistance",
      type: "song",

    }
    expect(() => playlist.addSong(invalidsong))
      .toThrow("Artiste et album non autorisés");
    });

    test("ajouter une chanson avec un artiste et un album inconnu (OneRepublic)", () => {
      const invalidSong = {
        title: "Counting Stars",
        artist:"Onerepublic",
        album: "Native",
        type: "song",
      };
      expect(() => playlist.addSong(invalidSong))
        .toThrow("Artiste et album non autorisés");
    });
    test("ajouter une chanson avec un type différent", () => {
      const invalidType = {
        title: "Imagine Dragons Podcast",
        artist: "Imagine Dragons",
        album: "Evolve",
        type: "podcast",
      };
       expect(() => playlist.addSong(invalidType))
      .toThrow("Only song are allowed");
  });
});





describe("test sur la playlist avec de multiples chansons", () => {
  let playlist;

  beforeEach(() => {
    playlist = new Playlist();
  });

  test("ajouter plusieurs chansons avec succès", () => {
    const songs = [
      {
        title: "Demons",
        artist: "Imagine Dragons",
        album: "Night Visions",
        type: "song",
      },
      {
        title: "Radioactive",
        artist: "Imagine Dragons",
        album: "Night Visions",
        type: "song",
      },
      {
        title: "Thunder",
        artist: "Imagine Dragons",
        album: "Evolve",
        type: "song",
      },
    ];

    expect(() => {
      songs.forEach(song => playlist.addSong(song));
    }).not.toThrow();

    expect(playlist.getPlaylist()).toEqual(
      expect.arrayContaining(songs.map(s => expect.objectContaining(s)))
    );
  });

  test("récupérer plusieurs chansons d'un album", () => {
    const songs = [
      {
        title: "Demons",
        artist: "Imagine Dragons",
        album: "Night Visions",
        type: "song",
      },
      {
        title: "Radioactive",
        artist: "Imagine Dragons",
        album: "Night Visions",
        type: "song",
      },
    ];

    songs.forEach(song => playlist.addSong(song));

    expect(playlist.getSong("Night Visions")).toEqual(
      expect.arrayContaining([
        expect.objectContaining(songs[0]),
        expect.objectContaining(songs[1]),
      ])
    );
  });

  test("supprimer plusieurs chansons de la playlist", () => {
    const songs = [
      {
        title: "Demons",
        artist: "Imagine Dragons",
        album: "Night Visions",
        type: "song",
      },
      {
        title: "Radioactive",
        artist: "Imagine Dragons",
        album: "Night Visions",
        type: "song",
      },
    ];

    songs.forEach(song => playlist.addSong(song));
    songs.forEach(song => playlist.removeSong(song));

    expect(playlist.getPlaylist()).toEqual([]);
  });

  test("ajouter plusieurs morceaux invalides (OneRepublic) avec erreur", () => {
    const invalidSongs = [
      {
        title: "Counting Stars",
        artist: "OneRepublic",
        album: "Native",
        type: "song",
      },
      {
        title: "I Lived",
        artist: "OneRepublic",
        album: "Native",
        type: "song",
      },
    ];

    invalidSongs.forEach(song => {
      expect(() => playlist.addSong(song))
        .toThrow("Artiste et album non autorisés");
    });
  });

  test("ajouter des type différent", () => {
  const invalidType = [
    {
      title: "Imagine Dragons Podcast",
      artist: "Imagine Dragons",
      album: "Evolve",
      type: "podcast",
    },
    {
      title: "Imagine Dragons Movie",
      artist: "Imagine Dragons",
      album: "Evolve",
      type: "movie",
    },
  ];

  invalidType.forEach(song => {
    expect(() => playlist.addSong(song))
      .toThrow("Only song are allowed");
  });
});

});