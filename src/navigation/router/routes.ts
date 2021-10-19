import { SplashScreen } from "@/components/splash-screen";
import { Home } from "@/views/home";

const routes = {
  HomeRoute: Home,
  SplashScreenRoute: SplashScreen,
};

export type RoutesType = typeof routes;

export { routes };
