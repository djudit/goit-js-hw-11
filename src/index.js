import { Notify } from 'notiflix/build/notiflix-notify-aio';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { findPic } from './api';
import { createMarkup } from './markup';

const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
// const btn = document.querySelector('.load-more');
const emptyDiv = document.querySelector('.empty-load');

const options = {
  rootMargin: '100px',
  threshold: 1.0,
};
const observer = new IntersectionObserver(handleObserve, options);

function handleObserve(entries, observer) {
  entries.forEach(entry => {
    console.log(entry);
    if (!entry.isIntersecting) {
      return;
    }
    console.log(entry);
    handleLoadMore(observer);
  });
}

let page = 1;
let currentQuery = '';
let availablePages = 0;

const lightbox = new SimpleLightbox('.gallery a');

form.addEventListener('submit', handleSearch);
// btn.addEventListener('click', handleLoadMore);

function handleSearch(event) {
  event.preventDefault();
  currentQuery = event.currentTarget.elements.searchQuery.value;
  gallery.innerHTML = '';
  page = 1;
  event.currentTarget.reset();

  findPic(currentQuery, page)
    .then(data => {
      if (data.hits.length === 0) {
        Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        return;
      }
      gallery.insertAdjacentHTML('beforeend', createMarkup(data));
      availablePages = Math.ceil(data.totalHits / 40);
      lightbox.refresh();

      if (data.totalHits > 40) {
        // btn.classList.remove('is-hidden');
        observer.observe(emptyDiv);
      }
    })
    .catch(error => {
      console.log(error.message);
      Notify.failure('ERROR!!!');
    });
}

function handleLoadMore(obs) {
  page += 1;

  findPic(currentQuery, page)
    .then(data => {
      gallery.insertAdjacentHTML('beforeend', createMarkup(data));

      lightbox.refresh();

      if (page === availablePages) {
        obs.unobserve(emptyDiv);
        // btn.classList.add('is-hidden');
        Notify.info(
          "We're sorry, but you've reached the end of search results."
        );
      }
    })
    .catch(error => {
      console.log(error.message);
      Notify.failure('ERROR!!!');
    });
}
