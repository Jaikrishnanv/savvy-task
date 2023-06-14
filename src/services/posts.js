const axios = require('axios');

const POSTS_ENDPOINT = 'https://jsonplaceholder.typicode.com/posts';

export const getPostsData = async () => {
    const _posts = await axios.get(POSTS_ENDPOINT);
    return _posts.data;
}