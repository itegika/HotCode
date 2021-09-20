
// const footerModal = document.querySelector(".footer__modal-link");
const footerAdd = document.querySelector(".footer__modal");



const refs = {
    openModalBtn: document.querySelector('[data-modal-open]'),
    closeButton: document.querySelector('[data-modal-close]'),
    modal: document.querySelector('[data-modal]'),
};
  
refs.openModalBtn.addEventListener('click', toggleModal);
refs.closeModalBtn.addEventListener('click', toggleModal);


function toggleModal(e) {
    e.preventDefault();
    refs.modal.classList.toggle('is-hidd');
    renderStudentCards();
}
// function toggleModal(e) {
//     e.preventDefault();
//     renderStudentCards();
//     e.currentTarget.classList.toggle("is-hidd");   
//     // const closeButton = document.querySelector('[data-modal-close]');
//     // closeButton.addEventListener('click', e=> {
//     //   console.log(e.target);
//     //   e.currentTarget.classList.toggle('is-hidd')
//     // })
// }


function renderStudentCards() {
    const markup =  `
            <div class="footer-modal__wrapper">
                <ul class="students__list">
                <li class="student">
                <p class="student__name">Богдан Косяк</p>
                <a href="#" class="student__linktoGH"></a></li>
                <li class="student">
                <p class="student__name">Артур Тарканій</p>
                <a href="#" class="student__linktoGH"></a></li>
                <li class="student">
                <p class="student__name">Михайло Чікрізов</p>
                <a href="#" class="student__linktoGH"></a></li>
                <li class="student">
                <p class="student__name">Анастасія Доготарь</p>
                <a href="#" class="student__linktoGH"></a></li>
                <li class="student">
                <p class="student__name">Наталія Погребна</p>
                <a href="#" class="student__linktoGH"></a></li>
                <li class="student">
                <p class="student__name">Сергій Животовський</p>
                <a href="#" class="student__linktoGH"></a></li>
                <li class="student">
                <p class="student__name">Андрій Іваніченко</p>
                <a href="#" class="student__linktoGH"></a></li>
                <li class="student">
                <p class="student__name">Олександр Осадчук</p>
                <a href="#" class="student__linktoGH"></a></li>
                <li class="student">
                <p class="student__name">Євген Данілов</p>
                <a href="#" class="student__linktoGH"></a></li>
                </ul>
            </div>`;
    

    footerAdd.insertAdjacentHTML('beforeend', markup);
  return footerAdd;
}
