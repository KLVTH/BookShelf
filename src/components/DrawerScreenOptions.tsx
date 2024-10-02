import { Ionicons } from "@expo/vector-icons";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { ParamListBase } from "@react-navigation/native";
import React from "react";
import { useTheme } from "../components/ThemeContext"; // Importa o ThemeContext
import { SearchButton } from "./SearchButton";

type DrawerScreenOptionsProps = {
  navigation: DrawerNavigationProp<ParamListBase>;
};

// Função que retorna as opções do Drawer
const DrawerScreenOptions = ({ navigation }: DrawerScreenOptionsProps) => {
  const { theme } = useTheme(); // Usa o contexto de tema

  const menuIconColor = theme === "dark" ? "#e6e6e6" : "black"; // Define a cor do ícone com base no tema

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
        color={menuIconColor} // Cor do ícone baseada no tema
        style={{ marginLeft: 15, marginVertical: 12 }}
        onPress={() => navigation.toggleDrawer()} // Abre/fecha o Drawer
      />
    ),
    
  };
};

// Exporta a função como padrão
export default DrawerScreenOptions;
