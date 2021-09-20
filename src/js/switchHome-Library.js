import Notiflix from "notiflix";
import {renderWatched, renderQueue} from "./localeStorage"
const body = document.body;

body.classList.add('home-bcg');

const myLibrary = {
  library: document.querySelector('.menu__link-library'),
  home: document.querySelector('.menu__link-home'),
  form: document.querySelector('.search-form'),
  libraryBtns: document.querySelector('.libraryBtns'),
};

myLibrary.libraryBtns.classList.add('hidden');
myLibrary.library.addEventListener('click', onClick);
function onClick(e) {
  // console.log(e.target);

  e.target.classList.add('current');
 
      const buttonWatched = document.querySelector(".watched");
  const buttonQueue = document.querySelector(".queue");
  const watchedArr = JSON.parse(localStorage.getItem("watchedArr"))
  const queueArr = JSON.parse(localStorage.getItem("queueArr"))
  if (watchedArr.length !== 0) {
    buttonWatched.classList.add("current");
    renderWatched();
  } else if (queueArr.length !== 0) {
    buttonQueue.classList.add("current");
    renderQueue();
  } else {
    Notiflix.Notify.failure("Library is empty");
  }
  buttonWatched.addEventListener("click", () => {
    buttonQueue.classList.remove("current");
    buttonWatched.classList.add("current");
    renderWatched();
  })
  buttonQueue.addEventListener("click", () => {
    buttonWatched.classList.remove("current");
    buttonQueue.classList.add("current");
    renderQueue();
  })
  if (myLibrary.library.classList.contains('current')) {
    body.classList.replace('home-bcg', 'library-bcg');
    myLibrary.form.classList.add('hidden');
    myLibrary.libraryBtns.classList.remove('hidden');
    myLibrary.home.classList.remove('current');
  }
}
