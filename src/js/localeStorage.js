import renderGallery from './cardMaket';
import { fetchById } from './apiItems';
import Notiflix from "notiflix";
import {onMovieClick} from "./cardMaket"
localStorage.clear();
if (!localStorage.getItem("watchedArr")) {
  localStorage.setItem("watchedArr", "[]");
}
if (!localStorage.getItem("queueArr")) {
  localStorage.setItem("queueArr", "[]");
}
//  const changeWatchedButton = () => {
//   const buttonAddToWatched = document.querySelector(".watched__button");
//   buttonAddToWatched.removeEventListener('click', addToWatched);
//   buttonAddToWatched.classList.replace("watched__button", "remove__from__watched")
//   const buttonRemoveFromWatched = document.querySelector(".remove__from__watched");
//   buttonRemoveFromWatched.textContent = "Added to watched";
// }
//   const changeQueueButton = () => {
//   const buttonAddToQueue = document.querySelector(".queve__button");
//   buttonAddToQueue.removeEventListener('click', addToQueue);
//   buttonAddToQueue.classList.replace("queve__button", "remove__from__queue")
//   const buttonRemoveFromQueue = document.querySelector(".remove__from__queue");
//   buttonRemoveFromQueue.textContent = "Added to Queue";
// }
export function addToWatched() {
  const imgLink = document.querySelector(".modal__img-link");
  const id = imgLink.dataset.id;
  const watchedFilmArr = Array.from(JSON.parse(localStorage.getItem("watchedArr")));
  console.log(watchedFilmArr)
  if (checkup({id},watchedFilmArr)) {
   Notiflix.Notify.failure("Error, film is already in watched");
    return;
  } else {
    watchedFilmArr.push({id});

    console.log("watched",watchedFilmArr);
    localStorage.setItem("watchedArr", JSON.stringify(watchedFilmArr));
    Notiflix.Notify.success("Film have been added to watched");
      const buttonAddToWatched = document.querySelector(".watched__button");
  buttonAddToWatched.removeEventListener('click', addToWatched);
  buttonAddToWatched.classList.replace("watched__button", "remove__from__watched")
  const buttonRemoveFromWatched = document.querySelector(".remove__from__watched");
  buttonRemoveFromWatched.textContent = "Added to watched";
  }
    
  }
export function addToQueue() {

  const imgLink = document.querySelector(".modal__img-link");
  const id = imgLink.dataset.id;

  const queueArr = Array.from(JSON.parse(localStorage.getItem("queueArr")));
  console.log(queueArr);
  if (checkup({id},queueArr)) {
   Notiflix.Notify.failure("Error, film is already in Queue");
    return;
  } else {
    queueArr.push({ id });
    console.log("queue", queueArr);
    localStorage.setItem("queueArr", JSON.stringify(queueArr));
    Notiflix.Notify.success("Film have been added to Queue");
    const buttonAddToQueue = document.querySelector(".queve__button");
    buttonAddToQueue.textContent = "Added to Queue";
    buttonAddToQueue.removeEventListener('click', addToQueue);
    buttonAddToQueue.classList.replace("queve__button", "remove__from__queue")
    const buttonRemoveFromQueue = document.querySelector(".remove__from__queue");
  //   buttonRemoveFromQueue.textContent = "Added to Queue";
  }   
    // changeQueueButton();

}
export function renderWatched() {
  const BASEimgURL ='https://image.tmdb.org/t/p/'
const SIZE = 'w500'
const layout__list = document.querySelector('.layout__list');
  layout__list.innerHTML = "";
  const arr = JSON.parse(localStorage.getItem("watchedArr"));
  console.log(arr);
  arr.map((movie => {
    fetchById(movie.id).then(data => {
      console.log(data);
      const markup = `<li class="layout__item">    
                      <a class="layout__link" href="#" data-id="${data.id}">
                      <img class="layout__image" src="${BASEimgURL}${SIZE}${data.poster_path}" alt="${data.title}" width="" loading="lazy" />
                      </a>                      
                      <ul class="attribut__list">
                          <li class="attribut__item-title">${data.original_title}</li>
             <li class="attribut__item">${data.genres.map((gen => gen.name)).join(', ')}</li>
                          <li class="attribut__item">${data.release_date.slice(0, 4)}</li>
                          <li class="attribut__item rating__value">${data.vote_average}</li>
                      </ul>
                  </li>`
      layout__list.insertAdjacentHTML('afterbegin', markup);
       
    }).catch(error => { console.log(error.message) })
  }));

   layout__list.addEventListener('click', onMovieClick);
  return layout__list;
}
export function renderQueue() {
   const BASEimgURL ='https://image.tmdb.org/t/p/'
const SIZE = 'w500'
const layout__list = document.querySelector('.layout__list');
  layout__list.innerHTML = "";
  const arr = JSON.parse(localStorage.getItem("queueArr"));
  console.log(arr);
  arr.map((movie => {
    fetchById(movie.id).then(data => {
      console.log(data);
      const markup = `<li class="layout__item">    
                      <a class="layout__link" href="#" data-id="${data.id}">
                      <img class="layout__image" src="${BASEimgURL}${SIZE}${data.poster_path}" alt="${data.title}" width="" loading="lazy" />
                      </a>                      
                      <ul class="attribut__list">
                          <li class="attribut__item-title">${data.original_title}</li>
             <li class="attribut__item">${data.genres.map((gen => gen.name)).join(', ')}</li>
                          <li class="attribut__item">${data.release_date.slice(0, 4)}</li>
                          <li class="attribut__item rating__value">${data.vote_average}</li>
                      </ul>
                  </li>`
      layout__list.insertAdjacentHTML('afterbegin', markup);
       
    }).catch(error => { console.log(error.message) })
  }));
  return layout__list;
}

export function checkup(film, filmsArr) {
  let status = false; 
  console.log("info from checkup", film.id);
  console.log("info from checkup", filmsArr.length);
  for (let i = 0; i < filmsArr.length; i++) {
  console.log("info from checkup", filmsArr[i].id);

    if (Number(filmsArr[i].id) === Number(film.id)) {
      console.log("fuck")
      status = true;
      return status;
    }
  }
  return status;
}
 
