import { Ionicons } from "@expo/vector-icons";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { ParamListBase } from "@react-navigation/native";
import React from "react";
import { useColorScheme } from "react-native"; // Importando useColorScheme
import { SearchButton } from "./SearchButton";

type DrawerScreenOptionsProps = {
  navigation: DrawerNavigationProp<ParamListBase>;
};

const DrawerScreenOptions = ({ navigation }: DrawerScreenOptionsProps) => {
  const colorScheme = useColorScheme(); // Obtendo o tema atual

  const menuIconColor = colorScheme === "dark" ? "white" : "black"; // Define a cor como branco se a cor do sistema for preto

  return {
    drawerActiveBackgroundColor: "#F24E1E",
    drawerActiveTintColor: "#fff",
    drawerLabelStyle: { marginLeft: -20 },
    headerTitleStyle: {
      fontFamily: "PlusJakartaSans",
      fontSize: 30,
      marginLeft: -5,
    },
    headerLeft: () => (
      <Ionicons
        name="menu"
        size={40}
        color={menuIconColor} // Aplicando a cor do ícone baseada no tema
        style={{ marginLeft: 15, marginVertical: 12 }}
        onPress={() => navigation.toggleDrawer()} // Abre/fecha o Drawer
      />
    ),
    headerRight: () => (
      <SearchButton
        onPress={() => {
          console.log("Header button pressed!");
        }}
      />
    ),
  };
};

export default DrawerScreenOptions;
