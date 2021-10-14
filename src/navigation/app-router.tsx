import { NavigationContainer } from "@react-navigation/native";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";
import React from "react";

import { SplashScreen } from "@/components/splash-screen";
import type { Routes } from "@/navigation/route-types";

const Stack = createStackNavigator<Routes>();

function Router() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          headerShown: false,
        }}
      >
        <Stack.Screen component={SplashScreen} name="Splash" />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export { Router };
