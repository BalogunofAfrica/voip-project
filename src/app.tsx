import React from "react";
import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { Router } from "./navigation/app-router";

const App = () => (
  <SafeAreaProvider>
    <StatusBar hidden />
    <Router />
  </SafeAreaProvider>
);

export { App };
