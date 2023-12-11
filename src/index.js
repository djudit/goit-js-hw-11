import { findPic } from './api';

const form = document.querySelector('search-form');
const gallery = document.querySelector('.gallery');

form.addEventListener('submit', handleSearch);

function createMarkup(arr) {
  return arr
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
  <div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes ${likes}</b>
    </p>
    <p class="info-item">
      <b>Views ${views}</b>
    </p>
    <p class="info-item">
      <b>Comments ${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads ${downloads}</b>
    </p>
  </div>
</div>
  `
    )
    .join('');
}

async function renderPic() {
  try {
    const data = await findPic();
    gallery.insertAdjacentHTML('beforeend', createMarkup(data));
    console.log(data);
  } catch (error) {
    console.log(error.message);
  }
}

renderPic();

async function handleSearch(event) {
  event.preventDefault();
}
