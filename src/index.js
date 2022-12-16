import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.2.5.min.css';

// const API_KEY = '31396399-0c0a53b00e87586b8fc1cddd2';
const API_KEY = '32104603-85e0bbf4ece8015013549a434';
const BASE_URL = 'https://pixabay.com/api/';

const errorMessage =
  'Sorry, there are no images matching your search query. Please try again.';
const infoMessage =
  "We're sorry, but you've reached the end of search results.";
const totalMessage = 'Hooray! We found totalHits images.';
// fetch(`${BASE_URL}?key=${API_KEY}q=${form.value}&image_type=photo&orientation=horizontal&safesearch=true`);

let currentPage = 1;
let inputValue = '';
let hitsCounter = 0;
const per_page = 40;
// let totalPages = undefined;
// const PageSize = 8;

const form = document.getElementById('search-form');
const galleryContainer = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

// console.log(form);
// console.log(galleryContainer);
// console.log(loadMoreBtn);

form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', onFormInput);

function onFormInput(e) {
  //   inputValue[e.target.name] = e.target.value.trim();
  //   console.log(e.target.name);
  //   console.log(e.target.value);
}

function onFormSubmit(e) {
  e.preventDefault();
  loadMoreBtn.classList.add('hidden');
  loadMoreBtn.classList.remove('hidden');

  galleryContainer.innerHTML = '';

  const query = e.currentTarget.elements.searchQuery.value;

  //   const { input, button } = e.currentTarget.elements;
  //   console.log(e.currentTarget.elements);

  //   getCards(query).then(({ articles, totalResults }) => {
  //     calculatePagination(totalResults);

  //     const elements = createArticlesElements(articles);
  //     const pageElements = createPagesElements();

  //     render(paginationContainer, pageElements);
  //     render(articlesContainer, elements);
  //   });

  loadMoreBtn.classList.remove('hidden');
  loadMoreBtn.classList.add('load-more');

  //   lightBox.refresh();
}

// searchBtnRef.addEventListener('click', e => {});

// paginationContainer.addEventListener('click', e => {
//   e.preventDefault();
//   if (e.target.className !== 'page-link') return;

//   currentPage = e.target.dataset.page;

//   getNews(searchField.value).then(({ articles, totalResults }) => {
//     calculatePagination(totalResults);

//     const elements = createArticlesElements(articles);
//     const pageElements = createPagesElements();

//     render(paginationContainer, pageElements);
//     render(articlesContainer, elements);
//   });
// });

// loadMoreBtnRef.addEventListener('click', e => {
//   if (currentPage > totalPages) return;

//   currentPage = Number(currentPage) + 1;

//   getNews(searchField.value).then(({ articles }) => {
//     const elements = createArticlesElements(articles);
//     articlesContainer.insertAdjacentHTML('beforeend', elements);
//   });
// });

// function getCards(query) {
//   const urlAPI = `${BASE_URL}?key=${API_KEY}q=${query}&image_type=photo&orientation=horizontal&safesearch=true&pageSize=${PageSize}&page=${currentPage}`;

//   return axios
//     .get(urlAPI)
//     .then(res => res.data)
//     .then(({ articles, totalResults }) => {
//       return { articles, totalResults };
//     })
//     .catch(error => console.log(error));
// }

// const searchBtnRef = document.getElementById('searcBtn'); // кнопка пошуку
// const loadMoreBtnRef = document.getElementById('loadMore'); // кнопка підгрузки іще
// const searchField = document.getElementById('searchNewsField'); // поле вводу запиту
// const articlesContainer = document.getElementById('articles'); // контейнер для статей
// const paginationContainer = document.getElementById('pagination'); // контейнер для пагінації

// searchBtnRef.addEventListener('click', e => {
//   getNews(searchField.value).then(({ articles, totalResults }) => {
//     calculatePagination(totalResults);

//     const elements = createArticlesElements(articles);
//     const pageElements = createPagesElements();

//     render(paginationContainer, pageElements);
//     render(articlesContainer, elements);
//   });
// });

// paginationContainer.addEventListener('click', e => {
//   e.preventDefault();
//   if (e.target.className !== 'page-link') return;

//   currentPage = e.target.dataset.page;

//   getNews(searchField.value).then(({ articles, totalResults }) => {
//     calculatePagination(totalResults);

//     const elements = createArticlesElements(articles);
//     const pageElements = createPagesElements();

//     render(paginationContainer, pageElements);
//     render(articlesContainer, elements);
//   });
// });

// loadMoreBtnRef.addEventListener('click', e => {
//   if (currentPage > totalPages) return;

//   currentPage = Number(currentPage) + 1;

//   getNews(searchField.value).then(({ articles }) => {
//     const elements = createArticlesElements(articles);
//     articlesContainer.insertAdjacentHTML('beforeend', elements);
//   });
// });

// /**
//  * getNews
//  * @param {String} query рядок з ключовими словами для пошуку
//  * @returns {Promise} проміс, успішне відпрацювання якого повертає масив з новинами і загальну кількість новин по запиту.
//  */
// function getNews(query) {
//   const urlAPI = ``${BASE_URL}?key=${API_KEY}q=${query}&image_type=photo&orientation=horizontal&safesearch=true&pageSize=${PageSize}&page=${currentPage}`;

//   return axios
//     .get(urlAPI)
//     .then(res => res.data)
//     .then(({ articles, totalResults }) => {
//       return { articles, totalResults };
//     })
//     .catch(error => console.log(error));
// }

// /**
//  * createArticlesElements
//  * @param {Array} articles - масив з новинами
//  * @returns {String} Рядок з елементами всіх новин
//  */
// function createArticlesElements(articles) {
//   return articles
//     .map(({ title, description, url, urlToImage }) => {
//       return `<article class="news">
//     <h2>${title}</h2>
//     <div>${description}</div>
//     <img src="${urlToImage}" alt="${title}" loading="lazy">
//     <a href="${url}" class="news-link" target="_blank">more</a>
//   </article>`;
//     })
//     .join('');
// }

// /**
//  * createPagesElements
//  * @returns {string} Рядок з елементами кнопок пагінації
//  */
// function createPagesElements() {
//   let pagesElements = '';

//   for (let i = 1; i <= totalPages; i += 1) {
//     pagesElements += `<li class="page-item"><a class="page-link" href="#" data-page=${i}>${i}</a></li>`;
//   }

//   return pagesElements;
// }

// /**
//  * calculatePagination. Підраховує кількість сторінок
//  * @param {Number} totalResults
//  */
// function calculatePagination(totalResults) {
//   totalPages = Math.floor((totalResults > 100 ? 100 : totalResults) / PageSize);
// }

// /**
//  * Очищає контейнер і вставляє туди новий контент
//  * @param {HTMLElement} container
//  * @param {String} content
//  */
// function render(container, content) {
//   container.innerHTML = '';
//   container.insertAdjacentHTML('beforeend', content);
// }
