import axios from './axios';

function getAllPosts() {
    return new Promise((resolve, reject) => {
        try {
            const response = axios.get('/posts');
            return resolve(response);
        } catch(err) {
            return reject(err);
        }
    });
}

export default getAllPosts;