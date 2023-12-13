import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '41171330-6e575fb18ec957a563a5d63ae';

async function findPic(query, currentPage) {
  const option = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: currentPage,
    per_page: 40,
  };
  const response = await axios(BASE_URL, { params: option });
  return response.data;
}

export { findPic };

// 'https://pixabay.com/api/?key=41171330-6e575fb18ec957a563a5d63ae&q=yellow+flowers&image_type=photo'
