import axios from "axios";

axios.defaults.baseURL = 'https://pixabay.com/api/';

const imageGet = async (query,page) => { 
    let response = axios.get(`?key=19743646-38e1a9cdaadffbdd4b9ec2ba3&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`)
return response
}

export { imageGet } 