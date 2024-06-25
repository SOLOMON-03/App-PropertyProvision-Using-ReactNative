import React, { useState } from "react";
import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    Alert,
    Linking,
    RefreshControl,
    StatusBar,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { getPost } from "../../lib/appwrite";
import useAppwrite from "../../lib/useAppwrite";
import { icons } from "../../constants";
import FormField from "../../components/FormField";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalContext } from "../../context/GlobalProvider";
import CustomButton from "../../components/CustomButton";

const BookingProduct = () => {
    const { id } = useLocalSearchParams();
    const { user } = useGlobalContext();
    const { data: posts, reFetch } = useAppwrite(() => getPost(id));
    const [refreshing, setRefreshing] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [LandLord, setLandLord] = useState(false);
    const onRefresh = async () => {
        setRefreshing(true);
        await reFetch();
        setRefreshing(false);
    };
    const onSubmit = () => {
        if (posts && posts.creator && posts.creator.email) {
            const mailtoLink = `mailto:${posts.creator.email}?subject=Regarding ${posts.title}&body=${message}`;
            setUploading(true);
            Linking.openURL(mailtoLink)
                .catch((err) => {
                    console.error("Failed to open mail client:", err); // Debugging line
                    Alert.alert("Error", "Could not open email client");
                })
                .finally(() => setUploading(false));
        } else {
            Alert.alert("Error", "Unable to get post details.");
        }
    };

    return (
        <SafeAreaView className="bg-black h-full">
            <ScrollView
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                <View className="flex-col mb-10">
                    <View className="w-full h-60 relative justify-center items-center z-[-1]">
                        <Image
                            source={{ uri: posts.thumnail }}
                            className="w-full h-full rounded-t-xl"
                            resizeMode="cover"
                        />
                    </View>
                    <View className="px-4 mt-5 space-y-6">
                        <View className="space-y-2">
                            <Text className="text-emerald-500 text-3xl font-PoppinsBold">
                                {posts.title}
                            </Text>
                            <Text className="text-gray-400 text-sm font-PoppinsLight text-justify">
                                {posts.description}
                            </Text>
                            <View className="flex-row items-end justify-start space-x-2">
                                <Image
                                    source={icons.map}
                                    className="w-6 h-6"
                                    resizeMode="contain"
                                    tintColor={"#34d399"}
                                />
                                <Text className="text-gray-200 text-xs font-MontserratMedium">
                                    {posts.location}
                                </Text>
                            </View>
                        </View>
                        <View className="flex-row space-x-4">
                            <View className="flex-row items-center justify-center bg-white flex-nowrap rounded-lg px-3 py-2 space-x-2">
                                <Image
                                    source={icons.price}
                                    className="w-6 h-6"
                                    resizeMode="contain"
                                    tintColor={"#022c22"}
                                />
                                {posts.land ? (
                                    <Text className="text-emerald-700 text-base font-QueensidesMedium font-bold text-justify">
                                        ${posts.price}
                                    </Text>
                                ) : (
                                    <Text className="text-emerald-700 text-base font-QueensidesMedium font-bold text-justify">
                                        ${posts.price}/month
                                    </Text>
                                )}
                            </View>
                            <View className="flex-row items-center justify-center flex-1 bg-green-600 rounded-lg px-3 py-2 space-x-2">
                                <Image
                                    source={icons.discount}
                                    className="w-6 h-6"
                                    resizeMode="contain"
                                    tintColor={"#022c22"}
                                />
                                <Text className="text-white text-base font-QueensidesMedium font-bold text-justify">
                                    ${posts.discount} OFF
                                </Text>
                            </View>
                        </View>
                        <TouchableOpacity className="w-full bg-red-600 rounded-2xl px-3 py-2" activeOpacity={0.6}>
                            {posts.land ? (
                                <View className="flex-row items-center justify-center space-x-2">
                                    <Image
                                        source={icons.sale}
                                        className="w-6 h-6"
                                        resizeMode="contain"
                                    />
                                    <Text className="text-white text-lg font-MontserratSemibold text-center">
                                        For Sale
                                    </Text>
                                </View>
                            ) : (
                                <View className="flex-row items-center justify-center space-x-2">
                                    <Image
                                        source={icons.rent}
                                        className="w-6 h-6"
                                        resizeMode="contain"
                                    />
                                    <Text className="text-white text-lg font-MontserratSemibold text-center">
                                        For Rent
                                    </Text>
                                </View>
                            )}
                        </TouchableOpacity>
                        <View className="flex-row space-x-2">
                            {!posts.land && (
                                <View className="flex-row space-x-2">
                                    <View className="flex-row items-center justify-start space-x-2">
                                        <Image
                                            source={icons.bathroom}
                                            className="w-6 h-5"
                                            resizeMode="contain"
                                            tintColor={"#34d399"}
                                        />
                                        {posts.bathroom > 1 ? (
                                            <Text className="text-gray-200 text-xs font-MontserratMedium">
                                                {posts.bathroom} baths
                                            </Text>
                                        ) : (
                                            <Text className="text-gray-200 text-xs font-MontserratMedium">
                                                {posts.bathroom} bath
                                            </Text>
                                        )}
                                    </View>
                                    <View className="flex-row items-center justify-start space-x-2">
                                        <Image
                                            source={icons.sleeping}
                                            className="w-6 h-6"
                                            resizeMode="contain"
                                            tintColor={"#34d399"}
                                        />
                                        {posts.bedroom > 1 ? (
                                            <Text className="text-gray-200 text-xs font-MontserratMedium">
                                                {posts.bedroom} beds
                                            </Text>
                                        ) : (
                                            <Text className="text-gray-200 text-xs font-MontserratMedium">
                                                {posts.bedroom} bed
                                            </Text>
                                        )}
                                    </View>
                                </View>
                            )}
                            {!posts.furnished && !posts.land && (
                                <View className="flex-row items-center justify-start">
                                    <Image
                                        source={icons.furniture}
                                        className="w-6 h-6"
                                        resizeMode="contain"
                                        tintColor={"#34d399"}
                                    />
                                    <Text className="text-gray-200 text-xs font-MontserratMedium">
                                        {posts.furnished} Furnished
                                    </Text>
                                </View>
                            )}
                            {!posts.parking && !posts.land && (
                                <View className="flex-row items-center justify-start">
                                    <Image
                                        source={icons.parking}
                                        className="w-5 h-5"
                                        resizeMode="contain"
                                        tintColor={"#34d399"}
                                    />
                                    <Text className="text-gray-200 text-xs font-MontserratMedium">
                                        {posts.parking} Parking
                                    </Text>
                                </View>
                            )}
                        </View>
                    </View>
                    { user?.email !== posts?.creator?.email && (!open ? (
                        <CustomButton
                            title="Contact LandLord"
                            handlePress={() => setOpen(!open)}
                            containerStyle="mt-7"
                            isLoading={uploading}
                        />
                    ) : (
                        <View className="m-4 bg-slate-500 space-y-4 p-4">
                            <TouchableOpacity
                                className="flex-row items-center justify-start space-x-2 mb-4"
                                onPress={() => setOpen(!open)}
                            >
                                <Image
                                    source={icons.leftArrow}
                                    className="w-4 h-4"
                                    resizeMode="contain"
                                    tintColor={"#34d399"}
                                />
                                <Text className="text-gray-200 text-xs font-MontserratMedium">
                                    Back
                                </Text>
                            </TouchableOpacity>
                            <FormField
                                value={message}
                                placeholdercolor="#ffffff"
                                placeholder="Type your message..."
                                handleChangeText={(e) => setMessage(e)}
                            />
                            <TouchableOpacity
                                onPress={onSubmit}
                                className={`bg-emerald-500 min-h-[62px] items-center justify-center rounded-xl ${uploading ? "opacity-50" : ""
                                    }`}
                                disabled={uploading}
                                activeOpacity={0.7}
                            >
                                <Text className="font-MontserratSemibold text-base">
                                    Submit
                                </Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
            </ScrollView>
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            <StatusBar style="light" />
        </SafeAreaView>
    );
};

export default BookingProduct;
