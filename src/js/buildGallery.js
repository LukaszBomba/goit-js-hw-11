const gallery = document.querySelector('.gallery')
let buildGallery = (data) => {
    const markup = data
        .map(
            ({webformatURL,
                largeImageURL,
                tags,
                likes,
                views,
                comments,
                downloads}) => {
                return `<div class="photo-card">
        <a href="${largeImageURL}"> <img src="${webformatURL}" alt="${tags}" loading="lazy" title=""/></a>
  <div class="info">
    <p class="info-item">
      <b>Likes</b>${likes}</p>
    <p class="info-item">
      <b>Views</b>${views}</p>
    <p class="info-item">
      <b>Comments</b>${comments}</p>
    <p class="info-item">
      <b>Downloads</b>${downloads}</p>
  </div></div>
`}).join("");
    return gallery.insertAdjacentHTML('beforeend',markup);
};
export {buildGallery}