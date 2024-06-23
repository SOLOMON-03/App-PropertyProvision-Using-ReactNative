import React, { useCallback, useEffect } from "react";
import { Stack, SplashScreen } from "expo-router";
import { useFonts } from "expo-font";
import GlobalProvider from "../context/GlobalProvider";
import { LikeProvider } from "../context/LikeProvider";

SplashScreen.preventAutoHideAsync();

const rootLayout = () => {
  const [fontsLoaded, fontError] = useFonts({
    Lansdowne: require("../assets/Fonts/Lansdowne DEMO.otf"),
    "Kalivo-Black": require("../assets/Fonts/Kalivo-Black.ttf"),
    MaisondeartisanfreeRegular: require("../assets/Fonts/MaisondeartisanfreeRegular-qZl52.otf"),
    MontserratBlack: require("../assets/Fonts/MontserratBlack-3zOvZ.ttf"),
    MontserratMedium: require("../assets/Fonts/MontserratMedium-nRxlJ.ttf"),
    MontserratMediumItalic: require("../assets/Fonts/MontserratMediumItalic-1GPK4.otf"),
    MontserratSemibold: require("../assets/Fonts/MontserratSemibold-8M8PB.otf"),
    "Poppins-Black": require("../assets/Fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/Fonts/Poppins-Bold.ttf"),
    "Poppins-Light": require("../assets/Fonts/Poppins-Light.ttf"),
    "Poppins-Italic": require("../assets/Fonts/Poppins-Italic.ttf"),
    "Poppins-SemiBold": require("../assets/Fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../assets/Fonts/Poppins-Thin.ttf"),
    Queensides: require("../assets/Fonts/Queensides-3z7Ey.ttf"),
    QueensidesLight: require("../assets/Fonts/QueensidesLight-ZVj3l.ttf"),
    QueensidesMedium: require("../assets/Fonts/QueensidesMedium-x30zV.ttf"),
    Swansea: require("../assets/Fonts/Swansea-q3pd.ttf"),
    SwanseaBold: require("../assets/Fonts/SwanseaBold-D0ox.ttf"),
    SwanseaItalic: require("../assets/Fonts/SwanseaItalic-AwqD.ttf"),
    verdanaBold: require("../assets/Fonts/verdana-bold.ttf"),
    verdana: require("../assets/Fonts/verdana.ttf"),
  });
  useEffect(() => {
    if (fontError) throw fontError;

    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <GlobalProvider>
      <LikeProvider>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="search/[query]"
            options={{ headerShown: false }}
          />
          <Stack.Screen name="update/[id]" options={{ headerShown: false }} />
        </Stack>
      </LikeProvider>
    </GlobalProvider>
  );
};

export default rootLayout;
