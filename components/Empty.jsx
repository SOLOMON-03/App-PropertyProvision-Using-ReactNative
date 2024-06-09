import { View, Text, Image } from "react-native";
import React from "react";
import { images } from "../constants";
import CustomButton from '../components/CustomButton'
import { router } from "expo-router";

const Empty = ({title, subtitle}) => {
  return (
    <View className="justify-center items-center px-4">
      <Image source={images.empty} className="w-52 h-52" resizeMode="contain" />
      <Text className="text-3xl text-emerald-400 font-KalivoBlack tracking-widest">
        {title}
      </Text>
      <Text className="text-lg text-white font-PoppinsThin tracking-widest -mt-2 text-center">
        {subtitle}
      </Text>
      <CustomButton 
        title='Create Products'
        handlePress={()=> router.push('/create')}
        containerStyle='w-full my-5'
      />
    </View>
  );
};

export default Empty;
