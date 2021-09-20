import { fetchById } from './apiItems';
import { fetchGenres} from './apiItems';
import { fetchTrends} from './apiItems';
import { renderMovieCard } from './modal';
import { addToQueue, addToWatched } from './localeStorage';

const BASEimgURL ='https://image.tmdb.org/t/p/'
const SIZE = 'w500'
const layout__list = document.querySelector('.layout__list');
//////console.log(layout__list);
document.addEventListener('DOMContentLoaded', fetchTrendsGallery);
//////console.log(fetchTrends)
async function fetchTrendsGallery(e) {
  try {
    const movies = await fetchTrends(1);
    //////console.log(movies);
    const genres = await fetchGenres();
    const genresId = movies.map((el => el.genre_ids))
    //////console.log(genres);
    const newMovies = movies.map(el=>{
        //////console.log(el);
        const arr = el.genre_ids.map(genre=>{
             return genres.find(el=>el.id === genre).name      
    })

   

    return {...el, genre: arr}
});
const gal = renderGallery(newMovies);

//////console.log(gal);
 const items = document.querySelectorAll('.layout__link');
 //////console.log(items);
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
    // //////console.log(event.target.parentNode.dataset.id);
    // //////console.log(event.target.dataset.id);
    const movie = fetchById(movie_id).then(data => {
    const modalBlock = document.querySelector('.modal');
    modalBlock.classList.remove('is-hidden');
    const main = document.querySelector("main");
    main.classList.add("backdrop");
      
      modalBlock.innerHTML = renderMovieCard(data);
      const buttonAddToWatched = modalBlock.querySelector(".watched__button")
      const buttonAddToQueue = modalBlock.querySelector(".queve__button")
      buttonAddToWatched.addEventListener("click",addToWatched)
      buttonAddToQueue.addEventListener("click",addToQueue )
    const closeButton = modalBlock.querySelector('.close__modal');
    closeButton.addEventListener('click', e=> {
      e.preventDefault();
      buttonAddToQueue.removeEventListener("click", addToQueue);
      buttonAddToWatched.removeEventListener("click",addToWatched)
      e.target.parentNode.classList.toggle('is-hidden');
      //////console.log(e.target);
      main.classList.remove("backdrop");
      
    })
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
      buttonAddToQueue.removeEventListener("click", addToQueue);
      buttonAddToWatched.removeEventListener("click",addToWatched)
        closeButton.parentNode.classList.toggle('is-hidden');
        main.classList.remove("backdrop");
      }
      });

      document.addEventListener("mouseup", function(e) {
        // //////console.log(e.target);
        const container = document.querySelector("main");
        if (e.target === container) {
          const modal = document.querySelector(".modal");
          closeButton.parentNode.classList.toggle('is-hidden');
          main.classList.remove("backdrop");
        }   
      });

    });
    // //////console.log(movie);
  
    return movie;
  } 

  