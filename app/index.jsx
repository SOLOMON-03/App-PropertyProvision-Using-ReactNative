import { Link, Redirect, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  Image,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../constants";
import CustomButton from "../components/CustomButton";
import { useGlobalContext } from "../context/GlobalProvider";

export default function App() {
  const { isLoading, isLoggedIn } = useGlobalContext();
  if(!isLoading && isLoggedIn ) return <Redirect href='/home' />
  return (
    <SafeAreaView className="bg-black h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full h-full px-4 items-center justify-center">
          <Image
            source={images.logo}
            className="w-[150px] h-[100px]"
            resizeMode="contain"
          />
          <Image
            source={images.explore}
            className='w-[300px] h-[300px] '
            resizeMode='contain'
          />
          <Text className=" text-3xl text-emerald-500 text-center font-SwanseaBold pb-4">
            Make a{' '}
            <Text className="text-white font-MaisondeartisanRegular">
              endless dream
            </Text>
            {' '}with us!
          </Text>
          <Text className=" text-sm text-gray-100 text-center font-PoppinsThin">
            we believe that finding your dream property should be a seamless and enjoyable
            experience.
          </Text>
          <CustomButton title="Continue With Email" handlePress={() => {router.push('/sign-in')}} containerStyle='w-full mt-7' />
        </View>
        <StatusBar backgroundColor="#161622" style="light" />
      </ScrollView>
    </SafeAreaView>
  );
}
