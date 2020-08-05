import axios from "./axios";

function register(name, email, imageUrl, userName) {
  return new Promise((resolve, reject) => {
    try {
      const response = axios.post("/register", {
        name,
        email,
        imageUrl,
        userName,
      });
      return resolve(response);
    } catch (err) {
      return reject(err);
    }
  });
}

export default register;
