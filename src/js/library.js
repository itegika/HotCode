import Notiflix from 'notiflix';
import { renderWatched, renderQueue } from './localeStorage';
import './apiItems.js';

export function actionsWithLibraryRender() {
  const buttonWatched = document.querySelector('.watched');
  const buttonQueue = document.querySelector('.queue');
  const watchedArr = JSON.parse(localStorage.getItem('watchedArr'));
  const queueArr = JSON.parse(localStorage.getItem('queueArr'));
  if (watchedArr.length === 0 && queueArr.length === 0) {
    const image = document.querySelector('.background-image');
    image.classList.remove('arehidden');
    Notiflix.Notify.failure('Library is empty');
    buttonWatched.disabled = 'true';
    buttonQueue.disabled = 'true';
    const layout__list = document.querySelector('.layout__list');
    const pagination = document.querySelector('#pagination');
    pagination.innerHTML = '';
    layout__list.innerHTML = '';
    document
      .querySelector('.layout')
      .insertAdjacentHTML(
        'beforebegin',
        "<div class='error-container'><p class='error__message'>Oops..., nothing found</p></div>",
      );
  } else {
    if (watchedArr.length !== 0 && queueArr.length !== 0) {
      buttonWatched.classList.add('current');
      renderWatched();
    } else if (watchedArr.length !== 0 && queueArr.length === 0) {
      buttonWatched.classList.add('current');
      renderWatched();
    } else if (watchedArr.length === 0 && queueArr.length !== 0) {
      buttonQueue.classList.add('current');
      renderQueue();
    }
  }

  buttonWatched.addEventListener('click', () => {
    const watchedArr = JSON.parse(localStorage.getItem('watchedArr'));
    buttonQueue.classList.remove('current');
    buttonWatched.classList.add('current');
    if (watchedArr.length !== 0) {
      if (document.querySelector('.error-container')) {
        document.querySelector('.error-container').remove();
      }
      if (!document.querySelector('.arehidden')) {
        const image = document.querySelector('.background-image');
        image.classList.remove('arehidden');
        image.classList.add('arehidden');
      }
      renderWatched();
    } else {
      if (document.querySelector('.error-container')) {
        document.querySelector('.error-container').remove();
      }
      if (document.querySelector('.arehidden')) {
        const image = document.querySelector('.background-image');
        image.classList.add('arehidden');
        image.classList.remove('arehidden');
      }
      const image = document.querySelector('.background-image');
      image.classList.remove('arehidden');
      const layout__list = document.querySelector('.layout__list');
      const pagination = document.querySelector('#pagination');
      layout__list.innerHTML = '';
      pagination.innerHTML = '';
      document
        .querySelector('.layout')
        .insertAdjacentHTML(
          'beforebegin',
          "<div class='error-container'><p class='error__message'>Oops..., nothing found</p></div>",
        );
      Notiflix.Notify.failure('Watched is empty');
    }
  });
  buttonQueue.addEventListener('click', () => {
    const queueArr = JSON.parse(localStorage.getItem('queueArr'));
    buttonWatched.classList.remove('current');
    buttonQueue.classList.add('current');
    if (queueArr.length !== 0) {
      if (document.querySelector('.error-container')) {
        document.querySelector('.error-container').remove();
      }
      if (!document.querySelector('.arehidden')) {
        const image = document.querySelector('.background-image');
        image.classList.remove('arehidden');
        image.classList.add('arehidden');
      }
      renderQueue();
    } else {
      if (document.querySelector('.error-container')) {
        document.querySelector('.error-container').remove();
      }
      if (document.querySelector('.arehidden')) {
        const image = document.querySelector('.background-image');
        image.classList.add('arehidden');
        image.classList.remove('arehidden');
      }
      const layout__list = document.querySelector('.layout__list');
      const pagination = document.querySelector('#pagination');
      layout__list.innerHTML = '';
      pagination.innerHTML = '';
      document
        .querySelector('.layout')
        .insertAdjacentHTML(
          'beforebegin',
          "<div class='error-container'><p class='error__message'>Oops..., nothing found</p></div>",
        );
      Notiflix.Notify.failure('Queue is empty');
    }
  });
}
