import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.2.5.min.css';

const API_KEY = '32104603-85e0bbf4ece8015013549a434';
axios.defaults.baseURL = 'https://pixabay.com/api/';

const errorMessage =
  'Sorry, there are no images matching your search query. Please try again.';
const infoMessage =
  "We're sorry, but you've reached the end of search results.";
// const succesMessage = `Hooray! We found ${totalHits} images.`;
// fetch(`${BASE_URL}?key=${API_KEY}q=${form.value}&image_type=photo&orientation=horizontal&safesearch=true`);

let currentPage = 1;
let inputValue = '';

const form = document.getElementById('search-form');
const galleryContainer = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

const simpleLightBox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});
hideLoadMoreBtn();

form.addEventListener('submit', onFormSubmit);
loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);

async function onFormSubmit(e) {
  e.preventDefault();

  galleryContainer.innerHTML = '';

  inputValue = e.currentTarget.searchQuery.value.trim();
  if (inputValue === '') {
    Notify.warning(`Please fill in the search field`);
    return;
  }

  resetPage();

  try {
    const { hits, totalHits } = await getCards();

    if (hits.length === 0) {
      hideLoadMoreBtn();
      Notify.error(`${errorMessage}`);
      galleryContainer.innerHTML = '';
      return;
    }
    Notify.success(`Hooray! We found ${totalHits} images.`);
    renderCards(hits);
    smoothScroll();
    showLoadMoreBtn();
    simpleLightBox.refresh();
  } catch (error) {
    Notify.failure(`Value was entered incorrectly`);
    hideLoadMoreBtn();
  }
}

async function getCards() {
  const options = new URLSearchParams({
    key: API_KEY,
    q: inputValue,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    per_page: 40,
    page: currentPage,
  });

  const { data } = await axios(`?${options}`);
  currentPage += 1;
  return data;
}

function resetPage() {
  currentPage = 1;
}

function renderCards(hits) {
  const cards = hits
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<div class="photo-card"><a class="gallery-link" href="${largeImageURL}"><img class="gallery-image" src="${webformatURL}" alt="${tags}" width="330"  loading="lazy"/></a><div class="info"><p class="info-item"><b>Likes</b><span>${likes}</span></p><p class="info-item"><b>Views</b><span>${views}</span></p><p class="info-item"><b>Comments</b><span>${comments}</span></p><p class="info-item"><b>Downloads</b><span>${downloads}</span></p></div></div>`;
      }
    )
    .join('');

  galleryContainer.insertAdjacentHTML('beforeend', cards);
}

async function onLoadMoreBtnClick() {
  // loadMoreBtn.classList.add = 'loading';
  try {
    const { hits } = await getCards();
    renderCards(hits);
    simpleLightBox.refresh();
    if (hits.length < 40) {
      hideLoadMoreBtn();

      Notify.info(`${infoMessage}`);
    }
    // loadMoreBtn.classList.remove = 'loading';
    // loadMoreBtn.classList.add = 'loaded';
  } catch (error) {
    Notify.failure(`Something go wrong`);
  }
}

function showLoadMoreBtn() {
  loadMoreBtn.style.display = 'block';
}

function hideLoadMoreBtn() {
  loadMoreBtn.style.display = 'none';
}
// плавний скролл
function smoothScroll() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
