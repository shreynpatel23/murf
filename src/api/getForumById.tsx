import axios from "./axios";

function getForumById(forumId) {
  const user = JSON.parse(localStorage.getItem("@user"));
  return new Promise((resolve, reject) => {
    try {
      const response = axios.get(`/forums/${forumId}`, {
        headers: { authToken: user.token },
      });
      return resolve(response);
    } catch (err) {
      return reject(err);
    }
  });
}

export default getForumById;
