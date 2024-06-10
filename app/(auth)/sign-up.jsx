import { View, Text, ScrollView, Image, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { Link, router } from "expo-router";
import { createUser } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";


const SignUp = () => {  
  const { setUser, setIsLoggedIn } = useGlobalContext();
  const [form, setForm] = useState({
    username: '',
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submit = async() => {
    if(!form.username || !form.email || !form.password){
      Alert.alert('Error', 'Please fill all the fields!')
    }
    setIsSubmitting(true);
    try {
      const result = await createUser(form.email, form.password, form.username);
      setUser(result);
      setIsLoggedIn(true);
      router.replace('/home');
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally{
      setIsSubmitting(false);
    }
  };
  return (
    <SafeAreaView className="bg-black h-full">
      <ScrollView>
        <View className="w-full min-h-screen px-4 justify-center items-center">
          <Image
            source={images.logo}
            className="w-[150px] h-[100px]"
            resizeMode="contain"
          />
          <Text className="text-emerald-500 text-3xl font-MontserratSemibold mt-5">
            Create an Account
          </Text>
          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyle="mt-7"
          />
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyle="mt-7"
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyle="mt-7"
          />
          <CustomButton
            title="Sign Up"
            handlePress={submit}
            containerStyle="mt-7 w-full"
            isLoading={isSubmitting}
          />
          <View className="justify-center pt-5 flex-row gap-2">
            <Text className='text-white text-base'>
              Already have an Account?{' '}
              <Link href="/sign-in" className="text-emerald-500">Sign In</Link>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
