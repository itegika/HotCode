import SimpleLightbox from "simplelightbox";

const modalLink = document.querySelector(".layout");

function renderMovieCard(item) {
    const markup = item.map((item => {
        return `<div class="modal">
        <div class="container">
            <div class="modal__wrapper">
                <div class="modal__image">
                    <a href="" class="modal__img-link">
                        <img class="modal__img" src="" alt="">
                    </a>
                </div>
                <div class="modal__content">
                    <h2 class="modal__title"></h2>
                <div class="modal__description-wrapper">
                    <ul class="modal__description">
                        <li class="modal__description-title">Vote / Votes</li>
                        <li class="modal__description-title">Popularity</li>
                        <li class="modal__description-title">Original Title</li>
                        <li class="modal__description-title">Genre</li>
                    </ul>
                    <ul class="modal__description-list">
                        <li class="modal__description-value">
                            <span class="modal__value modal__accent"></span>
                            <span class="modal__line">/</span>
                            <span class="modal__value modal__second-accent"></span>
                        </li>
                        <li class="modal__description-value modal__caps"></li>
                        <li class="modal__description-value modal__caps"></li>
                        <li class="modal__description-value"></li>
                    </ul>
                </div>
                <h3 class="modal__about">About</h3>
                <p class="modal__about-text"></p>
                <div class="modal__button">
                    <button type="button" class="button watched__button">add to Watched</button>
                <button type="button" class="button queve__button">add to queue</button>
                </div>
                </div>
            </div>
        </div>
    </div>` 
    }));
    
}


modalLink.addEventListener("click", openModal);