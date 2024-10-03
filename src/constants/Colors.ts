// src/constants/Colors.ts

import drawer from "expo-router/drawer";

const Colors = {
  light: {
    background: "#FFFFFF",
    icon: "#000000",
    text: "#000000",
    primary: "#F0F0F0",
    placeholder: "#999999",
    bookComponent: "#E5E5E5",
    drawerContent: "#eee"
  },
  dark: {
    background: "#000000",
    icon: "#e6e6e6",
    text: "#e6e6e6",
    primary: "#333333",
    placeholder: "#BBBBBB",
    bookComponent: "#161e26",
    drawerContent: "#rgba(255,255,255,0.1)"
  },
};


// Defina os tipos para os temas
export type ThemeType = "light" | "dark";

export default Colors;
