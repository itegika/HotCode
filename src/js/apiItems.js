import axios from 'axios';
import renderGallery from './cardMaket';
const URL = 'https://api.themoviedb.org/3';
const KEY = '15f17b74af157d4eeef693405d33f902';

async function fetchTrends(page) {
  const request = await axios.get(`${URL}/trending/movie/week?api_key=${KEY}&page=${page}`);
  const result = request.data.results;
  return result;
}
document.addEventListener('DOMContentLoaded', fetchTrendsGallery);

async function fetchTrendsGallery(e) {
  try {
    const movies = await fetchTrends(1);
    console.log(movies);
    renderGallery(movies);
  } catch (error) {
    console.error(error);
  }
}

function renderGallery(movies) {
  console.log(movies);
  const markup = movies
    .map(movie => {
      return `<li class="layout__item">
                      <a class="layout__link" href="${movie.poster_path}">
                      <img class="layout__image" src="${movie.backdrop_path}" alt="${
        movie.title
      }" width="" loading="lazy" />
                      </a>
                      <ul class="attribut__list">
                          <li class="attribut__item">${movie.original_title}</li>
                          <li class="attribut__item">${movie.genre_ids.map(genre => {
                            return `<span>${movie.genre_ids[0]}</span>`;
                          })}
                        </li> 
                          <li class="attribut__item">${movie.release_date}</li>
                      </ul>
                  </li>`;
    })
    .join('');
  gallery.insertAdjacentHTML('beforeend', markup);
  return gallery;
}

async function fetchGenres() {
  try {
    const res = await axios.get(`${URL}/genre/movie/list?api_key=${KEY}`);
    const genres = res.data.genres;
    console.log(genres);
  } catch (error) {
    console.error(error);
  }
}
fetchGenres();
