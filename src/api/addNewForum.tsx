import axios from "./axios";

function AddNweForum(forumName, theme) {
  const user = JSON.parse(localStorage.getItem("@user"));
  return new Promise((resolve, reject) => {
    try {
      const response = axios.post(
        "/forums/new-forum",
        {
          forumName: forumName,
          theme: theme,
          userId: user._id,
        },
        { headers: { authToken: user.token } }
      );
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
}

export default AddNweForum;
