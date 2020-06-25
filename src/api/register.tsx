import axios from "./axios";

function register(name, email, imageUrl) {
  return new Promise((resolve, reject) => {
    try {
      const response = axios.post("/auth/register", {
        name,
        email,
        imageUrl,
      });
      return resolve(response);
    } catch (err) {
      return reject(err);
    }
  });
}

export default register;
