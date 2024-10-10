import { Ionicons } from "@expo/vector-icons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  ThemeProvider as NavigationThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Drawer } from "expo-router/drawer";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

import { ThemeProvider, useTheme } from "./../components/ThemeContext"; 
import DrawerContent from "../components/DrawerContent";
import DrawerScreenOptions from "../components/DrawerScreenOptions";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "home",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    PlusJakartaSans: require("./../assets/fonts/PlusJakartaSans-Bold.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  // Envolve o layout no ThemeProvider para que o tema seja acessível em todo o aplicativo
  return (
    <ThemeProvider>
      <RootLayoutNav />
    </ThemeProvider>
  );
}

function RootLayoutNav() {
  const { theme } = useTheme();
  const isDarkTheme = theme === "dark";

  return (
    <NavigationThemeProvider
      value={isDarkTheme ? NavigationDarkTheme : NavigationDefaultTheme}
    >
      <Drawer drawerContent={DrawerContent} screenOptions={DrawerScreenOptions} initialRouteName="home" >
        <Drawer.Screen
          name="(home)"
          options={{
            headerShown: false,
            drawerLabel: "Minha Estante",
            headerTitle: "Minha Estante",
            drawerIcon: ({ size, color }) => (
              <Ionicons name="library" size={size} color={color} />
            ),
            
          }}
        />
        <Drawer.Screen
          name="config"
          options={{
            drawerLabel: "Configurações",
            headerTitle: "Configurações",
            drawerIcon: ({ size, color }) => (
              <Ionicons name="settings" size={size} color={color} />
            ),
          }}
        />
        
      </Drawer>
    </NavigationThemeProvider>
  );
}
