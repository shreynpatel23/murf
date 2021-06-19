import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

export function callGetApi(url: string, ...params: any) {
  return new Promise(async (resolve, reject) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(url, {
        ...params,
        headers: { authToken: token },
      });
      return resolve(response.data);
    } catch (error) {
      return reject(error);
    }
  });
}

export function callPutApi(url: string, ...params: any) {
  return new Promise(async (resolve, reject) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(url, ...params, {
        headers: { authToken: token },
      });
      return resolve(response.data);
    } catch (error) {
      return reject(error);
    }
  });
}

export function callPostApi(url: string, ...params: any) {
  return new Promise(async (resolve, reject) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(url, ...params, {
        headers: { authToken: token },
      });
      return resolve(response);
    } catch (err) {
      return reject(err);
    }
  });
}

export default axios;
