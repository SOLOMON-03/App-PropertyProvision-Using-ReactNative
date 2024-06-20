import { View, Text, RefreshControl, FlatList, Image } from "react-native";
import React, { useState } from "react";
import useAppwrite from "../../lib/useAppwrite";
import { getBookmarkPosts } from "../../lib/appwrite";
import Product from "../../components/Product";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { images } from "../../constants";

const Bookmarks = () => {
  const { data: posts, reFetch } = useAppwrite(getBookmarkPosts);
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    setRefreshing(true);
    await reFetch();
    setRefreshing(false);
  };
  return (
    <SafeAreaView className="bg-black h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <Product product={item} />}
        ListHeaderComponent={() => (
          <View className="flex-1 justify-center items-center my-7">
            <Text className="text-emerald-500 text-3xl font-MontserratMedium">
              Bookmark
            </Text>
          </View>
        )}
        ListEmptyComponent={() => (
          <View className="justify-center items-center px-4">
            <Image
              source={images.empty}
              className="w-52 h-52"
              resizeMode="contain"
            />
            <Text className="text-3xl text-emerald-400 font-KalivoBlack tracking-widest">
              No bookmarks found!
            </Text>
            <Text className="text-base text-white font-PoppinsThin tracking-widest -mt-2 text-center">
              No bookmarks found for this query!
            </Text>
          </View>
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
      <StatusBar style="light" />
    </SafeAreaView>
  );
};

export default Bookmarks;
