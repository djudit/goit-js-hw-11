import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '41171330-6e575fb18ec957a563a5d63ae';

async function findPic() {
  const response = await axios(
    `${BASE_URL}?key=${API_KEY}&q=yellow+flowers&image_type=photo`
  );
  return response.data;
}

export { findPic };

// 'https://pixabay.com/api/?key=41171330-6e575fb18ec957a563a5d63ae&q=yellow+flowers&image_type=photo'
