import React from "react";
import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { SplashScreen } from "@/components/splash-screen";

const App = () => (
  <SafeAreaProvider>
    <StatusBar hidden />
    <SplashScreen />
  </SafeAreaProvider>
);

export { App };
