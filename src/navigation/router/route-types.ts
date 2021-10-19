import { RouteProp } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";

import { RoutesType } from "@/navigation/router/routes";

export type { RoutesType };

export type NavigationProps<T extends keyof RoutesType> = {
  navigation: StackNavigationProp<RoutesType, T>;
  route: RouteProp<RoutesType, T>;
};
