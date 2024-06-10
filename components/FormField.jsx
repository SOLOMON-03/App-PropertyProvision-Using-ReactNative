import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { icons } from "../constants";

const FormField = ({
    title,
    value,
    handleChangeText,
    placeholder,
    otherStyle,
    ...props
}) => {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <View className={`space-y-2 ${otherStyle} `}>
            <Text className="text-base font-Swansea text-gray-300">{title}</Text>
            <View className="border-b-2 border-none w-full h-12 border-emerald-500  px-4 focus:border-white items-center flex-row">
                <TextInput
                    className="text-sm font-PoppinsLight flex-1 text-white"
                    value={value}
                    placeholder={placeholder}
                    placeholderTextColor="#7b7b8b"
                    onChangeText={handleChangeText}
                    secureTextEntry={title === "Password" && !showPassword}
                />
                {title === "Password" && (
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <Image
                            source={!showPassword ? icons.eye : icons.eyeHide}
                            className="w-6 h-6"
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

export default FormField;
