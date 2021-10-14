import React from "react";
import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { IncomingCall } from "@/components/calls";

const App = () => (
  <SafeAreaProvider>
    <StatusBar hidden />
    <IncomingCall onHangUp={() => {}} onJoin={() => {}} />
  </SafeAreaProvider>
);

export { App };
