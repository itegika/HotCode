import axios from 'axios';
import renderGallery from './cardMaket';
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
 renderGallery(request.data.results); 
 refs.error__text.innerHTML = `Good job, we found ${request.data.total_results} movies on this tag.`
 if (request.data.results.length === 0) {
 refs.error__text.innerHTML = `<span style="color:red;">Search result not successful. Enter the correct movie name and try again.</span>`;}
 } catch (error) {
 } 
  }


const searchInput = (e) => {
  e.preventDefault();
  query = e.target.elements.searchQuery.value.trim();
    fetchQuery(query);
  }
  export default searchInput ;
 refs.form.addEventListener('submit', searchInput)

 
