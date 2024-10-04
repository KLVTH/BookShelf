import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from "react-native";
import { useTheme } from "./ThemeContext";
import Colors from "../constants/Colors";

interface EditSectionButon {
  onPress: () => void;
  title: string;
  buttonStyle?: ViewStyle; // Estilo opcional para o botão que pode ser definido localmente
  textStyle?: TextStyle; // Estilo opcional para o texto que pode ser definido localmente
}

export const EditSectionButton: React.FC<EditSectionButon> = ({
  onPress,
  title,
  buttonStyle,
  textStyle,
}) => {
  const { theme } = useTheme(); // Obtenha o tema atual
  const currentColors = Colors[theme]; // Obtenha as cores correspondentes ao tema atual

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, buttonStyle, { backgroundColor: "#F96F17" }]}
      activeOpacity={0.7} // Define a opacidade quando pressionado
    >
      <Text style={[styles.text, textStyle, { color: currentColors.text }]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 7,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
