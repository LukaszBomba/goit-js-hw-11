import './sass/index.scss';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchPhoto } from './js/fetchPhoto';
import { pictureGallery } from './js/pictureGallery';

let page = 1;

const input = document.querySelector('.header_form-input');

const button = document.querySelector('.header_form-submit');

const lightbox = new SimpleLightbox('.gallery a');

button.addEventListener('click', event => {
  event.preventDefault();
  fetchPhoto(input.value, page)
    .then(({ data }) => {
      document.querySelector('.gallery').innerHTML = '';
      page = 1;
      if (data.totalHits == 0) {
        return Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }
      return (
        Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`),
        pictureGallery(data.hits),
        lightbox.refresh()
      );
    })
    .catch(error => {
      Notiflix.Notify.failure(error);
    });
});

// Add photos on scroll
window.addEventListener('scroll', () => {
  console.log(window.scrollY); //scroll
  console.log(window.innerHeight);
  if (
    window.scrollY + window.innerHeight >=
    document.documentElement.scrollHeight
  ) {
    page++,
      fetchPhoto(input.value, page)
        .then(({ data }) => {
          return pictureGallery(data.hits), lightbox.refresh();
        })
        .catch(() => {
          Notiflix.Notify.failure(
            `We're sorry, but you've reached the end of search results.`
          );
        });
  }
});
