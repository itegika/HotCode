import { fetchGenres} from './apiItems';
import { fetchTrends} from './apiItems';
const BASEimgURL ='https://image.tmdb.org/t/p/'
const SIZE = 'w500'
const layout__list = document.querySelector('.layout__list');
console.log(layout__list);
document.addEventListener('DOMContentLoaded', fetchTrendsGallery);
console.log(fetchTrends)
async function fetchTrendsGallery(e) {
  try {
    const movies = await fetchTrends(1);
    console.log(movies);
    const genres = await fetchGenres();
    const genresId = movies.map((el => el.genre_ids))
    console.log(genres);
    const newMovies = movies.map(el=>{
        console.log(el);
        const arr = el.genre_ids.map(genre=>{
             return genres.find(el=>el.id === genre).name      
    })
    return {...el, genre: arr}
});
renderGallery (newMovies, genres);
} catch (error) {
    console.error(error);
}
}
export default function renderGallery(newMovies, genres) {
    console.log(newMovies);
      const markup = newMovies.map((movie => {
          return `<li class="layout__item">
                      
                      <img class="layout__image" src="${BASEimgURL}${SIZE}${movie.poster_path}" alt="${movie.title}" width="" loading="lazy" />
                      </a>
                      <ul class="attribut__list">
                          <li class="attribut__item-title">${movie.original_title}</li>
                          <li class="attribut__item">${movie.genre.map ((gen => gen)).join(', ')}</li>
                          <li class="attribut__item">${movie.release_date.slice(0,4)}</li>
                      </ul>
                  </li>`
      })).join('');
          layout__list.insertAdjacentHTML('beforeend', markup);
          return layout__list;
      }
