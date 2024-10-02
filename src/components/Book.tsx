import React from "react";
import {
  Image,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  StyleSheet,
} from "react-native";
import { View } from "./Themed";
import { useTheme } from "./ThemeContext";
import Colors from "../constants/Colors";
import FontAwesome from "@expo/vector-icons/FontAwesome";

type CustomButtonProps = {
  title: string; // Texto que será exibido no botão
  //imageSource: any; // Fonte da imagem
} & TouchableOpacityProps; // Permite passar propriedades adicionais do TouchableOpacity

export function Book({
  title,
  //imageSource,
  ...touchableProps
}: CustomButtonProps) {
  const { theme } = useTheme(); // Obtenha o tema atual
  const currentColors = Colors[theme]; // Obtenha as cores correspondentes ao tema atual

  return (
    <TouchableOpacity
      style={[
        styles.container,
        { backgroundColor: currentColors.bookComponent },
      ]} // Define a cor do fundo
      {...touchableProps}
    >
      {/*<Image source={imageSource} style={styles.image}/>*/}
      <FontAwesome
        name="file"
        size={18}
        color={currentColors.icon}
        style={styles.image}
      />
      {/* Ícone de arquivo */}
      <View
        style={{
          backgroundColor: "transparent",
          flexDirection: "column",
          alignItems: "flex-start",
          marginLeft: 12,
          marginRight: 20,
        }}
      >
        <Text
          style={[styles.title, { color: currentColors.text }]} // Define a cor do texto
          numberOfLines={1} // Limita a uma linha
          ellipsizeMode="tail" // Adiciona "..." se o texto for muito longo
        >
          {title}
        </Text>
        {/*<Text>autor, quantidade de pags?</Text>*/}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    height: 56,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 3,
  },
  image: {
    marginLeft: 12,
    
  },
  title: {
    marginRight: 12,
    fontSize: 18,
    fontWeight: "600",
  },
});
