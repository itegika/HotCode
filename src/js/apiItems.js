import axios from 'axios';
const URL = 'https://api.themoviedb.org/3';
const KEY = '15f17b74af157d4eeef693405d33f902';
async function fetchTrends(page) {
    const request = await axios.get(`${URL}/trending/movie/week?api_key=${KEY}&page=${page}`);
    console.log(request);
    const data = request.data;
    console.log(data);
    const result = data.results;
    console.log(result);
    // console.log(result[0]);
    return result;
  }
document.addEventListener('DOMContentLoaded', fetchTrendsGallery);
console.log(document);
async function fetchTrendsGallery(e) {
  // e.preventDefault();
  try {
    const movies = await fetchTrends(1);
    console.log(movies);
    renderGallery(movies);
    // console.log(movies);
  } catch (error) {
    console.error(error);
  }
}

const layout__list = document.querySelector('.layout__list');
console.log(layout__list);
function renderGallery(movies) {
    console.log(movies);
      const markup = movies.map((movie => {
          return `<li class="layout__item">
                      <a class="layout__link" href="${movie.poster_path}">
                      <img class="layout__image" src="${movie.poster_path}" alt="${movie.title}" width="" loading="lazy" />
                      </a>
                      <ul class="attribut__list">
                          <li class="attribut__item">${movie.original_title}</li>
                          <li class="attribut__item">${movie.genre_ids.map(genre => {
                            return `${movie.genre_ids[0]}`})}
                        </li> 
                          <li class="attribut__item">${movie.release_date}</li>
                      </ul>
                  </li>`
      })).join('');
          layout__list.insertAdjacentHTML('beforeend', markup);
          return layout__list;
      }