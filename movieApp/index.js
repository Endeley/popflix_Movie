API_URL = 'https://api.themoviedb.org/3/movie/popular?api_key=edd701bfa079e9ab8135ee057cf3c82a';
SEARCH_API = 'https://api.themoviedb.org/3/movie/search?api_key=edd701bfa079e9ab8135ee057cf3c82a&query="';
IMG_PATH = 'https://image.tmdb.org/t/p/original/';

const main = document.getElementById('main');
const form = document.getElementById('form');

const search = document.getElementById('search');

getMovies(API_URL);

async function getMovies(url) {
  const res = await fetch(url);
  const data = await res.json();
  showMovies(data.results);
}

function showMovies(movies) {
  main.innerHTML = '';
  movies.forEach((movie) => {
    const { title, poster_path, vote_average, overview } = movie;

    const div = document.createElement('div');
    div.classList.add('movie');
    div.innerHTML = `      
           <img src="${IMG_PATH + poster_path}" alt="${title}" />
           <div class="movie-info">
             <h3>${title}</h3>
             <span class="${getClassByRate(vote_average)}">${vote_average}</span>
           </div>
           <div class="overview">
             <h3>Overview</h3>
             ${overview}
           </div>
         `;
    main.appendChild(div);
  });
}

function getClassByRate(vote) {
  if (vote >= 7) {
    return 'green';
  } else if (vote >= 5) {
    return 'orange';
  } else {
    return 'red';
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const searchTerm = search.value;

  if (searchTerm && searchTerm !== '') {
    search.value = '';
  } else {
    window.location.reload();
  }
});
