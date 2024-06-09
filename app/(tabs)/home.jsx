import { View, Text, FlatList, Image, RefreshControl } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import { StatusBar } from "expo-status-bar";
import SearchInput from "../../components/SearchInput";
import Trending from "../../components/Trending";
import Empty from "../../components/Empty";
import { getAllposts, latestPosts } from "../../lib/appwrite";
import useAppwrite from '../../lib/useAppwrite'
import Product from "../../components/Product";

const Home = () => {
  const { data: posts, reFetch } = useAppwrite(getAllposts);
  const { data: latest } = useAppwrite(latestPosts);
  const [refreshing, setRefreshing] = useState(false)
  const onRefresh = async () => {
    setRefreshing(true);
    await reFetch();
    setRefreshing(false);
  }
  return (
    <SafeAreaView className="bg-black h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <Product product={item} />}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-4">
            <View className="flex-row justify-between items-start mb-6">
              <View className="">
                <Text className="text-xl text-emerald-400 font-KalivoBlack">Welcome Back</Text>
                <Text className="text-3xl text-white font-PoppinsSemibold tracking-widest -mt-2">Solomon</Text>
              </View>
              <View className='-mt-4'>
                <Image 
                  source={images.logo}
                  className='w-24 h-24'
                  resizeMode="contain"
                />
              </View>
            </View>
            <SearchInput />
            <View className='w-full flex-1 pt-5 pb-8'>
              <Text className='text-emerald-500 text-lg font-QueensidesMedium mb-3'>Latest Images</Text>
              <Trending posts={latest ?? []} />
            </View>
          </View>
        )}
        ListEmptyComponent={()=>(
          <Empty title='No products found!' subtitle='Be the First!' />
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
      <StatusBar style="light" />
    </SafeAreaView>
  );
};

export default Home;
