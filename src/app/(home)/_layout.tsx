import StackScreenOptions from "@/src/components/navigationOptions/StackScreenOptions";
import { Stack } from "expo-router";
import { useTheme } from "@/src/hooks/ThemeContext";
import Colors from "@/src/styles/Colors";
import { Text, View } from "react-native";

interface CustomHeaderTitleProps {
  title: string;
  color: string; 
}

const CustomHeaderTitle: React.FC<CustomHeaderTitleProps> = ({ title, color }) => (
  <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', height: 50 }}>
    <Text style={{ fontFamily: "PlusJakartaSans", fontSize: 30, marginLeft: -20, marginTop: -8, color }}>
      {title}
    </Text>
  </View>
);

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
          headerTitle: () => (
            <CustomHeaderTitle title="Buscar" color={currentColors.text} /> // Usa a cor do tema
          ),
        }}
      />
      <Stack.Screen
        name="pdfInfo"
        options={{
          headerTitle: () => (
            <CustomHeaderTitle title="Informações" color={currentColors.text} /> // Usa a cor do tema
          ),
        }}
      />
    </Stack>
  );
}
