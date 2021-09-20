import renderGallery from './cardMaket';
import { fetchById } from './apiItems';
import Notiflix from "notiflix";
import {onMovieClick} from "./cardMaket"
// localStorage.clear();
if (!localStorage.getItem("watchedArr")) {
  localStorage.setItem("watchedArr", "[]");
}
if (!localStorage.getItem("queueArr")) {
  localStorage.setItem("queueArr", "[]");
}
export function addToWatched() {
  const imgLink = document.querySelector(".modal__img-link");
  // console.log(title.textContent, img.src, genre.textContent, popularity.textContent, description.textContent);
  const film = {
    id: imgLink.dataset.id,
  };
  const watchedFilmArr = Array.from(JSON.parse(localStorage.getItem("watchedArr")));
  console.log(watchedFilmArr)
  if (checkup(film,watchedFilmArr)) {
   Notiflix.Notify.failure("Error, film is already in watched");
    return;
  } else {
     
    watchedFilmArr.push(film);
    console.log(watchedFilmArr);
    localStorage.setItem("watchedArr", JSON.stringify(watchedFilmArr));
    Notiflix.Notify.success("Film have been added to watched");
    } 
  }
export function addToQueue() {
    const title = document.querySelector(".modal__title");
  const img = document.querySelector(".modal__img");
  const genre = document.querySelector(".modal__description-list").children[3];
  const popularity = document.querySelector(".modal__description-list").children[1];
  const description = document.querySelector(".modal__about-text");
    const imgLink = document.querySelector(".modal__img-link");
  // console.log(title.textContent, img.src, genre.textContent, popularity.textContent, description.textContent);
  const film = {
    title: title.textContent,
    img: img.src,
    genre: genre.textContent,
    popularity: popularity.textContent,
    description: description.textContent,
        id: imgLink.dataset.id,

  };
  const queueArr = Array.from(JSON.parse(localStorage.getItem("queueArr")));
  // console.log(queueArr);
  if (checkup(film,queueArr)) {
   Notiflix.Notify.failure("Error, film is already in Queue");
    return;
  } else {
    queueArr.push(film);
    console.log(queueArr);
    localStorage.setItem("queueArr", JSON.stringify(queueArr));
    Notiflix.Notify.success("Film have been added to Queue");
  }
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

function checkup(film, filmsArr) {
  let status = false;
  for (let i = 0; i < filmsArr.length; i++) {
    if (filmsArr[i].id === film.id) {
      
      status = true;
      return status;
    }
  }
  return status;
}
