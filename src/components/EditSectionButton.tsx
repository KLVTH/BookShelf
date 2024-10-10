import React from "react";
import { TouchableOpacity, StyleSheet, ViewStyle } from "react-native";
import { useTheme } from "./ThemeContext";
import Colors from "../constants/Colors";
import { FontAwesome } from "@expo/vector-icons"; 

interface EditSectionButon {
  onPress: () => void;
  buttonStyle?: ViewStyle; 
}

export const EditSectionButton: React.FC<EditSectionButon> = ({
  onPress,
  buttonStyle,
}) => {
  const { theme } = useTheme(); 
  const currentColors = Colors[theme]; 

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, buttonStyle,]} 
      activeOpacity={0.7} 
    >
      <FontAwesome name="pencil" size={20} color={currentColors.icon} />
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
});
