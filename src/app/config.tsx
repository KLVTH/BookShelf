// src/screens/SettingsScreen.tsx

import { Text, View } from "@/src/components/Themed"; // Usando os componentes Themed
import Colors from "@/src/constants/Colors"; // Importa as cores
import React from "react";
import { StyleSheet, Switch } from "react-native";
import { useTheme } from "../components/ThemeContext"; // Importa o ThemeContext

export default function SettingsScreen() {
  const { theme, toggleTheme } = useTheme(); // Usa o contexto de tema

  // Obtém as cores de acordo com o tema atual
  const currentColors = Colors[theme];
  return (
    <View style={[styles.container, { backgroundColor:  currentColors.background  }]}>
      <Text style={[styles.title, { color: currentColors.text }]}>Tema:</Text>

      <View style={[styles.row, { backgroundColor: currentColors.background }]}>
        <Text style={[styles.label, { color: currentColors.text }]}>Modo Escuro</Text>
        <Switch
          value={theme === "dark"} // Se o tema atual for "dark", o Switch estará ativado
          onValueChange={toggleTheme} // Alterna o tema quando o Switch é pressionado
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
    paddingVertical: 8, // Adicionado para dar mais espaço na linha
  },
  label: {
    fontSize: 18,
  },
});
