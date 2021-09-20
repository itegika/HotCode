import axios from 'axios';
import renderGallery from './cardMaket';
import {renderMovieCard} from './modal';

const URL = 'https://api.themoviedb.org/3';
const KEY = '15f17b74af157d4eeef693405d33f902';

async function fetchTrends(page) {
  const request = await axios.get(`${URL}/trending/movie/week?api_key=${KEY}&page=${page}`);
  const result = request.data.results;
  console.log(result);
  return result;
}


document.addEventListener('DOMContentLoaded', fetchTrendsGallery);

async function fetchTrendsGallery(e) {
  try {
    const movies = await fetchTrends(1);
    console.log(movies);
    const gal = renderGallery(movies);

   console.log(gal);
    const els = document.querySelectorAll('.layout__link');
    console.log(els);
    els.forEach(el=>{
        el.addEventListener('click', onMovieClick);
    }); 
        
    // console.log(els);
    // console.log(e.target);
    // console.log(movies);
  } catch (error) {
    console.error(error);
  }
}

async function fetchGenres() {
  try {
    const res = await axios.get(`${URL}/genre/movie/list?api_key=${KEY}`);
    const genres = res.data.genres;
    console.log(genres);
    return genres;
  } catch (error) {
    console.error(error);
  }
}
fetchGenres();

export async function fetchById(movie_id) {
  try {
    const result = await axios.get(`${URL}/movie/${movie_id}?api_key=${KEY}`);
    console.log(result.data);
    return result.data;
  } catch (error) {
    console.error(error);
  }
}
fetchById(296777);


function onMovieClick(event) {

  event.preventDefault();
  const movie_id = event.target.nodeName === "IMG" ? event.target.parentNode.dataset.id : event.target.dataset.id;
  // console.log(event.target.parentNode.dataset.id);
  // console.log(event.target.dataset.id);
  const movie = fetchById(movie_id).then(data => {
  const modalBlock = document.querySelector('.modal');
  modalBlock.classList.remove('is-hidden');
  modalBlock.innerHTML = renderMovieCard(data);
  const closeButton = modalBlock.querySelector('.close__modal');
  closeButton.addEventListener('click', e=> {
    e.preventDefault();

    e.target.parentNode.classList.toggle('is-hidden');
  })
  });
  // console.log(movie);

  return movie;
} 