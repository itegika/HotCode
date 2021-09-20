const body = document.body;
body.classList.add('home-bcg');

const myLibrary = {
  library: document.querySelector('.menu__link-library'),
  home: document.querySelector('.menu__link-home'),
  form: document.querySelector('.search-form'),
  libraryBtns: document.querySelector('.libraryBtns'),
};

myLibrary.libraryBtns.classList.add('hidden');
myLibrary.library.addEventListener('click', onClick);
function onClick(e) {
  console.log(e.target);
  e.target.classList.add('current');
  if (myLibrary.library.classList.contains('current')) {
    body.classList.add('library-bcg');
    myLibrary.form.classList.add('hidden');
    myLibrary.libraryBtns.classList.remove('hidden');
    myLibrary.home.classList.add('hide-after');
  }
}
