import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import AnimatedSplashScreen from "@/components/SplashScreen";
// import "./global.css";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "inter-Bold": require("../assets/fonts/Inter_18pt-Black.ttf"),
    "inter-ExtraBold": require("../assets/fonts/Inter_18pt-BlackItalic.ttf"),
    "inter-Light": require("../assets/fonts/Inter_18pt-Bold.ttf"),
    "inter-Medium": require("../assets/fonts/Inter_18pt-Medium.ttf"),
    "inter-Regular": require("../assets/fonts/Inter_18pt-Regular.ttf"),
    "inter-SemiBold": require("../assets/fonts/Inter_18pt-SemiBold.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  // if (!fontsLoaded) {
  //   return null;
  // }

  if (!fontsLoaded || isLoading) {
    return <AnimatedSplashScreen />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
