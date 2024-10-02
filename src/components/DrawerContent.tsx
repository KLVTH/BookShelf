import { Text, View } from "@/src/components/Themed";
import { Ionicons } from "@expo/vector-icons";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { useRouter } from "expo-router";
import { Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function CustomDrawerContent(props: any) {
  const router = useRouter();
  const { top, bottom } = useSafeAreaInsets(); // Obtém os valores das margens seguras no topo e na parte inferior da tela.

  return (
    <View
      style={{ flex: 1 }}
      lightColor="#eee"
      darkColor="rgba(255,255,255,0.1)"
    >
      <DrawerContentScrollView
        {...props}
        scrollEnabled={false}
        contentContainerStyle={{ backgroundColor: "#red", paddingTop: top }}
      >
        <View
          style={{ padding: 16 }}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
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
            }}
          >
            BookShelf
          </Text>
        </View>

        <View
          style={{ paddingTop: 10 }}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
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
