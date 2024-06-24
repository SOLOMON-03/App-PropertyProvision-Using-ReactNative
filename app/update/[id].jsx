import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Image,
    Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { icons } from "../../constants";
import CheckBox from "react-native-check-box";
import * as ImagePicker from "expo-image-picker";
import { router, useLocalSearchParams } from "expo-router";
import { getPost, updateProduct } from "../../lib/appwrite";

const Update = () => {
    const { id } = useLocalSearchParams();
    const [uploading, setUploading] = useState(false);
    const [form, setForm] = useState({
        title: "",
        thumnail: null,
        description: "",
        price: 0,
        discount: 0,
        bedroom: 1,
        bathroom: 1,
        furnished: false,
        parking: false,
        rent: false,
        location: "",
        land: false,
    });

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const productDetails = await getPost(id);
                setForm({
                    title: productDetails.title,
                    thumnail: { uri: productDetails.thumnail },
                    description: productDetails.description,
                    price: String(productDetails.price),
                    discount: String(productDetails.discount),
                    bedroom: String(productDetails.bedroom),
                    bathroom: String(productDetails.bathroom),
                    furnished: productDetails.furnished,
                    parking: productDetails.parking,
                    rent: productDetails.rent,
                    location: productDetails.location,
                    land: productDetails.land,
                });
            } catch (error) {
                console.error("Failed to fetch product details:", error);
                Alert.alert("Error", "Failed to fetch product details.");
            }
        };

        if (id) {
            fetchProductDetails();
        }
    }, [id]);

    const openPicker = async (selectType) => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.canceled) {
            setForm({ ...form, thumnail: result.assets[0] });
        }
    };

    const submit = async () => {
        if (
            !form.title ||
            !form.thumnail ||
            !form.price ||
            !form.description ||
            !form.location ||
            !form.discount
        ) {
            return Alert.alert("Error", "Please fill all the fields!");
        }
        setUploading(true);
        try {
            await updateProduct(id, form);
            Alert.alert("Success", "Post Updated!");
            router.push("/home");
        } catch (error) {
            console.error("Update Product Error:", error);
            Alert.alert("Error", error.message);
        } finally {
            setUploading(false);
        }
    };

    return (
        <SafeAreaView className="bg-black h-full">
            <ScrollView className="px-4 my-6">
                <Text className="text-emerald-500 font-Swansea text-3xl text-center">
                    Update Product
                </Text>
                <FormField
                    title="Product Title"
                    value={form.title}
                    placeholder="Valid title for your product"
                    handleChangeText={(e) => setForm({ ...form, title: e })}
                    otherStyle="mt-10"
                />
                <FormField
                    title="Description"
                    value={form.description}
                    placeholder="Valid description for your product"
                    handleChangeText={(e) => setForm({ ...form, description: e })}
                    otherStyle="mt-10"
                />
                <FormField
                    title="Price"
                    value={form.price}
                    placeholder="Eg. 10000"
                    handleChangeText={(e) => setForm({ ...form, price: Number(e) })}
                    otherStyle="mt-10"
                />
                <FormField
                    title="Discount"
                    value={form.discount}
                    placeholder="Eg. 1000"
                    handleChangeText={(e) => setForm({ ...form, discount: Number(e) })}
                    otherStyle="mt-10"
                />
                <FormField
                    title="Location"
                    value={form.location}
                    placeholder="Valid location"
                    handleChangeText={(e) => setForm({ ...form, location: e })}
                    otherStyle="mt-10"
                />
                <View className="flex-row mt-10 justify-center ">
                    <View className="flex-1">
                        <CheckBox
                            checkBoxColor="#10b981"
                            rightText={"Land"}
                            rightTextStyle={{ color: "white", marginLeft: 10 }}
                            isChecked={form.land}
                            onClick={() => {
                                setForm({ ...form, land: !form.land });
                            }}
                        />
                    </View>
                </View>
                {!form.land && (
                    <>
                        <View className="flex-row">
                            <FormField
                                title="Bedroom"
                                value={form.bedroom}
                                placeholder="1"
                                handleChangeText={(e) =>
                                    setForm({ ...form, bedroom: Number(e) })
                                }
                                otherStyle="mt-10 mr-10"
                            />
                            <FormField
                                title="Bathroom"
                                value={form.bathroom}
                                placeholder="1"
                                handleChangeText={(e) =>
                                    setForm({ ...form, bathroom: Number(e) })
                                }
                                otherStyle="mt-10"
                            />
                        </View>

                        <View className="flex-row mt-10 justify-center ">
                            <View className="flex-1">
                                <CheckBox
                                    checkBoxColor="#10b981"
                                    rightText={"Furnished"}
                                    rightTextStyle={{ color: "white", marginLeft: 10 }}
                                    isChecked={form.furnished}
                                    onClick={() =>
                                        setForm({ ...form, furnished: !form.furnished })
                                    }
                                />
                            </View>
                            <View className="flex-1">
                                <CheckBox
                                    checkBoxColor="#10b981"
                                    rightText={"Parking"}
                                    rightTextStyle={{ color: "white", marginLeft: 10 }}
                                    isChecked={form.parking}
                                    onClick={() => setForm({ ...form, parking: !form.parking })}
                                />
                            </View>
                            <View className="flex-1">
                                <CheckBox
                                    checkBoxColor="#10b981"
                                    rightText={"Rent"}
                                    rightTextStyle={{ color: "white", marginLeft: 10 }}
                                    isChecked={form.rent}
                                    onClick={() => setForm({ ...form, rent: !form.rent })}
                                />
                            </View>
                        </View>
                    </>
                )}
                <View className="w-full mt-7 space-y-2">
                    <Text className="text-base font-Swansea text-gray-300">
                        Upload Image
                    </Text>
                    <TouchableOpacity onPress={() => openPicker("image")}>
                        {form.thumnail ? (
                            <Image
                                source={{ uri: form.thumnail.uri }}
                                resizeMode="cover"
                                className="w-full h-56 rounded-2xl"
                            />
                        ) : (
                            <View className="w-full h-16 px-4 bg-emerald-950 rounded-2xl justify-center items-center border-2 border-emerald-900 flex-row space-x-2">
                                <Image
                                    source={icons.upload}
                                    resizeMode="contain"
                                    className="w-5 h-5"
                                    tintColor="#34d399"
                                />
                                <Text className="text-sm text-gray-300 font-MaisondeartisanRegular">
                                    Choose a file
                                </Text>
                            </View>
                        )}
                    </TouchableOpacity>
                </View>
                <CustomButton
                    title="Submit"
                    handlePress={submit}
                    containerStyle="mt-7"
                    isLoading={uploading}
                />
            </ScrollView>
            <StatusBar style="light" />
        </SafeAreaView>
    );
};

export default Update;
