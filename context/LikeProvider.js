import React, { createContext, useContext, useState } from "react";

const LikeContext = createContext();

const LikeProvider = ({ children }) => {
  const [likedPosts, setLikedPosts] = useState([]);

  const isLiked = (postId) => {
    return likedPosts.some((post) => post.$id === postId);
  };

  const unlikePost = (postId) => {
    const updatedLikedPosts = likedPosts.filter((post) => post.$id !== postId);
    setLikedPosts(updatedLikedPosts);
  };

  const likePost = (post) => {
    const updatedLikedPosts = [...likedPosts, post];
    setLikedPosts(updatedLikedPosts);
  };

  return (
    <LikeContext.Provider value={{ likedPosts, likePost, unlikePost, isLiked }}>
      {children}
    </LikeContext.Provider>
  );
};

export const useLikeContext = () => useContext(LikeContext);

export default LikeProvider;
