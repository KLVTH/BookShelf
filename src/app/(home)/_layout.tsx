import StackScreenOptions from "@/src/components/navigationOptions/StackScreenOptions";
import { router, Stack } from "expo-router";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/src/hooks/ThemeContext";
import Colors from "@/src/styles/Colors";
import { useLocalSearchParams } from "expo-router";

export default function HomeLayout() {
  const { theme } = useTheme();
  const currentColors = Colors[theme];

  return (
    <Stack>
      <Stack.Screen name="index" options={StackScreenOptions} />
      <Stack.Screen
        name="pdfviewer"
        options={{
          headerTitleStyle: {
            fontFamily: "PlusJakartaSans",
            fontSize: 30,
          },
          headerRight: () => (
            <TouchableOpacity style={{ marginRight: 15 }}>
              <Ionicons
                name="information-circle-outline"
                size={30}
                color={currentColors.icon}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="searchScreen"
        options={{
          title: "Buscar",
          headerTitleStyle: {
            fontFamily: "PlusJakartaSans",
            fontSize: 30,
          },
        }}
      />
    </Stack>
  );
}
