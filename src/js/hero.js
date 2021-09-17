const refs = {
    form: document.querySelector('#search-form'),
  }
 
const searchInput = (e) => {
    e.preventDefault();
    console.log(e.target.value);

  }
  export default searchInput ;
  refs.form.addEventListener('input', searchInput)


  