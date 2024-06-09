import { TouchableOpacity, Text } from "react-native";
import React from "react";

const CustomButton = ({
    title,
    handlePress,
    containerStyle,
    textStyle,
    isLoading,
}) => {
    return (
        <TouchableOpacity
            onPress={handlePress}
            activeOpacity={0.6}
            className={`bg-emerald-500 min-h-[62px] items-center justify-center rounded-xl ${containerStyle} ${isLoading ? 'opacity-50' : ''}`}
            disabled={isLoading}
        >
            <Text className={`font-MontserratSemibold text-base ${textStyle}`}>{title}</Text>
        </TouchableOpacity>
    );
};

export default CustomButton;
