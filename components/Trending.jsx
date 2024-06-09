import { FlatList, TouchableOpacity, ImageBackground } from "react-native";
import React, { useState } from "react";
import * as Animatable from "react-native-animatable";
const zoomIn = {
  0: {
    scale: 0.9,
  },
  1: {
    scale: 1.1,
  },
};
const zoomOut = {
  0: {
    scale: 1,
  },
  1: {
    scale: 0.9,
  },
};

const TrendingItem = ({ activeItem, item }) => {
  
  return (
  <Animatable.View
    className='px-4'
    animation={activeItem === item.$id ? zoomIn : zoomOut}
    duration={500}
  >
    <TouchableOpacity className='relative justify-center items-center ' activeOpacity={0.8}>
      <ImageBackground 
        source={{uri: item.thumnail}}
        className='w-64 h-52 rounded-xl my-5 overflow-hidden shadow-lg shadow-emerald-500 '
        resizeMode="cover"
      />
    </TouchableOpacity>
  </Animatable.View>
  );
};

const Trending = ({ posts }) => {
  const [activeItem, setActiveItem] = useState(posts[0]);
  const viewableItemChanged = ({viewableItems}) => {
    if(viewableItems.length > 0){
      setActiveItem(viewableItems[0].key);
    }
  }
  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <TrendingItem activeItem={activeItem} item={item} />
      )}
      horizontal
      onViewableItemsChanged={viewableItemChanged}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 70
      }}
      contentOffset={{ x: 170 }}
    />
  );
};

export default Trending;
