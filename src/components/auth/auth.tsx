import React, { useEffect, useState } from "react";
import getAllPosts from "../../api/getAllPosts";

function Auth() {
  const [posts, setPosts] = useState({
      id: '',
      name: '',
      photoUrl: '',
      forumName: ''
  });
  useEffect(() => {
    getAllPosts().then((res: any) => {
      setPosts(res.data);
    });
  }, []);
  return (
    <div>
      <p className="mb-0">hello from Auth component</p>
      <div>{posts.forumName}</div>
      <div>{posts.id}</div>
      <div>{posts.name}</div>
      <div>{posts.photoUrl}</div>
    </div>
  );
}

export default Auth;
