import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { icons } from "../constants";
import { deleteBookmarkPosts, getBookmarkPost, updateBookmarkPosts } from "../lib/appwrite";
import { useGlobalContext } from "../context/GlobalProvider";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useAppwrite from "../lib/useAppwrite";
import { useLikeContext } from "../context/LikeProvider";

const Product = ({
  product: {
    $id,
    title,
    thumnail,
    creator: { username, avatar },
  },
}) => {
  const [like, setLike] = useState(false);
  const { user } = useGlobalContext();
  const { isLiked, likePost, unlikePost } = useLikeContext();

  useEffect(() => {
    const loadLikedStatus = async () => {
      try {
        const likedStatus = await AsyncStorage.getItem(`liked_${$id}_${user?.$id}`);
        if (likedStatus !== null) {
          setLike(JSON.parse(likedStatus));
        }
      } catch (error) {
        console.error("Error loading liked status:", error);
      }
    };

    loadLikedStatus();
  }, [$id, user?.$id]);

  const handleLike = async () => {
    try {
      if (isLiked($id)) {
        await unlikePost($id);
        await deleteBookmarkPosts($id, user?.$id); 
        setLike(false);
        await AsyncStorage.setItem(`liked_${$id}_${user?.$id}`, JSON.stringify(false));
      } else {
        await likePost({ $id, title, thumnail, creator: { username, avatar } });
        await updateBookmarkPosts($id, user?.$id); 
        setLike(true);
        await AsyncStorage.setItem(`liked_${$id}_${user?.$id}`, JSON.stringify(true));
      }
    } catch (error) {
      console.error("Error handling like:", error);
      setLike(false);
      await AsyncStorage.setItem(`liked_${$id}_${user?.$id}`, JSON.stringify(false));
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
            source={like ? icons.heart : icons.like}
            className="w-7 h-7"
            resizeMode="cover"
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        className="w-full h-60 relative justify-center items-center z-[-1]"
        activeOpacity={0.7}
        onPress={() => router.push(`/viewproduct/${$id}`)}
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
