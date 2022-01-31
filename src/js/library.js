import Notiflix from 'notiflix';
import { renderWatched, renderQueue } from './localeStorage';
import './apiItems.js';

const buttonWatched = document.querySelector('.watched');
const buttonQueue = document.querySelector('.queue');
const watchedArr = JSON.parse(localStorage.getItem('watchedArr'));
const queueArr = JSON.parse(localStorage.getItem('queueArr'));
const layout__list = document.querySelector('.layout__list');
const pagination = document.querySelector('#pagination');

export function actionsWithLibraryRender() {
  if (queueArr.length !== 0) {
    buttonQueue.classList.add('current');
    renderQueue();
  } else if (queueArr.length === 0 && watchedArr.length !== 0) {
    buttonWatched.classList.add('current');
    renderWatched();
  } else {
    Notiflix.Notify.failure('Library is empty');
    layout__list.innerHTML = '';
    buttonWatched.disabled = 'true';
    buttonQueue.disabled = 'true';
    pagination.innerHTML = '';
  }
  buttonWatched.addEventListener('click', () => {
    buttonQueue.classList.remove('current');
    buttonWatched.classList.add('current');
    if (watchedArr.length !== 0) {
      renderWatched();
    } else {
      Notiflix.Notify.failure('Watched is empty');
      layout__list.innerHTML = '';
    }
  });

  buttonQueue.addEventListener('click', () => {
    buttonWatched.classList.remove('current');
    buttonQueue.classList.add('current');
    if (queueArr.length !== 0) {
      renderQueue();
    } else {
      Notiflix.Notify.failure('Queue is empty');
      layout__list.innerHTML = '';
    }
  });
}
