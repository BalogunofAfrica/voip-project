import { RouteProp } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";

export type Routes = {
  IncomingCall: undefined;
  Splash: undefined;
};

export type NavigationProps<T extends keyof Routes> = {
  navigation: StackNavigationProp<Routes, T>;
  route: RouteProp<Routes, T>;
};
