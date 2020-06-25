import axios from "./axios";

function AddNweForum(name) {
  return new Promise((resolve, reject) => {
    try {
      const response = axios.post(
        "/forums/new-forum",
        {
          forumName: name,
        },
        { headers: { authToken: localStorage.getItem("token") } }
      );
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
}

export default AddNweForum;
