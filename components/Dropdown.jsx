import { useFonts } from "expo-font";
import React, { useState } from "react";
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { icons } from "../constants";

const Dropdown = () => {
  const [selected, setSelected] = useState(false);

  return (
    <View>
      <TouchableOpacity onPress={() => setSelected(!selected)}>
        <Image source={icons.menu} className="w-5 h-5" resizeMode="contain" />
      </TouchableOpacity>
      {
        selected && (
            <FlatList 
                keyExtractor={(item) => item.value}
                data={[
                    {value: 'Edit'},
                    {value: 'Delete'},
                ]}
                renderItem={({item}) => (
                    <TouchableOpacity className='mt-2'>
                        <Text className='text-emerald-500 z-[-1] font-PoppinsSemibold text-base'>{item.value}</Text>
                    </TouchableOpacity>
                )}
                className='absolute right-0 top-10 w-24 bg-black rounded-2xl p-3 shadow-2xl border border-emerald-500 shadow-emerald-500'
            />
        )
      }
    </View>
  );
};
export default Dropdown;
