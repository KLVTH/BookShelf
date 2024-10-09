import { Text, View } from "@/src/components/Themed"; // Usando os componentes Themed
import Colors from "@/src/constants/Colors"; // Importa as cores
import React from "react";
import { StyleSheet, Switch } from "react-native";
import { useTheme } from "../components/ThemeContext"; // Importa o ThemeContext

export default function SettingsScreen() {
  const { theme, toggleTheme } = useTheme(); 

  const currentColors = Colors[theme];
  return (
    <View style={[styles.container, { backgroundColor:  currentColors.background  }]}>
      <Text style={[styles.title, { color: currentColors.text }]}>Tema:</Text>

      <View style={[styles.row, { backgroundColor: currentColors.background }]}>
        <Text style={[styles.label, { color: currentColors.text }]}>Modo Escuro</Text>
        <Switch
          value={theme === "dark"} 
          onValueChange={toggleTheme} 
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 16,
    marginBottom: 16,
    paddingVertical: 8, 
  },
  label: {
    fontSize: 18,
  },
});
