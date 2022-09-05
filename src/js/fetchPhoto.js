import axios from 'axios';

const fetchPhoto = async (query, page) => {
  let response = axios.get(
    `https://pixabay.com/api/?key=20891324-a9618e8d543b60db7c29c0075&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`
  );
  return response;
};

export { fetchPhoto };
