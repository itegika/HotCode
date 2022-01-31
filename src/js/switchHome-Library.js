import { fetchTrendsGallery } from './cardMaket.js';
import { actionsWithLibraryRender } from './library.js';
import './apiItems.js';
import { Notify } from 'notiflix';

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
  if (localStorage.getItem('email')) {
    accessLibrary();
  } else {
    myLibrary.library.classList.remove('current');
    Notify.info('Please, register or sign in for access');
    accessHome();
  }
}

function accessLibrary() {
  myLibrary.library.classList.add('current');
  body.classList.replace('home-bcg', 'library-bcg');
  myLibrary.form.classList.add('hidden');
  myLibrary.libraryBtns.classList.remove('hidden');
  myLibrary.home.classList.remove('current');
  actionsWithLibraryRender();
}

export function accessHome() {
  myLibrary.library.classList.remove('current');
  body.classList.replace('library-bcg', 'home-bcg');
  myLibrary.form.classList.remove('hidden');
  myLibrary.libraryBtns.classList.add('hidden');
  myLibrary.home.classList.add('current');
  fetchTrendsGallery();
}
