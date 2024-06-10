import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { icons } from "../../constants";
import CheckBox from "react-native-check-box";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { createProduct } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";

const Create = () => {
  const { user } = useGlobalContext();
  const [uploading, setUploading] = useState(false);
  const [land, setLand] = useState(false);
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
  });
  const openPicker = async (selectType) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setForm({ ...form, thumnail: result.assets[0] });
    } else {
      setTimeout(() => {
        Alert.alert("Document Picked", JSON.stringify(result, null, 2));
      }, 100);
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
      await createProduct({
        ...form,
        userId: user?.$id,
      });
      Alert.alert("Success", "Post Uploaded!");
      router.push("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setForm({
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
      });
      setUploading(false);
    }
  };
  return (
    <SafeAreaView className="bg-black h-full">
      <ScrollView className="px-4 my-6">
        <Text className="text-emerald-500 font-Swansea text-3xl text-center">
          Create Product
        </Text>
        <View className="flex-row justify-center mt-10  self-center p-3 rounded-lg">
          <TouchableOpacity onPress={() => setLand(!land)}>
            <Text
              className={`text-xl font-verdana w-40 text-center p-3 rounded-lg ${
                !land ? "text-black bg-emerald-500" : "text-white"
              } `}
            >
              Home
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setLand(!land)}>
            <Text
              className={`text-xl font-verdana w-40 text-center p-3 rounded-lg ${
                land ? "text-black bg-emerald-500" : "text-white"
              } `}
            >
              Land
            </Text>
          </TouchableOpacity>
        </View>
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
        {!land && (
          <>
            <View className="flex-row">
              <FormField
                title="Bedroom"
                value={form.bedroom}
                placeholder="1"
                handleChangeText={(e) => setForm({ ...form, bedroom: Number(e) })}
                otherStyle="mt-10 mr-10"
              />
              <FormField
                title="Bathroom"
                value={form.bathroom}
                placeholder="1"
                handleChangeText={(e) => setForm({ ...form, bathroom: Number(e) })}
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

export default Create;
