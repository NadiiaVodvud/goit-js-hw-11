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
const succesMessage = `Hooray! We found ${totalHits} images.`;
// fetch(`${BASE_URL}?key=${API_KEY}q=${form.value}&image_type=photo&orientation=horizontal&safesearch=true`);

let currentPage = 1;
let inputValue = '';
let hitsCounter = 0;

const form = document.getElementById('search-form');
const galleryContainer = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

loadMoreBtn.style.display = 'none';

form.addEventListener('submit', onFormSubmit);
loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);

// function onFormInput(e) {
//   inputValue[e.target.name] = e.target.value.trim();
//   console.log(e.target.name);
//   console.log(e.target.value);
// }

async function onFormSubmit(e) {
  e.preventDefault();
  // loadMoreBtn.classList.add('hidden');
  // loadMoreBtn.classList.remove('hidden');

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
      Notify.error(`${errorMessage}`);
      galleryContainer.innerHTML = '';
      loadMoreBtn.style.display = 'none';
      return;
    }
    // Notify.success(`${succesMessage}`);
    renderCards(hits);
    // loadMoreBtn.style.display = 'block';
  } catch (error) {
    // Notify.failure(`${errorMessage}`);
    Notify.failure(`Something go wrong`);
    loadMoreBtn.style.display = 'none';
  }

  //   const { input, button } = e.currentTarget.elements;
  //   console.log(e.currentTarget.elements);

  loadMoreBtn.style.display = 'block';
  // loadMoreBtn.classList.remove('hidden');
  // loadMoreBtn.classList.add('load-more');

  //   lightBox.refresh();
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
        return `<div class="photo-card"><a class="gallery__link" href="${largeImageURL}"><img class="gallery__image" src="${webformatURL}" alt="${tags}"  loading="lazy"/></a><div class="info"><p class="info-item"><b>Likes</b><span>${likes}</span></p><p class="info-item"><b>Views</b><span>${views}</span></p><p class="info-item"><b>Comments</b><span>${comments}</span></p><p class="info-item"><b>Downloads</b><span>${downloads}</span></p></div></div>`;
      }
    )
    .join('');

  galleryContainer.insertAdjacentHTML('beforeend', cards);
}

async function onLoadMoreBtnClick() {
  // loadMoreBtn.classList.add = 'loading';
  try {
    const { hits, totalHits } = await getCards();
    renderCards(hits);
    // loadMoreBtn.classList.remove = 'loading';
    // loadMoreBtn.classList.add = 'loaded';
  } catch (error) {
    Notify.failure(`${errorMessage}`);
  }
}
