import StackScreenOptions from "@/src/components/navigationOptions/StackScreenOptions";
import { Stack } from "expo-router";
import { useTheme } from "@/src/hooks/ThemeContext";
import Colors from "@/src/styles/Colors";

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
      <Stack.Screen
        name="pdfInfo"
        options={{
          title: "Informações",
          headerTitleStyle: {
            fontFamily: "PlusJakartaSans",
            fontSize: 30,
          },
        }}
      />
    </Stack>
  );
}
