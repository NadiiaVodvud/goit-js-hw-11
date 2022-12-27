import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.2.5.min.css';

// import InfiniteScroll from 'infinite-scroll';

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
  hideLoadMoreBtn();

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
    smoothScroll();
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
// прокручування
function smoothScroll() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 1.7,
    behavior: 'smooth',
  });
}
//нескінченний скролл

// function infinityScroll() {
//   while (true) {
//     // нижня частина документа
//     let windowRelativeBottom = document
//       .querySelector('.gallery')
//       .getBoundingClientRect().bottom;

//     // якщо користувач не прокрутив достатньо далеко (>100px до кінця)
//     if (
//       windowRelativeBottom >
//       document.querySelector('.gallery').clientHeight + 100
//     )
//       break;

//     // додамо більше даних
//   }
// }

//---------------------
// let elem = galleryContainer;
// let infScroll = new InfiniteScroll(elem, {
//   // options
//   path: '.pagination__next',
//   append: '.post',
//   history: false,
// });

// element argument can be a selector string
// for an individual element
// let infScroll = new InfiniteScroll('.gallery', {
//   // options
//   path: currentPage,
//   append: '.photo-card',
//   history: false,
// });

// //------стрілка вгору-------
loadMoreBtn.insertAdjacentHTML(
  'beforebegin',
  `<div id="arrowTop" hidden>☝</div>`
);

const arrowOnTop = document.querySelector('#arrowTop');

arrowOnTop.addEventListener('click', e => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
});

// const totalHeight = Math.max(
//   body.scrollHeight,
//   body.offsetHeight,
//   html.clientHeight,
//   html.scrollHeight,
//   html.offsetHeight
// );

// console.log(window.innerHeight);
// console.log(window.scrollY);
// console.log(pageXOffset);
// console.log(document.documentElement.clientHeight);

// arrowOnTop.addEventListener('click', onTopClick());

// function onTopClick() {
//   window.scrollTo(pageXOffset, 0);
// після scrollTo відбудеться подія "scroll", тому стрілка автоматично сховається
// }

// window.addEventListener('scroll', function () {
//   arrowOnTop.hidden = pageYOffset < document.documentElement.clientHeight;
// });
// window.addEventListener('scroll', onScrollPosition());

// function onScrollPosition() {
//   arrowOnTop.hidden = pageYOffset < document.documentElement.clientHeight;
// }
