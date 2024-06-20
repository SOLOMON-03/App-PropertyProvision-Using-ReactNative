import { View, Text, FlatList} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import { StatusBar } from "expo-status-bar";
import SearchInput from "../../components/SearchInput";
import Empty from "../../components/Empty";
import { searchPosts } from "../../lib/appwrite";
import useAppwrite from "../../lib/useAppwrite";
import Product from "../../components/Product";
import { useLocalSearchParams } from "expo-router";

const Search = () => {
  const { query } = useLocalSearchParams();
  const { data: posts, reFetch } = useAppwrite(() => searchPosts(query));
  useEffect(() => {
    reFetch();
  }, [query]);
  return (
    <SafeAreaView className="bg-black h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <Product product={item} />}
        ListHeaderComponent={() => (
          <View className="px-4 mt-5 mb-4">
            <Text className="text-lg text-emerald-400 font-KalivoBlack -mb-2">
              Search Result
            </Text>
            <Text className="text-2xl text-white font-PoppinsSemibold tracking-widest mb-2">
              {query}
            </Text>
            <SearchInput initialQuery={query} />
          </View>
        )}
        ListEmptyComponent={() => (
          <Empty title="No products found!" subtitle="No products found for this query!" />
        )}
      />
      <StatusBar style="light" />
    </SafeAreaView>
  );
};

export default Search;
