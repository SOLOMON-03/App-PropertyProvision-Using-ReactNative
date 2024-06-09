import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { icons } from '../constants'

const Product = ({
  product: {
    title,
    thumnail,
    creator: { username, avatar },
  },
}) => {
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
        <View className='pr-1'>
          <Image 
            source={icons.menu}
            className='w-5 h-5 '
            resizeMode="contain"
          />
        </View>
      </View>
      <TouchableOpacity className="w-full h-60 relative justify-center items-center" activeOpacity={0.7}>
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
