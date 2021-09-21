import axios from 'axios';
import renderGallery from './cardMaket';
<<<<<<< HEAD
import { fetchGenres } from './apiItems';
import { renderPagination } from './paginator';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
=======
import { fetchGenres} from './apiItems';
import debounce from 'lodash.debounce'
import Notiflix from "notiflix";
>>>>>>> b8bef3f843ceb7ccaff5c318136b823d15a199ac
const URL = 'https://api.themoviedb.org/3';
const KEY = '15f17b74af157d4eeef693405d33f902';

const refs = {
  form: document.querySelector('#search-form'),
  layout__list: document.querySelector('.layout__list'),
  error__text: document.querySelector('.error-text'),
};

let query = '';

async function fetchQuery(query, page = 1) {
  try {
    const request = await axios.get(
      `${URL}/search/movie?api_key=${KEY}&query=${query}&page=${page}`,
    );
    refs.layout__list.innerHTML = '';
    refs.error__text.innerHTML = `Good job, we found ${request.data.total_results} movies on this tag.`;
    if (request.data.results.length === 0) {
      refs.error__text.innerHTML = `<span style="color:red;">Search result not successful. Enter the correct movie name and try again.</span>`;
    }
    return request.data;
  } catch (error) {}
}
<<<<<<< HEAD
=======
let query = "";
async function fetchQuery(query) {
 try {  
 const request = await axios.get(`${URL}/search/movie?api_key=${KEY}&query=${query}`);  
 refs.layout__list.innerHTML = "";
 refs.error__text.innerHTML = `Good job, we found ${request.data.total_results} movies on this tag.`
 if (request.data.results.length === 0) {
 refs.error__text.innerHTML = `<span style="color:red;">Search result not successful. Enter the correct movie name and try again.</span>`;}
return request.data.results 
} catch (error) {
 } 
  }
>>>>>>> b8bef3f843ceb7ccaff5c318136b823d15a199ac
const clearErrorMsg = () => {
  refs.error__text.innerHTML = '';
};

const searchInput = async e => {
  e.preventDefault();
  query = e.target.elements.searchQuery.value.trim();
<<<<<<< HEAD
  refreshList(query);
};

const refreshList = async (query, page) => {
  const { results: movies, total_pages, page: pageFromRequest } = await fetchQuery(query, page);
  const genres = await fetchGenres();
  const newMovies = movies.map(el => {
    const arr = el.genre_ids.map(genre => {
      return genres.find(el => el.id === genre).name;
    });
    return { ...el, genre: arr };
  });
  renderGallery(newMovies);
  renderPagination(pageFromRequest, total_pages, page => refreshList(query, page));
};

refs.form.addEventListener('submit', searchInput);
=======
    fetchQuery(query);
    console.log(fetchQuery())
    fetchQueryGallery(query);
  }
  export default searchInput;
 refs.form.addEventListener('submit', searchInput)

 async function fetchQueryGallery(e) {
  try {
  const movies = await fetchQuery(query);
  console.log(movies);
  const genres = await fetchGenres();
  const newMovies = movies.map(el=>{
      const arr = el.genre_ids.map(genre=>{
           return genres.find(el=>el.id === genre).name
  })
  return {...el, genre: arr}
})
console.log(newMovies);
renderGallery(newMovies); 
} 
catch (error) {
  console.error(error);
}
 }
>>>>>>> b8bef3f843ceb7ccaff5c318136b823d15a199ac
