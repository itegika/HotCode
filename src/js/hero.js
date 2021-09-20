import axios from 'axios';
import renderGallery from './cardMaket';
import { fetchGenres} from './apiItems';
import debounce from 'lodash.debounce'
import Notiflix from "notiflix";
const URL = 'https://api.themoviedb.org/3';
const KEY = '15f17b74af157d4eeef693405d33f902';
const refs = {
  form: document.querySelector('#search-form'),
  layout__list: document.querySelector('.layout__list'),
  error__text: document.querySelector('.error-text')
}
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
const clearErrorMsg = () => {
  refs.error__text.innerHTML = "";
}

const searchInput = (e) => {
  e.preventDefault();
  query = e.target.elements.searchQuery.value.trim();
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
