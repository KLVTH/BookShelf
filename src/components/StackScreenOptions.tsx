import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native"; 
import { useTheme } from "../components/ThemeContext";
import { SearchButton } from "./SearchButton";
import { DrawerNavigationProp } from "@react-navigation/drawer"; 
import { StackNavigationProp } from "@react-navigation/stack"; 
import Colors from "../constants/Colors";
import { router } from "expo-router";


type StackScreenOptionsProps = {
  navigation: StackNavigationProp<any> & DrawerNavigationProp<any>; 
};

const CustomHeader = ({
  title,
  openDrawer,
}: {
  title: string;
  openDrawer: () => void;
}) => {
  const { theme } = useTheme();

  const menuIconColor = theme === "dark" ? "white" : "black"; 
  const textColor = Colors[theme].text;

  return (
    <View
      style={[
        styles.header,
        { backgroundColor: theme === "dark" ? "#121212" : "#fff" },
      ]}
    >
      <Ionicons
        name="menu"
        size={40}
        color={menuIconColor}
        style={{ marginBottom: -10, marginLeft: 15 }}
        onPress={openDrawer} 
      />
      <Text style={[styles.title, { color: textColor }]}>{title}</Text>
      <View style={{ marginLeft: 60 }}>
        <SearchButton
          onPress={() =>
            router.push({
              pathname: "/searchScreen",
            })
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 90, 
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

export default StackScreenOptions;
