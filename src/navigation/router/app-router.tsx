import { NavigationContainer } from "@react-navigation/native";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";
import React from "react";

import type { RoutesType } from "@/navigation/router/route-types";
import { routes } from "@/navigation/router/routes";

const Stack = createStackNavigator<RoutesType>();

function Router() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          headerShown: false,
        }}
      >
        {/* <Stack.Screen
          component={routes.SplashScreenRoute}
          name="SplashScreenRoute"
        /> */}
        <Stack.Screen component={routes.HomeRoute} name="HomeRoute" />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export { Router };
