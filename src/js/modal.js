import SimpleLightbox from "simplelightbox";

const modalLink = document.querySelector(".layout");

function renderMovieCard(movieCard) {
    const markup = movieCard.map((movie => {
        return `
            <div class="modal__wrapper">
                <div class="modal__image">
                    <a href="#" class="modal__img-link">
                        <img class="modal__img" src="${movie.poster_path}" alt="${movie.title}">
                    </a>
                </div>
                <div class="modal__content">
                    <h2 class="modal__title"></h2>${movie.title}
                <div class="modal__description-wrapper">
                    <ul class="modal__description">
                        <li class="modal__description-title">Vote / Votes</li>
                        <li class="modal__description-title">Popularity</li>
                        <li class="modal__description-title">Original Title</li>
                        <li class="modal__description-title">Genre</li>
                    </ul>
                    <ul class="modal__description-list">
                        <li class="modal__description-value">
                            <span class="modal__value modal__accent">${movie.vote_average}</span>
                            <span class="modal__line">/</span>
                            <span class="modal__value modal__second-accent">${movie.vote_count}</span>
                        </li>
                        <li class="modal__description-value modal__caps">${movie.popularity}</li>
                        <li class="modal__description-value modal__caps">${movie.original_title}</li>
                        <li class="modal__description-value">
                        ${movie.genres.length > 1 ?
                            `<ul class ="language_list"> 
                            ${movie.genres.map(genre => {
                              return `<li class = "language_item">${genre.name}</li>`
                            }).join("")}
                            </ul>` : `${movie.genres[0].name}`}
                        </li>
                    </ul>
                </div>
                <h3 class="modal__about">About</h3>
                <p class="modal__about-text">${movie.overview}</p>
                <div class="modal__button">
                    <button type="button" class="button watched__button">add to Watched</button>
                <button type="button" class="button queve__button">add to queue</button>
                </div>
                </div>
            </div>` 
    }));
    
}


modalLink.addEventListener("click", openModal);


function openModal(event) {
    try {
        movie_id = event.target.value;
        const movieCard = await fetchById();
        console.log(movieCard);
        new SimpleLightbox('.layout a', { 
            
            showCounter: false,
            disableScroll: false,
            captionDelay: 250,
            docClose: true,
        });
        renderMovieCard(movieCard);

    } catch (error) {
        console.error(error);
    }
}