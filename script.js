// app.js

const form = document.getElementById('addSongForm');
const playlist = document.getElementById('playlist');

// On stocke la playlist dans localStorage pour persister entre sessions
let songs = JSON.parse(localStorage.getItem('songs')) || [];

// Fonction pour afficher la playlist
function renderPlaylist() {
  playlist.innerHTML = '';
  songs.forEach((song, index) => {
    const li = document.createElement('li');

    // Lien vers la chanson
    const link = document.createElement('a');
    link.href = song.url;
    link.target = '_blank';
    link.textContent = song.title;

    // Bouton supprimer
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Supprimer';
    deleteBtn.addEventListener('click', () => {
      songs.splice(index, 1);
      saveAndRender();
    });

    li.appendChild(link);
    li.appendChild(deleteBtn);
    playlist.appendChild(li);
  });
}

// Sauvegarde dans localStorage puis rend la liste
function saveAndRender() {
  localStorage.setItem('songs', JSON.stringify(songs));
  renderPlaylist();
}

// Gestion du submit du formulaire
form.addEventListener('submit', e => {
  e.preventDefault();

  const title = form.title.value.trim();
  const url = form.url.value.trim();

  if (title && url) {
    songs.push({ title, url });
    saveAndRender();

    form.reset();
    form.title.focus();
  }
});

// Initial render
renderPlaylist();
