import { View, Text, TouchableOpacity, Alert } from "react-native";
import React from "react";
import { Image } from "react-native";
import { router } from "expo-router";
import { deletePost } from "../lib/appwrite";

const ShowProduct = ({ product }) => {
  const slug = product.$id;
  const handleSubmit = async () => {
    try {
      await deletePost(slug);
      Alert.alert("Success", "Product deleted successfully.");
    } catch (error) {
      Alert.alert("Error", "Failed to delete the product.");
      console.error("Delete Post Error:", error);
    }
  };
  return (
    <View className="w-full flex-1 px-4 mb-10">
      <View className="border border-gray-900 rounded-2xl h-20">
        <View className="flex-row items-center">
          <View className="">
            <Image
              source={{ uri: product.thumnail }}
              className="w-[78px] h-[78px] rounded-l-2xl"
              resizeMode="cover"
            />
          </View>
          <View className='flex-row justify-between flex-1'>
            <View className="w-48 gap-3 pl-3">
              <Text
                className="text-emerald-500 font-MontserratMedium"
                numberOfLines={1}
              >
                {product.title}
              </Text>
              <Text className="text-white font-PoppinsLight" numberOfLines={1}>
                {product.description}
              </Text>
            </View>
            <View className="items-center gap-4 mr-4">
              <TouchableOpacity onPress={() => router.push(`/update/${slug}`)}>
                <Text className="text-red-600 uppercase">Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleSubmit}>
                <Text className="text-green-600 uppercase">Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ShowProduct;
