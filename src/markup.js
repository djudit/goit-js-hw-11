export function createMarkup(arr) {
  return arr.hits
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
    <a href="${largeImageURL}" class="photo-card">
    <img src="${webformatURL}" alt="${tags}" width="350" loading="lazy" />
    <div class="info">
      <p class="info-item">
        <b>Likes </b><br>${likes}
      </p>
      <p class="info-item">
        <b>Views </b><br>${views}
      </p>
      <p class="info-item">
        <b>Comments </b><br>${comments}
      </p>
      <p class="info-item">
        <b>Downloads </b><br>${downloads}
      </p>
    </div>
  </a>
    `
    )
    .join('');
}
