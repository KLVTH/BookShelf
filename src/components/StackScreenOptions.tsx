import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native"; // Importa o StatusBar
import { useTheme } from "../components/ThemeContext"; // Importa o ThemeContext
import { SearchButton } from "./SearchButton";
import { DrawerNavigationProp } from "@react-navigation/drawer"; // Importa o tipo para a navegação do Drawer
import { StackNavigationProp } from "@react-navigation/stack"; // Importa o tipo para a navegação do Stack
import Colors from "../constants/Colors";
import { router } from "expo-router";

// Define os tipos para as propriedades
type StackScreenOptionsProps = {
  navigation: StackNavigationProp<any> & DrawerNavigationProp<any>; // Combina ambos os tipos de navegação
};

const CustomHeader = ({
  title,
  openDrawer,
}: {
  title: string;
  openDrawer: () => void;
}) => {
  const { theme } = useTheme(); // Usa o contexto de tema

  const menuIconColor = theme === "dark" ? "white" : "black"; // Define a cor do ícone com base no tema
  const textColor = Colors[theme].text;

  return (
    <View
      style={[
        styles.header,
        { backgroundColor: theme === "dark" ? "#000" : "#fff" },
      ]}
    >
      <Ionicons
        name="menu"
        size={40}
        color={menuIconColor}
        style={{ marginBottom: -10, marginLeft: 15 }}
        onPress={openDrawer} // Abre o Drawer ao pressionar o ícone
      />
      <Text style={[styles.title, { color: textColor }]}>{title}</Text>
      <View style={{marginLeft: 60}}>
        <SearchButton
          onPress={() => router.push({
            pathname: "/searchScreen"
          })}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 90, // Defina a altura do header aqui
    flexDirection: "row",
    alignItems: "center",
    paddingTop: StatusBar.currentHeight, // Adiciona padding superior igual à altura da barra de status
  },
  title: {
    fontFamily: "PlusJakartaSans",
    fontSize: 30,
    flex: 1,
    marginLeft: 10,
  },
});

// Opções para a tela usando o header customizado
const StackScreenOptions = ({
  navigation,
}: StackScreenOptionsProps) => ({
  header: () => (
    <CustomHeader
      title="Minha Estante"
      openDrawer={() => navigation.openDrawer()} // Passa a função para abrir o Drawer
    />
  ),
});

// Exporta a função como padrão
export default StackScreenOptions;
