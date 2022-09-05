import './sass/index.scss';
import { imageGet } from './js/imageGet';
import { buildGallery } from './js/buildGallery'
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
let page = 1;
const query = document.querySelector('.header_form-input');
const button = document.querySelector('.header_form-submit');
const lightbox = new SimpleLightbox('.gallery a');



button.addEventListener('click', (event) => {
    event.preventDefault();
    imageGet(query.value,page)
        .then(({ data }) => {
            document.querySelector('.gallery').innerHTML = '';
            page = 1;
            if (data.totalHits == 0) {return Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.') }
            return Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`),
            buildGallery(data.hits),
            lightbox.refresh();
        })
        .catch(error => { Notiflix.Notify.failure(error) })
})

query.addEventListener('click', (e) => { return query.value = '' })


window.addEventListener('scroll',()=>{
    console.log(window.scrollY) //scrolled from top
    console.log(window.innerHeight) //visible part of screen
    if(window.scrollY + window.innerHeight >= 
    document.documentElement.scrollHeight){
        page++,
        imageGet(query.value,page)
            .then(({ data }) => {
            return buildGallery(data.hits),
            lightbox.refresh();
        })
            .catch(() => {Notiflix.Notify.failure(`We're sorry, but you've reached the end of search results.`)
            })
    }
})