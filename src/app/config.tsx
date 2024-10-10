import { Text, View } from "react-native";
import Colors from "@/src/styles/Colors";
import React from "react";
import { StyleSheet, Switch } from "react-native";
import { useTheme } from "../hooks/ThemeContext";
import { useCategoryListVisibility } from "../hooks/CategoryListVisibility";

export default function SettingsScreen() {
  const { theme, toggleTheme } = useTheme();
  const { isListVisible, toggleListVisibility } = useCategoryListVisibility();

  const currentColors = Colors[theme];

  return (
    <View
      style={[styles.container, { backgroundColor: currentColors.background }]}
    >
      <Text style={[styles.title, { color: currentColors.text }]}>Tema:</Text>

      <View style={[styles.row, { backgroundColor: currentColors.background }]}>
        <Text style={[styles.label, { color: currentColors.text }]}>
          Modo Escuro
        </Text>
        <Switch value={theme === "dark"} onValueChange={toggleTheme} />
      </View>

      <Text style={[styles.title, { color: currentColors.text }]}>
        Visualização:
      </Text>

      <View style={[styles.row, { backgroundColor: currentColors.background }]}>
        <Text style={[styles.label, { color: currentColors.text }]}>
          Lista de Categorias
        </Text>
        <Switch value={isListVisible} onValueChange={toggleListVisibility} />
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
