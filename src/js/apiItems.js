import axios from 'axios';
import renderGallery from './cardMaket';
const URL = 'https://api.themoviedb.org/3';
const KEY = '15f17b74af157d4eeef693405d33f902';

async function fetchTrends(page) {
  const request = await axios.get(`${URL}/trending/movie/week?api_key=${KEY}&page=${page}`);
  const result = request.data.results;
  return result;
}
document.addEventListener('DOMContentLoaded', fetchTrendsGallery);

async function fetchTrendsGallery(e) {
  async function fetchTrends(page) {
    const request = await axios.get(`${URL}/trending/movie/week?api_key=${KEY}&page=${page}`);
    console.log(request);
    const data = request.data;
    console.log(data);
    const result = data.results;
    console.log(result);
    // console.log(result[0]);
    return result;
  }

  document.addEventListener('DOMContentLoaded', fetchTrendsGallery);
  console.log(document);
  async function fetchTrendsGallery(e) {
    // e.preventDefault();

    try {
      const movies = await fetchTrends(1);
      console.log(movies);
      renderGallery(movies);

      // console.log(movies);
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchGenres() {
    try {
      const res = await axios.get(`${URL}/genre/movie/list?api_key=${KEY}`);
      const genres = res.data.genres;
      console.log(genres);
    } catch (error) {
      console.error(error);
    }
  }
  fetchGenres();
}
