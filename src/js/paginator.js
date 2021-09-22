const arrowLeft = document.querySelector('.arrow-left');
const arrowRight = document.querySelector('.arrow-right');
const paginationElement = document.getElementById('pagination-num-buttons');
const pagination = {
  first: 1,
  size: 3,
  current: 1,
  total: 0,
};

function resetCurrentPage() {
  pagination.current = 1;
}

// главная функция для рендера pagination. Callback - функция для работы с fetch (зависит от раздела, где рисуем pagination)
export function renderPagination(page, totalPages = 50, callback) {
  pagination.total = totalPages;
  pagination.current = page;
  pagination.size = pagination.total < pagination.size ? pagination.total : pagination.size;

  // ф-кция для отслеживания кликов по стрелке влево
  function onArrowLeftClick() {
    if (pagination.current === 1) {
      return;
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
    pagination.current -= 1;
    disableArrowBtn();
    setupPagination();
    callback(pagination.current);
  }

  // ф-кция для отслеживания кликов по стрелке вправо
  function onArrowRightClick() {
    if (pagination.current === pagination.total) {
      return;
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
    pagination.current += 1;
    disableArrowBtn();
    setupPagination();
    callback(pagination.current);
  }

  function onPaginationItemClick(e) {
    const pageNum = parseInt(e.target.innerText);
    if (isNaN(pageNum)) {
      return;
    }
    pagination.current = pageNum;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setupPagination();
    callback(pagination.current);
  }

  arrowLeft.removeEventListener('click', onArrowLeftClick);
  arrowRight.removeEventListener('click', onArrowRightClick);

  function setupPagination() {
    let min;
    let max;
    const pageBtnsContent = [];

    if (pagination.current > pagination.size) {
      pageBtnsContent.push(1);
      pageBtnsContent.push('...');
      min = pagination.current - Math.floor(pagination.size / 2);
    } else {
      min = 1;
    }

    if (pagination.current > pagination.total - pagination.size) {
      max = pagination.total - 1;
      min = pagination.total - pagination.size === 0 ? 1 : pagination.total - pagination.size;
    } else if (pagination.current < pagination.size) {
      max = pagination.size + 1;
    } else {
      max = pagination.current + Math.floor(pagination.size / 2);
    }

    while (min <= max) {
      pageBtnsContent.push(min);
      min += 1;
    }

    if (max < pagination.total - 1) {
      pageBtnsContent.push('...');
    }

    pageBtnsContent.push(pagination.total);

    paginationElement.innerHTML = '';

    pageBtnsContent.forEach(item => {
      const div = document.createElement('div');
      if (item === pagination.current) {
        div.classList.add('active');
      }
      div.innerHTML = item;
      div.onclick = onPaginationItemClick;
      paginationElement.appendChild(div);
    });
  }
  function disableArrowBtn() {
    if (pagination.current === 1) {
      arrowLeft.classList.add('disable');
    } else {
      arrowLeft.classList.remove('disable');
    }

    if (pagination.current === pagination.total) {
      arrowRight.classList.add('disable');
    } else {
      arrowRight.classList.remove('disable');
    }
  }
  arrowLeft.onclick = onArrowLeftClick;
  arrowRight.onclick = onArrowRightClick;
  disableArrowBtn();
  setupPagination();
  if (pagination.total <= 1) {
    paginationElement.innerHTML = '';
    arrowLeft.classList.add('hidden');
    arrowRight.classList.add('hidden');
  }
}
