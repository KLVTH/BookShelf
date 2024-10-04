import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { useRouter } from "expo-router";
import { Image, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Colors from "../constants/Colors";
import { useTheme } from "./ThemeContext";

export default function CustomDrawerContent(props: any) {
  const router = useRouter();
  const { top, bottom } = useSafeAreaInsets(); // Obtém os valores das margens seguras no topo e na parte inferior da tela.

  const { theme } = useTheme(); // Obtenha o tema atual
  const currentColors = Colors[theme]; // Obtenha as cores correspondentes ao tema atual

  return (
    <View
      style={{ flex: 1, backgroundColor: currentColors.drawerContent }}
      //lightColor="#eee"
      //darkColor="rgba(255,255,255,0.1)"
    >
      <DrawerContentScrollView
        {...props}
        scrollEnabled={false}
        contentContainerStyle={{ paddingTop: top }}
      >
        <View
          style={{ padding: 16, backgroundColor: currentColors.drawerContent }}
        >
          <Image
            source={require("./../assets/images/adaptive-icon.png")}
            style={{
              height: 112,
              width: 112,
              alignSelf: "center",
              borderRadius: 56,
            }}
          />
          <Text
            style={{
              alignSelf: "center",
              paddingTop: 10,
              fontSize: 18,
              fontWeight: "500",
              color: "#f97316",
              fontFamily: "PlusJakartaSans",
            }}
          >
            BookShelf
          </Text>
        </View>

        <View
          style={{
            backgroundColor: currentColors.drawerContent,
          }}
        >
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      {/*O rodapé do Drawer
      <View
        style={{
          paddingBottom: bottom + 20,
          borderTopWidth: 1,
          borderTopColor: "black",
          padding: 20,
        }}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      >
        <Text lightColor="#eee" darkColor="white">
          Rodapé
        </Text>
      </View>*/}
    </View>
  );
}
