import axios from "./axios";

function AddNewPost(post) {
  const {
    headerText,
    headerHTML,
    bodyText,
    bodyHTML,
    tags,
    category,
    comments,
    pinned,
    saved,
    liked,
    forumId,
  } = post;
  const user = JSON.parse(localStorage.getItem("@user"));
  return new Promise((resolve, reject) => {
    try {
      const response = axios.post(
        `forums/${forumId}/posts/new-post`,
        {
          forumId: forumId,
          headerText: headerText,
          headerHTML: headerHTML,
          bodyText: bodyText,
          bodyHTML: bodyHTML,
          tags: tags,
          category: category,
          comments: comments,
          pinned: pinned,
          saved: saved,
          liked: liked,
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

export default AddNewPost;
