import renderGallery from './cardMaket';
import { fetchById } from './apiItems';
import Notiflix from "notiflix";
import { onMovieClick } from "./cardMaket";
// import { renderPagination } from './paginator';

// localStorage.clear(); 
if (!localStorage.getItem("watchedArr")) {
  localStorage.setItem("watchedArr", "[]");
}
if (!localStorage.getItem("queueArr")) {
  localStorage.setItem("queueArr", "[]");
}



export function watchedActions() {
  const imgLink = document.querySelector(".modal__img-link");
  const id = imgLink.dataset.id;
  const watchedFilmArr = Array.from(JSON.parse(localStorage.getItem("watchedArr")));
  const buttonWatched = document.querySelector(".watched__button");
  if(!buttonWatched.classList.contains("remove__watched")){
        watchedFilmArr.push(id);
        console.log("watched", watchedFilmArr);
        localStorage.setItem("watchedArr", JSON.stringify(watchedFilmArr));
        Notiflix.Notify.success("Film have been added to watched");
    buttonWatched.classList.add("remove__watched");
    // buttonWatched.classList.remove("watched__button");
    buttonWatched.textContent = "Added to watched";
  } else {
    removeFromWatched();
    buttonWatched.classList.remove("remove__watched");
    // buttonWatched.classList.add("watched__button");
    buttonWatched.textContent = "Add to watched";
  }
}



export function queueActions() {
  const imgLink = document.querySelector(".modal__img-link");
  const id = imgLink.dataset.id;
  const queueArr = Array.from(JSON.parse(localStorage.getItem("queueArr")));
  const buttonQueue = document.querySelector(".queve__button");   
  if (!buttonQueue.classList.contains("remove__queue")){
    queueArr.push(id);
    console.log("queue", queueArr);
    localStorage.setItem("queueArr", JSON.stringify(queueArr));
    Notiflix.Notify.success("Film have been added to Queue");
    buttonQueue.classList.add("remove__queue");
    // buttonQueue.classList.remove("queve__button");
    buttonQueue.textContent = "Added to Queue";
  } else {
    removeFromQueue();
    buttonQueue.classList.remove("remove__queue");
    // buttonQueue.classList.add("queve__button");
    buttonQueue.textContent = "Add to Queue";
  }   
}


export function renderWatched() {
  const BASEimgURL ='https://image.tmdb.org/t/p/'
  const SIZE = 'w500'
  const layout__list = document.querySelector('.layout__list');
  const pagination = document.querySelector("#pagination");
  pagination.innerHTML = "";
  layout__list.innerHTML = "";
  const arr = JSON.parse(localStorage.getItem("watchedArr"));
  console.log(arr);
  arr.map((idMovie => {
    fetchById(idMovie).then(data => {
      console.log(data);
      const markup = `<li class="layout__item">    
                      <a class="layout__link" href="#" data-id="${data.id}">
                      <img class="layout__image" src="${BASEimgURL}${SIZE}${data.poster_path}" alt="${data.title}" width="" loading="lazy" />
                      </a>                      
                      <ul class="attribut__list">
                          <li class="attribut__item-title">${data.original_title}</li>
             <li class="attribut__item">${data.genres.map(gen => gen.name).slice(0, 3).join(', ')}</li>
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
  const pagination = document.querySelector("#pagination");
  pagination.innerHTML = "";
  layout__list.innerHTML = "";
  const arr = JSON.parse(localStorage.getItem("queueArr"));
  console.log(arr);
  arr.map((idMovie => {
    fetchById(idMovie).then(data => {
      console.log(data);
      const markup = `<li class="layout__item">    
                      <a class="layout__link" href="#" data-id="${data.id}">
                      <img class="layout__image" src="${BASEimgURL}${SIZE}${data.poster_path}" alt="${data.title}" width="" loading="lazy" />
                      </a>                      
                      <ul class="attribut__list">
                          <li class="attribut__item-title">${data.original_title}</li>
             <li class="attribut__item">${data.genres.map(gen => gen.name).slice(0, 3).join(', ')}</li>
                          <li class="attribut__item">${data.release_date.slice(0, 4)}</li>
                          <li class="attribut__item rating__value">${data.vote_average}</li>
                      </ul>
                  </li>`
      layout__list.insertAdjacentHTML('afterbegin', markup);
       
    }).catch(error => { console.log(error.message) })
  }));
  return layout__list;
}



export function checkup(id, idFilmsArr) {
  let status = false; 
  for (let i = 0; i < idFilmsArr.length; i++) {
    if (Number(idFilmsArr[i]) === Number(id)) {
      console.log("fuck")
      status = true;
      return status;
    }
  }
  return status;
}


 export function removeFromQueue() {
  const queueArr = JSON.parse(localStorage.getItem("queueArr"));
  const imgLink =  document.querySelector(".modal__img-link");
  const id =  imgLink.dataset.id;
  const newArr =  queueArr.filter(elem => elem != id);
  console.log(newArr);
  localStorage.setItem("queueArr", JSON.stringify(newArr));
 }
 export function removeFromWatched() {
  const watchedArr = JSON.parse(localStorage.getItem("watchedArr"));
  const imgLink =  document.querySelector(".modal__img-link");
  const id =  imgLink.dataset.id;
  const newArr =  watchedArr.filter(elem => elem != id);
  console.log(newArr);
  localStorage.setItem("watchedArr", JSON.stringify(newArr));
 }