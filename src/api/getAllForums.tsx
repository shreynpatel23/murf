import axios from "./axios";

function getAllForums() {
  return new Promise((resolve, reject) => {
    try {
      const response = axios.get("/forums");
      return resolve(response);
    } catch (err) {
      return reject(err);
    }
  });
}

export default getAllForums;
