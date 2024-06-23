// src/components/Product.js

import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import React from "react";
import { icons } from "../constants";
import { updateBookmarkPosts } from "../lib/appwrite";
import { useLikeContext } from "../context/LikeProvider";

const Product = ({
  product: {
    $id,
    title,
    thumnail,
    bookmark,
    creator: { username, avatar },
  },
}) => {
  const { likePost, unlikePost, isLiked } = useLikeContext();

  const handleLike = async () => {
    if (isLiked($id)) {
      unlikePost($id);
      await updateBookmarkPosts($id, false);
    } else {
      likePost({ $id, title, thumnail, bookmark, creator: { username, avatar } });
      await updateBookmarkPosts($id, true);
    }
  };

  return (
    <View className="flex-col items-center px-4 mb-10">
      <View className="flex-row gap-1 items-center mb-4">
        <View className="flex-row flex-1 justify-center items-center">
          <View className="w-[50px] h-[50px] rounded-full border border-emerald-500 justify-center items-center p-0.5">
            <Image
              source={{ uri: avatar }}
              className="w-full h-full rounded-full"
              resizeMode="cover"
            />
          </View>
          <View className="justify-center gap-y-1 flex-1 ml-3">
            <Text className="text-white font-MontserratSemibold text-base">
              {title}
            </Text>
            <Text className="text-emerald-500 font-MontserratSemibold text-xs">
              {username}
            </Text>
          </View>
        </View>
        <TouchableOpacity className="mr-1" onPress={handleLike}>
          <Image
            source={!isLiked($id) ? icons.like : icons.heart}
            className="w-7 h-7"
            resizeMode="cover"
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        className="w-full h-60 relative justify-center items-center z-[-1]"
        activeOpacity={0.7}
      >
        <Image
          source={{ uri: thumnail }}
          className="w-full h-full rounded-xl"
          resizeMode="cover"
        />
      </TouchableOpacity>
    </View>
  );
};

export default Product;
