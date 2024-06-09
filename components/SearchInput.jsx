import {
    View,
    TextInput,
    TouchableOpacity,
    Image,
    Alert,
} from "react-native";
import React, { useState } from "react";
import { icons } from "../constants";
import { router, usePathname } from "expo-router";

const SearchInput = ({ initialQuery }) => {
    const pathname = usePathname();
    const [query, setQuery] = useState(initialQuery || "");
    return (
        <View className="border-2 w-full h-16 opacity-80 mb-5 border-white rounded-xl px-4 focus:border-emerald-500 items-center flex-row space-x-4">
            <TextInput
                className="text-base font-verdana flex-1 text-white"
                value={query}
                placeholder="Search for an property"
                placeholderTextColor="#7b7b8b"
                onChangeText={(e) => setQuery(e)}
            />
            <TouchableOpacity
                onPress={() => {
                    if (query === "")
                        return Alert.alert(
                            "Missing Query",
                            "Please input something to search results across database"
                        );

                    if (pathname.startsWith("/search")) router.setParams({ query });
                    else router.push(`/search/${query}`);
                }}
            >
                <Image
                    source={icons.search}
                    className="w-5 h-5 opacity-90"
                    resizeMode="contain"
                />
            </TouchableOpacity>
        </View>
    );
};

export default SearchInput;
