
import React, { createContext, useContext, useState } from "react";

const LikeContext = createContext();

export const LikeProvider = ({ children }) => {
  const [likedPosts, setLikedPosts] = useState([]);

  const likePost = (post) => {
    setLikedPosts((prevLikedPosts) => [...prevLikedPosts, post]);
  };

  const unlikePost = (postId) => {
    setLikedPosts((prevLikedPosts) =>
      prevLikedPosts.filter((post) => post.$id !== postId)
    );
  };

  const isLiked = (postId) => likedPosts.some((post) => post.$id === postId);

  return (
    <LikeContext.Provider value={{ likedPosts, likePost, unlikePost, isLiked }}>
      {children}
    </LikeContext.Provider>
  );
};

export const useLikeContext = () => useContext(LikeContext);
