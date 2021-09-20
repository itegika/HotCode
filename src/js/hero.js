import axios from 'axios';
import renderGallery from './cardMaket';
import debounce from 'lodash.debounce'
import Notiflix from "notiflix";
const URL = 'https://api.themoviedb.org/3';
const KEY = '15f17b74af157d4eeef693405d33f902';
const refs = {
  form: document.querySelector('#search-form'),
  layout__list: document.querySelector('.layout__list'),
}
let query = "";
async function fetchQuery(query) {
 try {  
 const request = await axios.get(`${URL}/search/movie?api_key=${KEY}&query=${query}`);  
 refs.layout__list.innerHTML = "";
 renderGallery(request.data.results); 
 if (request.data.results.length === 0) {Notiflix.Notify.info(`Input valid name please`)  }
 } catch (error) {
  Notiflix.Notify.failure(`We can't find this film 😱`)   
 } 
  }
 
const searchInput = (e) => {
  e.preventDefault();
  query = e.target.value;
    fetchQuery(query);
  }
  export default searchInput ;
 refs.form.addEventListener('input', debounce(searchInput,100))


