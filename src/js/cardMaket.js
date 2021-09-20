
import { fetchById } from "./apiItems";


import fetchGenres from './apiItems';

const BASEimgURL ='https://image.tmdb.org/t/p/'
const SIZE = 'w500'
const layout__list = document.querySelector('.layout__list');
console.log(layout__list);
export default function renderGallery(movies) {
    console.log(movies);
      const markup = movies.map((movie => {
          return `<li class="layout__item">

                      <a class="layout__link" href="#" data-id="${movie.id}">
                      <img class="layout__image" src="${BASEimgURL}${SIZE}${movie.backdrop_path}" alt="${movie.title}" width="" loading="lazy" />

                      <a class="layout__link" href="${BASEimgURL}${SIZE}${movie.backdrop_path}">
                      <img class="layout__image" src="${BASEimgURL}${SIZE}${movie.poster_path}" alt="${movie.title}" width="" loading="lazy" />
                      </a>
                      <ul class="attribut__list">
                          <li class="attribut__item-title">${movie.original_title}</li>
                          <li class="attribut__item">${movie.release_date.slice(0,4)}</li>
                      </ul>
                  </li>`
      })).join('');
        
          layout__list.insertAdjacentHTML('beforeend', markup);
          return layout__list;
      }

    //   ${BASEimgURL}${SIZE}${movie.poster_path}

