import { Ionicons } from "@expo/vector-icons";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { ParamListBase } from "@react-navigation/native";
import React from "react";
import { useTheme } from "../components/ThemeContext"; // Importa o ThemeContext
import Colors from "../constants/Colors";

type DrawerScreenOptionsProps = {
  navigation: DrawerNavigationProp<ParamListBase>;
};

const DrawerScreenOptions = ({ navigation }: DrawerScreenOptionsProps) => {
  const { theme } = useTheme();
  const currentColors = Colors[theme];

  return {
    drawerActiveBackgroundColor: currentColors.drawerActive,
    drawerActiveTintColor: "#fff",
    drawerLabelStyle: { marginLeft: -20 },
    headerTitleStyle: {
      fontFamily: "PlusJakartaSans",
      fontSize: 30,
      marginLeft: -5,
    },
    swipeEdgeWidth: 0,
    headerLeft: () => (
      <Ionicons
        name="menu"
        size={40}
        color={currentColors.icon}
        style={{ marginLeft: 15, marginVertical: 12 }}
        onPress={() => navigation.toggleDrawer()}
      />
    ),
  };
};

export default DrawerScreenOptions;
