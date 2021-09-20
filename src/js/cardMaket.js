import { fetchById } from './apiItems';
import { fetchGenres} from './apiItems';
import { fetchTrends} from './apiItems';
import {renderMovieCard} from './modal';

const BASEimgURL ='https://image.tmdb.org/t/p/'
const SIZE = 'w500'
const layout__list = document.querySelector('.layout__list');
console.log(layout__list);
document.addEventListener('DOMContentLoaded', fetchTrendsGallery);
async function fetchTrendsGallery(e) {
  try {
    const movies = await fetchTrends(1);
    const genres = await fetchGenres();
    const newMovies = movies.map(el=>{
        const arr = el.genre_ids.map(genre=>{
             return genres.find(el=>el.id === genre).name      
    })

   

    return {...el, genre: arr}
});
const gal = renderGallery(newMovies);
const items = document.querySelectorAll('.layout__link');
 items.forEach(item=>{
     item.addEventListener('click', onMovieClick);
 }); 
renderGallery (newMovies);
} catch (error) {
    console.error(error);
}
}
export default function renderGallery(newMovies) {
      const markup = newMovies.map((movie => {
          return `<li class="layout__item">    
                      <a class="layout__link" href="#" data-id="${movie.id}">
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


function onMovieClick(event) {

    event.preventDefault();
    const movie_id = event.target.nodeName === "IMG" ? event.target.parentNode.dataset.id : event.target.dataset.id;
    // console.log(event.target.parentNode.dataset.id);
    // console.log(event.target.dataset.id);
    const movie = fetchById(movie_id).then(data => {
    const modalBlock = document.querySelector('.modal');
    modalBlock.classList.remove('is-hidden');
    const main = document.querySelector("main");
    main.classList.add("backdrop");
  
    modalBlock.innerHTML = renderMovieCard(data);
    const closeButton = modalBlock.querySelector('.close__modal');
    closeButton.addEventListener('click', e=> {
      e.preventDefault();
  
      e.target.parentNode.classList.toggle('is-hidden');
      console.log(e.target);
      main.classList.remove("backdrop");
      
    })
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        closeButton.parentNode.classList.toggle('is-hidden');
        main.classList.remove("backdrop");
      }
      });
    });
    // console.log(movie);
  
    return movie;
  } 

  