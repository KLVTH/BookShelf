import { Ionicons } from "@expo/vector-icons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Drawer } from "expo-router/drawer";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

import { useColorScheme } from "@/src/components/useColorScheme";
import DrawerContent from "../components/DrawerContent";
import DrawerScreenOptions from "../components/DrawerScreenOptions";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "index",
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

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  // Retorna o Drawer com a configuração do tema.
  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Drawer drawerContent={DrawerContent} screenOptions={DrawerScreenOptions}>
        <Drawer.Screen
          name="index"
          options={{
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
    </ThemeProvider>
  );
}
