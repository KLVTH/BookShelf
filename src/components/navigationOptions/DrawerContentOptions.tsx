import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { useRouter } from "expo-router";
import { Image, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "../../hooks/ThemeContext";
import Colors from "../../styles/Colors";

export default function CustomDrawerContent(props: any) {
  const router = useRouter();
  const { top, bottom } = useSafeAreaInsets(); // Obtém os valores das margens seguras no topo e na parte inferior da tela.

  const { theme } = useTheme();
  const currentColors = Colors[theme];

  return (
    <View style={{ flex: 1, backgroundColor: currentColors.background }}>
      <DrawerContentScrollView
        {...props}
        scrollEnabled={false}
        contentContainerStyle={{ paddingTop: top }}
      >
        <View
          style={{ padding: 16, backgroundColor: currentColors.background }}
        >
          <Image
            source={require("../../assets/images/adaptive-icon.png")}
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
              fontWeight: "bold",
              color: "#10B2FF",
              fontFamily: "PlusJakartaSans",
            }}
          >
            BookShelf
          </Text>
        </View>

        <View
          style={{
            backgroundColor: currentColors.background,
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
