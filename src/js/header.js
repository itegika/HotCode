const refs = {
    form: document.querySelector('#search-form'),
    loadMoreBtn: document.querySelector('.load-more'),
    gallery: document.querySelector('.gallery'),
  }
  const searchInput = (e) => {
    refs.loadMoreBtn.disabled = false; 
    page = 1;
    refs.gallery.innerHTML = ''
    e.preventDefault();
    querySearch = e.target.elements.searchQuery.value.trim();
    const get = getCards(querySearch,page);
    currentHits += 40
  }












  refs.form.addEventListener('input', searchInput)