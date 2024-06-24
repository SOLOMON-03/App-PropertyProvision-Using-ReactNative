import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import { StatusBar } from "expo-status-bar";
import SearchInput from "../../components/SearchInput";
import Empty from "../../components/Empty";
import {
  getAllposts,
  getFurnishedPosts,
  getHomePosts,
  getLandPosts,
  getParkingPosts,
  getRentPosts,
  getSalePosts,
} from "../../lib/appwrite";
import Product from "../../components/Product";

const Bookings = () => {
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedType, setSelectedType] = useState("All");

  useEffect(() => {
    fetchPosts(selectedType);
  }, []);

  const fetchPosts = async (typeName) => {
    let fetchedPosts = [];
    if (typeName === "All") {
      fetchedPosts = await getAllposts();
    } else if (typeName === "Rent") {
      fetchedPosts = await getRentPosts();
    } else if (typeName === "Sale") {
      fetchedPosts = await getSalePosts();
    } else if (typeName === "Home") {
      fetchedPosts = await getHomePosts();
    } else if (typeName === "Land") {
      fetchedPosts = await getLandPosts();
    } else if (typeName === "Parking") {
      fetchedPosts = await getParkingPosts();
    } else if (typeName === "Furnished") {
      fetchedPosts = await getFurnishedPosts();
    }
    setPosts(fetchedPosts);
  };

  const handleTypeSelection = (typeName) => {
    setSelectedType(typeName);
    fetchPosts(typeName);
  };

  const type = [
    { typeName: "All" },
    { typeName: "Rent" },
    { typeName: "Sale" },
    { typeName: "Home" },
    { typeName: "Land" },
    { typeName: "Parking" },
    { typeName: "Furnished" },
  ];

  return (
    <SafeAreaView className="bg-black h-full">
      
      <FlatList
          data={posts}
          keyExtractor={(item) => item.$id}
          renderItem={({ item }) => <Product product={item} />}
          ListHeaderComponent={() => (
            <View className="my-3 px-4">
            <View className="flex-row justify-between items-center mb-4 px-4">
              <Text className="text-3xl text-white font-MontserratMedium tracking-widest">
                Booking
              </Text>
              <View className="">
                <Image
                  source={images.logo}
                  className="w-24 h-24"
                  resizeMode="contain"
                />
              </View>
            </View>
            <SearchInput />
            <View className="flex-row flex-wrap justify-center px-4 my-3">
              {type.map((method) => (
                <View key={method.typeName}>
                  <TouchableOpacity
                    className={`rounded-lg mr-3 ${
                      selectedType === method.typeName ? "bg-emerald-500" : ""
                    }`}
                    onPress={() => handleTypeSelection(method.typeName)}
                  >
                    <Text
                      className={`px-4 py-2 font-Swansea text-sm ${
                        selectedType === method.typeName
                          ? "text-black"
                          : "text-white"
                      }`}
                    >
                      {method.typeName}
                    </Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>
          )}
          ListEmptyComponent={() => (
            <Empty title="No products found!" subtitle="Be the First!" />
          )}
          refreshing={refreshing}
          onRefresh={() => fetchPosts(selectedType)}
          vertical
        />
      <StatusBar style="light" />
    </SafeAreaView>
  );
};

export default Bookings;
