import { View, FlatList, TouchableOpacity, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Empty from "../../components/Empty";
import { getUserPosts, signOut } from "../../lib/appwrite";
import useAppwrite from "../../lib/useAppwrite";
import Product from "../../components/Product";
import { useGlobalContext } from "../../context/GlobalProvider";
import { icons } from "../../constants";
import InfoBox from "../../components/InfoBox";
import { router } from "expo-router";

const Profile = () => {
  const { user, setUser, setIsLoggedIn } = useGlobalContext();
  const { data: posts } = useAppwrite(() => getUserPosts(user?.$id));
  const logout = async () => {
    await signOut();
    setUser(null);
    setIsLoggedIn(false);
    router.replace('/sign-in');
  };
  return (
    <SafeAreaView className="bg-black h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <Product product={item} />}
        ListHeaderComponent={() => (
          <View className="w-full justify-center items-center mb-12 mt-6 px-4">
            <TouchableOpacity
              className="mb-10 w-full items-end"
              onPress={logout}
            >
              <Image
                source={icons.logout}
                className="w-5 h-6"
                resizeMode="contain"
              />
            </TouchableOpacity>
            <View className="w-24 h-24 items-center justify-center rounded-full border border-emerald-500">
              <Image
                source={{ uri: user?.avatar }}
                className="w-[90%] h-[90%] rounded-full"
                resizeMode="contain"
              />
            </View>
            <InfoBox
              title={user?.username}
              containerStyle="mt-2"
              titleStyle="text-lg"
            />
            <View className='flex-row mt-2'>
              <InfoBox
                title={posts.length || 0}
                subtitle="Posts"
                containerStyle="mr-10"
                titleStyle="text-xl"
              />
              <InfoBox
                title='1.2k'
                subtitle="Viewers"
                titleStyle="text-xl"
              />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <Empty
            title="No products found!"
            subtitle="No products found for this query!"
          />
        )}
      />
      <StatusBar style="light" />
    </SafeAreaView>
  );
};

export default Profile;
