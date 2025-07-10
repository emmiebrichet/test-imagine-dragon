document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("addSongForm");
  const playlist = document.getElementById("playlist");
  const API_URL = "/songs";

  async function fetchSongs() {
    const res = await fetch(API_URL);
    const songs = await res.json();
    renderSongs(songs);
  }

  function renderSongs(songs) {
    playlist.innerHTML = "";
    songs.forEach(song => {
      const li = document.createElement("li");

      const isAudio = /\.(mp3|wav|ogg|m4a)$/i.test(song.url);

      li.innerHTML = isAudio
        ? `<strong>${song.title}</strong> - ${song.artist}<br><audio controls src="${song.url}"></audio><button>Supprimer</button>`
        : `<a href="${song.url}" target="_blank">${song.title} - ${song.artist}</a><button>Supprimer</button>`;

      li.querySelector("button").addEventListener("click", async () => {
        await fetch(`${API_URL}/${song.id}`, { method: "DELETE" });
        fetchSongs();
      });

      playlist.appendChild(li);
    });
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const title = form.title.value.trim();
    const artist = form.artist.value.trim();
    const url = form.url.value.trim();
    if (!title || !url) return;

    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, artist, url })
    });

    form.reset();
    form.artist.value = "Imagine Dragons";
    fetchSongs();
  });

  fetchSongs();
});
