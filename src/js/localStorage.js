import renderGallery from './cardMaket';
import Notiflix from "notiflix";
// localStorage.clear();
if (!localStorage.getItem("watchedArr")) {
  localStorage.setItem("watchedArr", "[]");
}
if (!localStorage.getItem("queueArr")) {
  localStorage.setItem("queueArr", "[]");
}
export function addToWatched() {
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
  const watchedFilmArr = Array.from(JSON.parse(localStorage.getItem("watchedArr")));
  console.log(watchedFilmArr);
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
  console.log(queueArr);
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
function checkup(film, filmsArr) {
  let status = false;
  for (let i = 0; i < filmsArr.length; i++) {
    if (filmsArr[i].title === film.title) {
      status = true;
      return status;
    }
  }
  return status;
}